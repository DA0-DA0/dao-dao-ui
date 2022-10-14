import { coins } from '@cosmjs/stargate'
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
import { Open } from '@dao-dao/icons'
import {
  Cw20BaseHooks,
  Cw20BaseSelectors,
  CwCoreV1Selectors,
  blockHeightSelector,
  blocksPerYearSelector,
  cosmWasmClientForChainSelector,
  nativeDenomBalanceSelector,
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
import { useDaoInfoContext } from '@dao-dao/ui'
import {
  convertExpirationToDate,
  dateToWdhms,
  expirationExpired,
  processError,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { BaseNewProposalProps } from '../../../../types'
import { usePropose as useProposePrePropose } from '../../contracts/CwdPreProposeSingle.hooks'
import { proposalSelector } from '../../contracts/CwdProposalSingle.common.recoil'
import { usePropose as useProposeV2 } from '../../contracts/CwdProposalSingle.v2.hooks'
import { usePropose as useProposeV1 } from '../../contracts/CwProposalSingle.v1.hooks'
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
    CwCoreV1Selectors.pauseInfoSelector({
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
  const depositInfoCw20TokenAddress =
    depositInfo?.denom && 'cw20' in depositInfo.denom
      ? depositInfo.denom.cw20
      : undefined
  const depositInfoNativeTokenDenom =
    depositInfo?.denom && 'native' in depositInfo.denom
      ? depositInfo.denom.native
      : undefined

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const requiredProposalDeposit = Number(depositInfo?.amount ?? '0')

  // TODO: Cache these balance selectors after first suspense, like
  // useCachedLoadable but not a loadable. It makes the whole page reload for a
  // second when wallet balances are refreshed, which is not ideal.
  const cw20DepositTokenAllowanceResponse = useRecoilValue(
    depositInfoCw20TokenAddress && requiredProposalDeposit && walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [
            {
              owner: walletAddress,
              // If pre-propose address set, give that one deposit allowance
              // instead of proposal module.
              spender:
                options.proposalModule.preProposeAddress ||
                options.proposalModule.address,
            },
          ],
        })
      : constSelector(undefined)
  )

  const cw20DepositTokenBalance = useRecoilValue(
    requiredProposalDeposit && walletAddress && depositInfoCw20TokenAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )
  const nativeDepositTokenBalance = useRecoilValue(
    requiredProposalDeposit && walletAddress && depositInfoNativeTokenDenom
      ? nativeDenomBalanceSelector({
          walletAddress,
          denom: depositInfoNativeTokenDenom,
        })
      : constSelector(undefined)
  )

  // Info about if deposit can be paid.
  const depositSatisfied =
    requiredProposalDeposit === 0 ||
    (cw20DepositTokenBalance &&
      Number(cw20DepositTokenBalance.balance) >= requiredProposalDeposit) ||
    (nativeDepositTokenBalance &&
      Number(nativeDepositTokenBalance.amount) >= requiredProposalDeposit)

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(walletAddress ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  const processTQ = useProcessTQ()

  const increaseCw20DepositAllowance = Cw20BaseHooks.useIncreaseAllowance({
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

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const cosmWasmClient = useRecoilValue(
    cosmWasmClientForChainSelector(undefined)
  )
  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
      async (newProposalData: NewProposalData) => {
        if (!connected || blockHeight === undefined) {
          throw new Error(t('error.loadingData'))
        }

        setLoading(true)

        // Increase CW20 deposit token allowance if necessary.
        if (requiredProposalDeposit && cw20DepositTokenAllowanceResponse) {
          const remainingAllowanceNeeded =
            requiredProposalDeposit -
            // If allowance expired, none.
            (expirationExpired(
              cw20DepositTokenAllowanceResponse.expires,
              blockHeight
            )
              ? 0
              : Number(cw20DepositTokenAllowanceResponse.allowance))

          // Request to increase the contract's allowance for the proposal
          // deposit if needed.
          if (remainingAllowanceNeeded) {
            try {
              await increaseCw20DepositAllowance({
                amount: remainingAllowanceNeeded.toString(),
                spender:
                  // If pre-propose address set, give that one deposit allowance
                  // instead of proposal module.
                  options.proposalModule.preProposeAddress ||
                  options.proposalModule.address,
              })

              // TODO: Make this not flicker load by turning balances into cached loadables?
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

        // Native token deposit if exists.
        const proposeFunds =
          requiredProposalDeposit && depositInfoNativeTokenDenom
            ? coins(requiredProposalDeposit, depositInfoNativeTokenDenom)
            : undefined

        try {
          let response
          //! V1
          if (options.proposalModule.version === ContractVersion.V0_1_0) {
            response = await doProposeV1(
              newProposalData,
              'auto',
              undefined,
              proposeFunds
            )
            //! V2
          } else {
            response = options.proposalModule.preProposeAddress
              ? await doProposePrePropose(
                  {
                    msg: {
                      propose: newProposalData,
                    },
                  },
                  'auto',
                  undefined,
                  proposeFunds
                )
              : await doProposeV2(
                  newProposalData,
                  'auto',
                  undefined,
                  proposeFunds
                )
          }

          if (proposeFunds?.length) {
            // TODO: Make this not flicker load by turning balances into cached loadables?
            refreshBalances()
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
            convertExpirationToDate(
              blocksPerYear,
              proposalInfo.expiration,
              blockHeight
            )

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
      blocksPerYear,
      connected,
      requiredProposalDeposit,
      cw20DepositTokenAllowanceResponse,
      t,
      blockHeight,
      increaseCw20DepositAllowance,
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
