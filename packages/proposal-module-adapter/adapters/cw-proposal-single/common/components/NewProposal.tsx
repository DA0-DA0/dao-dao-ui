import { findAttribute } from '@cosmjs/stargate/build/logs'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import { useActions } from '@dao-dao/actions'
import { useDaoInfoContext } from '@dao-dao/common'
import { Open } from '@dao-dao/icons'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwCoreV0_1_0Selectors,
  CwProposalSingleHooks,
  CwProposalSingleSelectors,
  blockHeightSelector,
  cosmWasmClientSelector,
  refreshWalletBalancesIdAtom,
  useCachedLoadable,
  useVotingModule,
} from '@dao-dao/state'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import {
  convertExpirationToDate,
  dateToWdhms,
  expirationExpired,
  processError,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { BaseNewProposalProps } from '../../../../types'
import { makeGetProposalInfo } from '../../functions'
import { NewProposalData, NewProposalForm } from '../../types'
import { makeUseActions as makeUseProposalModuleActions } from '../hooks'
import {
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
} from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps &
  Pick<StatelessNewProposalProps, 'options'>

export const NewProposal = ({
  onCreateSuccess,
  prefill,
  options,
}: NewProposalProps) => {
  const { t } = useTranslation()
  const { coreVersion } = useDaoInfoContext()
  const { connected, address: walletAddress } = useWallet()
  const { isMember = false } = useVotingModule(options.coreAddress, {
    fetchMembership: true,
  })
  const [loading, setLoading] = useState(false)

  // Info about if the DAO is paused.
  const pauseInfo = useRecoilValue(
    CwCoreV0_1_0Selectors.pauseInfoSelector({
      contractAddress: options.coreAddress,
    })
  )
  const isPaused = 'Paused' in pauseInfo

  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()
  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = makeUseProposalModuleActions(
    options.proposalModule
  )()
  const actions = useActions(
    coreVersion,
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  // Call relevant action hooks in the same order every time.
  const actionsWithData: Partial<
    Record<
      ActionKey,
      {
        action: Action
        transform: ReturnType<UseTransformToCosmos>
        defaults: ReturnType<UseDefaults>
      }
    >
  > = actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(options.coreAddress),
        defaults: action.useDefaults(options.coreAddress),
      },
    }),
    {}
  )

  const formMethods = useForm<NewProposalForm>({
    mode: 'onChange',
    defaultValues: prefill || {
      title: '',
      description: '',
      actionData: [],
    },
  })

  const config = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: options.proposalModule.address,
    })
  )

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector)
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const requiredProposalDeposit = Number(config.deposit_info?.deposit ?? '0')

  const allowanceResponse = useRecoilValue(
    config.deposit_info && requiredProposalDeposit && walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: config.deposit_info.token,
          params: [
            { owner: walletAddress, spender: options.proposalModule.address },
          ],
        })
      : constSelector(undefined)
  )

  const increaseAllowance = Cw20BaseHooks.useIncreaseAllowance({
    contractAddress: config.deposit_info?.token ?? '',
    sender: walletAddress ?? '',
  })
  const doPropose = CwProposalSingleHooks.usePropose({
    contractAddress: options.proposalModule.address,
    sender: walletAddress ?? '',
  })

  const depositTokenBalance = useRecoilValue(
    config.deposit_info?.deposit &&
      config.deposit_info?.deposit !== '0' &&
      walletAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: config.deposit_info.token,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )

  // Info about if deposit can be paid.
  const depositSatisfied =
    !config.deposit_info?.deposit ||
    config.deposit_info?.deposit === '0' ||
    Number(depositTokenBalance?.balance) >= Number(config.deposit_info?.deposit)

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(walletAddress ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  const cosmWasmClient = useRecoilValue(cosmWasmClientSelector)
  const createProposal = useCallback(
    async (newProposalData: NewProposalData) => {
      if (
        !connected ||
        !blockHeight ||
        // If required deposit, ensure the allowance and unstaked balance
        // data have loaded.
        (requiredProposalDeposit && !allowanceResponse)
      ) {
        throw new Error(t('error.loadingData'))
      }

      setLoading(true)

      // Typecheck for TS; should've already been verified above.
      if (requiredProposalDeposit && allowanceResponse) {
        const remainingAllowanceNeeded =
          requiredProposalDeposit -
          // If allowance expired, none.
          (expirationExpired(allowanceResponse.expires, blockHeight)
            ? 0
            : Number(allowanceResponse.allowance))

        // Request to increase the contract's allowance for the proposal
        // deposit if needed.
        if (remainingAllowanceNeeded) {
          try {
            await increaseAllowance({
              amount: remainingAllowanceNeeded.toString(),
              spender: options.proposalModule.address,
            })

            // Allowances will not update until the next block has been added.
            setTimeout(refreshBalances, 6500)
          } catch (err) {
            console.error(err)
            toast.error(
              `Failed to increase allowance to pay proposal deposit: (${processError(
                err
              )})`
            )
            setLoading(false)
            return
          }
        }
      }

      try {
        const response = await doPropose(newProposalData)

        const proposalNumber = Number(
          findAttribute(response.logs, 'wasm', 'proposal_id').value
        )
        const proposalId = `${options.proposalModule.prefix}${proposalNumber}`

        const proposalInfo = await makeGetProposalInfo({
          ...options,
          proposalNumber,
          proposalId,
        })(cosmWasmClient)
        const expirationDate =
          proposalInfo &&
          convertExpirationToDate(proposalInfo.expiration, blockHeight)

        // TODO: Get more info, like threshold and quorum.
        onCreateSuccess(
          proposalInfo
            ? {
                id: proposalId,
                title: formMethods.getValues('title'),
                description: formMethods.getValues('description'),
                info: expirationDate
                  ? [
                      {
                        Icon: Open,
                        label: dateToWdhms(expirationDate),
                      },
                    ]
                  : [],
              }
            : {
                id: proposalId,
                title: formMethods.getValues('title'),
                description: formMethods.getValues('description'),
                info: [],
              }
        )
        // Don't stop loading indicator since we are navigating.
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
        setLoading(false)
      }
    },
    [
      connected,
      requiredProposalDeposit,
      allowanceResponse,
      t,
      blockHeight,
      increaseAllowance,
      options,
      refreshBalances,
      doPropose,
      cosmWasmClient,
      onCreateSuccess,
      formMethods,
    ]
  )

  return (
    <StatelessNewProposal
      actions={actions}
      actionsWithData={actionsWithData}
      connected={connected}
      createProposal={createProposal}
      depositUnsatisfied={!depositSatisfied}
      formMethods={formMethods}
      isMember={isMember}
      isPaused={isPaused}
      loading={loading}
      options={options}
    />
  )
}
