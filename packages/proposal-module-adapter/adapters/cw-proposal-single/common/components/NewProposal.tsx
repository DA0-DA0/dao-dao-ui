import { findAttribute } from '@cosmjs/stargate/build/logs'
import { useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import { useActions } from '@dao-dao/actions'
import { useDaoInfoContext } from '@dao-dao/common'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwCoreV0_1_0Selectors,
  CwProposalSingleHooks,
  CwProposalSingleSelectors,
  blockHeightSelector,
  refreshWalletBalancesIdAtom,
  useVotingModule,
} from '@dao-dao/state'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { expirationExpired, processError } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { BaseNewProposalProps } from '../../../../types'
import { NewProposalData, NewProposalForm } from '../../types'
import { makeUseActions as makeUseProposalModuleActions } from '../hooks'
import {
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
} from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps &
  Pick<StatelessNewProposalProps, 'options'>

export const NewProposal = ({ onCreateSuccess, options }: NewProposalProps) => {
  const { t } = useTranslation()
  const router = useRouter()
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
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
    },
  })

  // Prefill form with data from parameter once ready.
  useEffect(() => {
    const potentialDefaultValue = router.query.prefill
    if (!router.isReady || typeof potentialDefaultValue !== 'string') {
      return
    }

    try {
      const data = JSON.parse(potentialDefaultValue)
      if (data.constructor.name === 'Object') {
        formMethods.reset(data)
      }
      // If failed to parse, do nothing.
    } catch {}
  }, [router.query.prefill, router.isReady, formMethods])

  const config = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: options.proposalModule.address,
    })
  )

  const blockHeight = useRecoilValue(blockHeightSelector)

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

  const createProposal = useCallback(
    async (newProposalData: NewProposalData) => {
      if (
        !connected ||
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

        onCreateSuccess(`${options.proposalModule.prefix}${proposalNumber}`)
        // Don't stop loading indicator since we are navigating.

        // TODO: Show proposal creation card here instead of navigating. Or in
        // onCreateSuccess maybe?
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
      options.proposalModule.address,
      options.proposalModule.prefix,
      refreshBalances,
      doPropose,
      onCreateSuccess,
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
