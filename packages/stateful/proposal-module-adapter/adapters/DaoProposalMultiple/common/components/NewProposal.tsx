import { coins } from '@cosmjs/stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { FlagOutlined, Timelapse } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

import {
  Cw20BaseSelectors,
  DaoCoreV2Selectors,
  blockHeightSelector,
  blocksPerYearSelector,
  cosmWasmClientForChainSelector,
  nativeDenomBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  dateToWdhms,
  expirationExpired,
  processError,
} from '@dao-dao/utils'

import { useActions, useLoadActions } from '../../../../../actions'
import {
  Cw20BaseHooks,
  useAwaitNextBlock,
  useMembership,
} from '../../../../../hooks'
import { usePropose as useProposePrePropose } from '../../contracts/DaoPreProposeMultiple.hooks'
import { usePropose } from '../../contracts/DaoProposalMultiple.hooks'
import { proposalSelector } from '../../contracts/DaoProposalMultiple.recoil'
import { makeGetProposalInfo } from '../../functions'
import { NewProposalData, NewProposalForm } from '../../types'
import { useProcessQ } from '../hooks'
import { NewProposal as StatelessNewProposal } from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps<NewProposalForm> & {
  options: IProposalModuleAdapterCommonOptions
  depositInfoSelector: DepositInfoSelector
}

export const NewProposal = ({
  onCreateSuccess,
  simulateMsgs,
  options,
  depositInfoSelector,
  ...props
}: NewProposalProps) => {
  const { t } = useTranslation()
  const { name: daoName, imageUrl: daoImageUrl } = useDaoInfoContext()
  const { chainId, coreAddress, proposalModule } = options
  const { connected, address: walletAddress } = useWallet()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })
  const [loading, setLoading] = useState(false)

  // Info about if the DAO is paused. This selector depends on blockHeight,
  // which is refreshed periodically, so use a loadable to avoid unnecessary
  // re-renders.
  const pauseInfo = useCachedLoadable(
    DaoCoreV2Selectors.pauseInfoSelector({
      contractAddress: coreAddress,
      params: [],
    })
  )
  const isPaused =
    pauseInfo.state === 'hasValue' &&
    ('paused' in pauseInfo.contents || 'Paused' in pauseInfo.contents)

  const actions = useActions()
  const loadedActions = useLoadActions(actions)

  const formMethods = useFormContext<NewProposalForm>()

  const depositInfo = useRecoilValue(depositInfoSelector)
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

  // For checking allowance and increasing if necessary.
  const cw20DepositTokenAllowanceResponseLoadable = useCachedLoadable(
    depositInfoCw20TokenAddress && requiredProposalDeposit && walletAddress
      ? Cw20BaseSelectors.allowanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [
            {
              owner: walletAddress,
              // If pre-propose address set, give that one deposit allowance
              // instead of proposal module.
              spender:
                proposalModule.preProposeAddress || proposalModule.address,
            },
          ],
        })
      : constSelector(undefined)
  )
  const cw20DepositTokenAllowanceResponse =
    cw20DepositTokenAllowanceResponseLoadable.state === 'hasValue'
      ? cw20DepositTokenAllowanceResponseLoadable.contents
      : undefined

  const cw20DepositTokenBalanceLoadable = useCachedLoadable(
    requiredProposalDeposit && walletAddress && depositInfoCw20TokenAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: depositInfoCw20TokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )
  const cw20DepositTokenBalance =
    cw20DepositTokenBalanceLoadable.state === 'hasValue'
      ? cw20DepositTokenBalanceLoadable.contents
      : undefined

  const nativeDepositTokenBalanceLoadable = useCachedLoadable(
    requiredProposalDeposit && walletAddress && depositInfoNativeTokenDenom
      ? nativeDenomBalanceSelector({
          walletAddress,
          denom: depositInfoNativeTokenDenom,
        })
      : constSelector(undefined)
  )
  const nativeDepositTokenBalance =
    nativeDepositTokenBalanceLoadable.state === 'hasValue'
      ? nativeDepositTokenBalanceLoadable.contents
      : undefined

  // Whether or not deposit is can be paid or does not have to be.
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

  const processQ = useProcessQ()

  const increaseCw20DepositAllowance = Cw20BaseHooks.useIncreaseAllowance({
    contractAddress: depositInfoCw20TokenAddress ?? '',
    sender: walletAddress ?? '',
  })
  const doPropose = usePropose({
    contractAddress: proposalModule.address,
    sender: walletAddress ?? '',
  })
  const doProposePrePropose = useProposePrePropose({
    contractAddress: proposalModule.preProposeAddress ?? '',
    sender: walletAddress ?? '',
  })

  const awaitNextBlock = useAwaitNextBlock()

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const cosmWasmClient = useRecoilValue(cosmWasmClientForChainSelector(chainId))
  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
      async (newProposalData: NewProposalData) => {
        if (!connected || blockHeight === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

        setLoading(true)

        // Only simulate messages if any exist. Allow proposals without
        // messages.
        if (
          newProposalData.choices.options.filter((c) => c.msgs.length > 0) &&
          simulateMsgs
        ) {
          try {
            // Throws error if simulation fails, indicating invalid message.
            simulateMsgs(newProposalData.choices.options.flatMap((c) => c.msgs))
          } catch (err) {
            console.error(err)
            toast.error(
              `${t('error.simulationFailedInvalidProposalActions')} ${
                // Don't send to Sentry, but still format SDK errors nicely.
                processError(err, { forceCapture: false })
              }`
            )
            setLoading(false)
            return
          }
        }

        // Increase CW20 deposit token allowance if necessary.
        if (requiredProposalDeposit && depositInfoCw20TokenAddress) {
          // CW20 allowance response must be checked.
          if (!cw20DepositTokenAllowanceResponse) {
            toast.error(t('error.loadingData'))
            return
          }

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
                  proposalModule.preProposeAddress || proposalModule.address,
              })

              // Allowances will not update until the next block has been added.
              awaitNextBlock().then(refreshBalances)
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
          let response = proposalModule.preProposeAddress
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
            : await doPropose(newProposalData, 'auto', undefined, proposeFunds)

          if (proposeFunds?.length) {
            refreshBalances()
          }

          const proposalNumber = Number(
            findAttribute(response.logs, 'wasm', 'proposal_id').value
          )
          const proposalId = `${proposalModule.prefix}${proposalNumber}`

          const proposalInfo = await makeGetProposalInfo({
            ...options,
            proposalNumber,
            proposalId,
          })()
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
                contractAddress: proposalModule.address,
                params: [
                  {
                    proposalId: proposalNumber,
                  },
                ],
              })
            )
          ).proposal

          const { quorum } = processQ(proposal.voting_strategy)

          onCreateSuccess(
            proposalInfo
              ? {
                  id: proposalId,
                  title: formMethods.getValues('title'),
                  description: formMethods.getValues('description'),
                  info: [
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
                            Icon: Timelapse,
                            label: dateToWdhms(expirationDate),
                          },
                        ]
                      : []),
                  ],
                  dao: {
                    name: daoName,
                    coreAddress,
                    imageUrl: daoImageUrl,
                  },
                }
              : {
                  id: proposalId,
                  title: formMethods.getValues('title'),
                  description: formMethods.getValues('description'),
                  info: [],
                  dao: {
                    name: daoName,
                    coreAddress,
                    imageUrl: daoImageUrl,
                  },
                }
          )
          // Don't stop loading indicator on success since we are navigating.
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
          setLoading(false)
        }
      },
    [
      connected,
      blockHeight,
      requiredProposalDeposit,
      depositInfoCw20TokenAddress,
      depositInfoNativeTokenDenom,
      t,
      simulateMsgs,
      cw20DepositTokenAllowanceResponse,
      increaseCw20DepositAllowance,
      proposalModule,
      awaitNextBlock,
      refreshBalances,
      options,
      cosmWasmClient,
      blocksPerYear,
      processQ,
      onCreateSuccess,
      formMethods,
      coreAddress,
      daoImageUrl,
      doPropose,
      doProposePrePropose,
      doPropose,
    ]
  )

  return (
    <StatelessNewProposal
      actions={actions}
      connected={connected}
      createProposal={createProposal}
      depositUnsatisfied={!depositSatisfied}
      isMember={isMember}
      isPaused={isPaused}
      loadedActions={loadedActions}
      loading={loading}
      {...props}
    />
  )
}
