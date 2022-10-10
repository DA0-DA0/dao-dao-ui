import { findAttribute } from '@cosmjs/stargate/build/logs'
import { BookOutlined, FlagOutlined } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

import { useActions } from '@dao-dao/actions'
import { useDaoInfoContext } from '@dao-dao/common'
import { Open } from '@dao-dao/icons'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwCoreV0_1_0Selectors,
  blockHeightSelector,
  cosmWasmClientSelector,
  refreshWalletBalancesIdAtom,
  useCachedLoadable,
  useVotingModule,
} from '@dao-dao/state'
import {
  Action,
  ActionKey,
  ContractVersion,
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
import { usePropose as useProposePrePropose } from '../../contracts/CwPreProposeSingle.hooks'
import { proposalSelector } from '../../contracts/CwProposalSingle.common.recoil'
import { usePropose as useProposeV1 } from '../../contracts/CwProposalSingle.v1.hooks'
import { usePropose as useProposeV2 } from '../../contracts/CwProposalSingle.v2.hooks'
import { makeGetProposalInfo } from '../../functions'
import { NewProposalData, NewProposalForm } from '../../types'
import {
  makeUseActions as makeUseProposalModuleActions,
  useProcessTQ,
} from '../hooks'
import { makeDepositInfo } from '../selectors'
import {
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
} from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps<NewProposalForm> &
  Pick<StatelessNewProposalProps, 'options'>

export const NewProposal = ({
  onCreateSuccess,
  options,
  ...props
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
  const proposalModuleActions = makeUseProposalModuleActions(options)()
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

  const formMethods = useFormContext<NewProposalForm>()

  const depositInfo = useRecoilValue(makeDepositInfo(options))
  // TODO: Support native token deposits.
  const depositInfoCw20TokenAddress =
    depositInfo?.denom && 'cw20' in depositInfo.denom
      ? depositInfo.denom.cw20
      : undefined

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector)
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const requiredProposalDeposit = Number(depositInfo?.amount ?? '0')

  const allowanceResponse = useRecoilValue(
    depositInfoCw20TokenAddress && requiredProposalDeposit && walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [
            { owner: walletAddress, spender: options.proposalModule.address },
          ],
        })
      : constSelector(undefined)
  )

  const increaseAllowance = Cw20BaseHooks.useIncreaseAllowance({
    contractAddress: depositInfoCw20TokenAddress ?? '',
    sender: walletAddress ?? '',
  })
  const doProposeV1 = useProposeV1({
    contractAddress: options.proposalModule.address,
    sender: walletAddress ?? '',
  })
  const doProposeV2 = useProposeV2({
    contractAddress: options.proposalModule.address,
    sender: walletAddress ?? '',
  })
  const doProposePrePropose = useProposePrePropose({
    contractAddress: options.proposalModule.preProposeAddress ?? '',
    sender: walletAddress ?? '',
  })

  const depositTokenBalance = useRecoilValue(
    requiredProposalDeposit > 0 && depositInfoCw20TokenAddress && walletAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )

  // Info about if deposit can be paid.
  const depositSatisfied =
    requiredProposalDeposit === 0 ||
    Number(depositTokenBalance?.balance ?? '0') >= requiredProposalDeposit

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(walletAddress ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  const processTQ = useProcessTQ()

  const cosmWasmClient = useRecoilValue(cosmWasmClientSelector)
  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
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
          let response
          //! V1
          if (options.proposalModule.version === ContractVersion.V0_1_0) {
            response = await doProposeV1(newProposalData)
            //! V2
          } else {
            response = options.proposalModule.preProposeAddress
              ? await doProposePrePropose({
                  msg: {
                    propose: newProposalData,
                  },
                })
              : await doProposeV2(newProposalData)
          }

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

          const proposal = (
            await snapshot.getPromise(
              proposalSelector({
                contractAddress: options.proposalModule.address,
                params: [
                  {
                    proposalId: proposalNumber,
                  },
                ],
              })
            )
          ).proposal

          const { threshold, quorum } = processTQ(proposal.threshold)

          onCreateSuccess(
            proposalInfo
              ? {
                  id: proposalId,
                  title: formMethods.getValues('title'),
                  description: formMethods.getValues('description'),
                  info: [
                    {
                      Icon: BookOutlined,
                      label: `${t('title.threshold')}: ${threshold.display}`,
                    },
                    ...(quorum
                      ? [
                          {
                            Icon: FlagOutlined,
                            label: `${t('title.quorum')}: ${quorum.display}`,
                          },
                        ]
                      : []),
                    ...(expirationDate
                      ? [
                          {
                            Icon: Open,
                            label: dateToWdhms(expirationDate),
                          },
                        ]
                      : []),
                  ],
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
      doProposeV1,
      doProposeV2,
      doProposePrePropose,
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
      isMember={isMember}
      isPaused={isPaused}
      loading={loading}
      options={options}
      {...props}
    />
  )
}
