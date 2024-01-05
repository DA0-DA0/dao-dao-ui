import {
  AccountCircleOutlined,
  ArrowOutward,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  PollOutlined,
  Redo,
  RotateRightOutlined,
  Send,
  Tag,
  ThumbDownOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoProposalMultipleSelectors,
} from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalCrossChainRelayStatus,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  TooltipTruncatedText,
  useCachedLoading,
  useConfiguredChainContext,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  BaseProposalStatusAndInfoProps,
  CheckedDepositInfo,
  DepositRefundPolicy,
  EntityType,
  ProposalStatusEnum,
} from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  CHAIN_GAS_MULTIPLIER,
  cwMsgToEncodeObject,
  formatPercentOf100,
  getDaoProposalSinglePrefill,
  getProposalStatusKey,
  makeCw1WhitelistExecuteMessage,
  makeWasmMessage,
  processError,
} from '@dao-dao/utils'

import { EntityDisplay, SuspenseLoader } from '../../../../components'
import { ButtonLink } from '../../../../components/ButtonLink'
import {
  DaoProposalMultipleHooks,
  useAwaitNextBlock,
  useEntity,
  useMembership,
  useProposalPolytoneState,
  useWallet,
} from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import {
  useCastVote,
  useLoadingDepositInfo,
  useLoadingProposal,
  useLoadingProposalExecutionTxHash,
  useLoadingVoteOptions,
  useLoadingVotesInfo,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
} from '../hooks'
import { ProposalWithMetadata, VotesInfo } from '../types'

export const ProposalStatusAndInfo = (
  props: BaseProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingProposal()
  const loadingMultipleChoiceVotesInfo = useLoadingVotesInfo()
  const loadingDepositInfo = useLoadingDepositInfo()

  return (
    <SuspenseLoader
      fallback={<InnerProposalStatusAndInfoLoader {...props} />}
      forceFallback={
        loadingProposal.loading ||
        loadingMultipleChoiceVotesInfo.loading ||
        loadingDepositInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingMultipleChoiceVotesInfo.loading &&
        !loadingDepositInfo.loading && (
          <InnerProposalStatusAndInfo
            {...props}
            depositInfo={loadingDepositInfo.data}
            proposal={loadingProposal.data}
            votesInfo={loadingMultipleChoiceVotesInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

const InnerProposalStatusAndInfo = ({
  proposal: { timestampInfo, votingOpen, ...proposal },
  votesInfo: { winningChoice, quorumReached, turnoutPercent, isTie },
  depositInfo,
  onVoteSuccess,
  onExecuteSuccess,
  onCloseSuccess,
  onVetoSuccess,
  openSelfRelayExecute,
  ...props
}: BaseProposalStatusAndInfoProps & {
  proposal: ProposalWithMetadata
  votesInfo: VotesInfo
  depositInfo: CheckedDepositInfo | undefined
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const {
    chain: { chain_id: chainId },
    config: { explorerUrlTemplates },
  } = useConfiguredChainContext()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningCosmWasmClient,
  } = useWallet()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const config = useRecoilValue(
    DaoProposalMultipleSelectors.configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const loadingExecutionTxHash = useLoadingProposalExecutionTxHash()
  const { refreshProposal, refreshProposalAndAll } = useProposalRefreshers()

  const statusKey = getProposalStatusKey(proposal.status)

  const voteOptions = useLoadingVoteOptions()
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  const executeProposal = DaoProposalMultipleHooks.useExecute({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = DaoProposalMultipleHooks.useClose({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })

  const [actionLoading, setActionLoading] = useState(false)
  // On proposal status update, stop loading. This ensures the action button
  // doesn't stop loading too early, before the status has refreshed.
  useEffect(() => {
    setActionLoading(false)
  }, [proposal.status])

  const polytoneState = useProposalPolytoneState({
    msgs: winningChoice?.msgs || [],
    status: proposal.status,
    executedAt: proposal.executedAt,
    proposalModuleAddress: proposalModule.address,
    proposalNumber,
    openSelfRelayExecute,
    loadingTxHash: loadingExecutionTxHash,
  })

  const onExecute = useCallback(async () => {
    if (!isWalletConnected) {
      return
    }

    setActionLoading(true)
    try {
      await executeProposal({ proposalId: proposalNumber })

      await onExecuteSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [isWalletConnected, executeProposal, proposalNumber, onExecuteSuccess])

  const onClose = useCallback(async () => {
    if (!isWalletConnected) {
      return
    }

    setActionLoading(true)

    try {
      await closeProposal({
        proposalId: proposalNumber,
      })

      await onCloseSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [isWalletConnected, closeProposal, proposalNumber, onCloseSuccess])

  const awaitNextBlock = useAwaitNextBlock()
  // Refresh proposal and list of proposals (for list status) once voting ends.
  useEffect(() => {
    if (
      statusKey !== ProposalStatusEnum.Open ||
      !timestampInfo?.expirationDate
    ) {
      return
    }

    const msRemaining = timestampInfo?.expirationDate.getTime() - Date.now()
    if (msRemaining < 0) {
      return
    }

    const timeout = setTimeout(() => {
      // Refresh immediately so that the timestamp countdown re-renders and
      // hides itself.
      refreshProposal()
      // Refresh again after a block to make sure the status has been updated,
      // and refresh the list of all proposals so the status gets updated there
      // as well.
      awaitNextBlock().then(refreshProposalAndAll)
    }, msRemaining)
    return () => clearTimeout(timeout)
  }, [
    timestampInfo?.expirationDate,
    statusKey,
    refreshProposal,
    refreshProposalAndAll,
    awaitNextBlock,
  ])

  const vetoConfig = 'veto' in config ? config.veto : undefined
  const vetoEnabled = !!vetoConfig
  const [vetoLoading, setVetoLoading] = useState<
    'veto' | 'earlyExecute' | false
  >(false)
  const vetoerEntity = useEntity(vetoConfig?.vetoer || '')
  // Flatten vetoer entities in case a cw1-whitelist is the vetoer.
  const vetoerEntities = !vetoerEntity.loading
    ? vetoerEntity.data.type === EntityType.Cw1Whitelist
      ? vetoerEntity.data.entities
      : [vetoerEntity.data]
    : []
  const vetoerDaoEntities = vetoerEntities.filter(
    (entity) => entity.type === EntityType.Dao
  )
  // This is the voting power the current wallet has in each of the DAO vetoers.
  const walletDaoVetoerMemberships = useCachedLoading(
    !vetoerEntity.loading && walletAddress
      ? waitForAll(
          vetoerDaoEntities.map((entity) =>
            DaoCoreV2Selectors.votingPowerAtHeightSelector({
              contractAddress: entity.address,
              chainId,
              params: [{ address: walletAddress }],
            })
          )
        )
      : undefined,
    undefined
  )
  const canBeVetoed =
    vetoEnabled &&
    (statusKey === 'veto_timelock' ||
      (statusKey === ProposalStatusEnum.Open && vetoConfig.veto_before_passed))
  // Find matching vetoer for this wallet, which is either the wallet itself or
  // a DAO this wallet is a member of. If a matching vetoer is found, this
  // wallet can veto.
  const matchingWalletVetoer =
    canBeVetoed && !vetoerEntity.loading
      ? vetoerEntities.find(
          (entity) =>
            entity.type === EntityType.Wallet &&
            entity.address === walletAddress
        ) ||
        (!walletDaoVetoerMemberships.loading && walletDaoVetoerMemberships.data
          ? vetoerDaoEntities.find(
              (_, index) =>
                walletDaoVetoerMemberships.data![index].power !== '0'
            )
          : undefined)
      : undefined
  const walletCanEarlyExecute =
    !!matchingWalletVetoer &&
    statusKey === 'veto_timelock' &&
    !!vetoConfig?.early_execute
  const onVeto = useCallback(async () => {
    if (vetoerEntity.loading || !matchingWalletVetoer) {
      return
    }

    setVetoLoading('veto')
    try {
      if (
        vetoerEntity.data.type === EntityType.Wallet ||
        (vetoerEntity.data.type === EntityType.Cw1Whitelist &&
          matchingWalletVetoer.type === EntityType.Wallet)
      ) {
        const client = await getSigningCosmWasmClient()
        const msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: proposalModule.address,
              funds: [],
              msg: {
                veto: {
                  proposal_id: proposalNumber,
                },
              },
            },
          },
        })

        if (vetoerEntity.data.type === EntityType.Wallet) {
          await client.signAndBroadcast(
            walletAddress,
            [cwMsgToEncodeObject(msg, walletAddress)],
            CHAIN_GAS_MULTIPLIER
          )
        } else {
          await client.signAndBroadcast(
            walletAddress,
            [
              cwMsgToEncodeObject(
                makeCw1WhitelistExecuteMessage(vetoerEntity.data.address, msg),
                walletAddress
              ),
            ],
            CHAIN_GAS_MULTIPLIER
          )
        }

        await onVetoSuccess()
      } else if (matchingWalletVetoer.type === EntityType.Dao) {
        router.push(
          getDaoProposalPath(matchingWalletVetoer.address, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.VetoOrEarlyExecuteDaoProposal,
                  data: {
                    chainId,
                    coreAddress,
                    proposalModuleAddress: proposalModule.address,
                    proposalId: proposalNumber,
                    action: 'veto',
                  },
                },
              ],
            }),
          })
        )
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setVetoLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    vetoerEntity,
    matchingWalletVetoer,
    onVetoSuccess,
    proposalNumber,
    getSigningCosmWasmClient,
    walletAddress,
    proposalModule.address,
    router,
    getDaoProposalPath,
    chainId,
    coreAddress,
  ])
  const onVetoEarlyExecute = useCallback(async () => {
    if (vetoerEntity.loading || !matchingWalletVetoer) {
      return
    }

    setVetoLoading('earlyExecute')
    try {
      if (
        vetoerEntity.data.type === EntityType.Wallet ||
        (vetoerEntity.data.type === EntityType.Cw1Whitelist &&
          matchingWalletVetoer.type === EntityType.Wallet)
      ) {
        const client = await getSigningCosmWasmClient()
        const msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: proposalModule.address,
              funds: [],
              msg: {
                execute: {
                  proposal_id: proposalNumber,
                },
              },
            },
          },
        })

        if (vetoerEntity.data.type === EntityType.Wallet) {
          await client.signAndBroadcast(
            walletAddress,
            [cwMsgToEncodeObject(msg, walletAddress)],
            CHAIN_GAS_MULTIPLIER
          )
        } else {
          await client.signAndBroadcast(
            walletAddress,
            [
              cwMsgToEncodeObject(
                makeCw1WhitelistExecuteMessage(vetoerEntity.data.address, msg),
                walletAddress
              ),
            ],
            CHAIN_GAS_MULTIPLIER
          )
        }

        await onExecuteSuccess()
      } else if (matchingWalletVetoer.type === EntityType.Dao) {
        router.push(
          getDaoProposalPath(matchingWalletVetoer.address, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.VetoOrEarlyExecuteDaoProposal,
                  data: {
                    chainId,
                    coreAddress,
                    proposalModuleAddress: proposalModule.address,
                    proposalId: proposalNumber,
                    action: 'earlyExecute',
                  },
                },
              ],
            }),
          })
        )
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setVetoLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    vetoerEntity,
    matchingWalletVetoer,
    getSigningCosmWasmClient,
    proposalModule.address,
    proposalNumber,
    onExecuteSuccess,
    walletAddress,
    router,
    getDaoProposalPath,
    chainId,
    coreAddress,
  ])

  const info: ProposalStatusAndInfoProps<MultipleChoiceVote>['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <EntityDisplay {...props} address={coreAddress} noCopy />
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: (props) => (
        <EntityDisplay {...props} address={proposal.proposer} noCopy />
      ),
    },
    // Show vetoers if can be vetoed or was vetoed. If was not vetoed but could
    // have been, don't show because it might confuse the user and make them
    // think it was vetoed.
    ...(vetoConfig && (canBeVetoed || statusKey === ProposalStatusEnum.Vetoed)
      ? (vetoerEntities.map((entity) => ({
          Icon: ThumbDownOutlined,
          label: t('title.vetoer'),
          Value: (props) => (
            <EntityDisplay {...props} address={entity.address} noCopy />
          ),
        })) as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: (props) => (
        <p {...props}>{t(`proposalStatusTitle.${statusKey}`)}</p>
      ),
    },
    ...(proposal.allow_revoting
      ? ([
          {
            Icon: Redo,
            label: t('title.revoting'),
            Value: (props) => <p {...props}>{t('info.enabled')}</p>,
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    ...(timestampInfo?.display
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampInfo.display.label,
            Value: (props) => (
              <p {...props}>{timestampInfo.display!.content}</p>
            ),
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    ...(loadingExecutionTxHash.loading || loadingExecutionTxHash.data
      ? ([
          {
            Icon: Tag,
            label: t('info.txAbbr'),
            Value: (props) =>
              loadingExecutionTxHash.loading ? (
                <p className={clsx('animate-pulse', props.className)}>...</p>
              ) : loadingExecutionTxHash.data ? (
                <div className="flex flex-row items-center gap-1">
                  <CopyToClipboardUnderline
                    // Will truncate automatically.
                    takeAll
                    value={loadingExecutionTxHash.data}
                    {...props}
                  />

                  <IconButtonLink
                    Icon={ArrowOutward}
                    href={explorerUrlTemplates.tx.replace(
                      'REPLACE',
                      loadingExecutionTxHash.data
                    )}
                    variant="ghost"
                  />
                </div>
              ) : null,
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    ...(winningChoice &&
    (statusKey === ProposalStatusEnum.Passed ||
      statusKey === ProposalStatusEnum.Executed ||
      statusKey === ProposalStatusEnum.ExecutionFailed ||
      statusKey === 'veto_timelock')
      ? ([
          {
            Icon: PollOutlined,
            label: t('title.winningChoice'),
            Value: (props) => (
              <TooltipTruncatedText {...props} text={winningChoice.title} />
            ),
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
  ]

  let status: string
  if (statusKey === ProposalStatusEnum.Open) {
    if (quorumReached) {
      if (isTie) {
        status = t('info.proposalStatus.willFailTiedVote')
      } else {
        // Will pass
        status = t('info.proposalStatus.willPass', {
          context: vetoEnabled ? 'vetoEnabled' : undefined,
        })
      }
    } else {
      // Quorum not reached
      status = t('info.proposalStatus.willFailBadQuorum')
    }

    // not open
  } else {
    if (votingOpen) {
      // Proposal status is determined but voting is still open
      status = t('info.proposalStatus.completedAndOpen', {
        context: statusKey === ProposalStatusEnum.Vetoed ? 'vetoed' : undefined,
      })
    } else {
      const hasWinner = quorumReached && !isTie && winningChoice

      status = t('info.proposalStatus.notOpenMultipleChoice', {
        context:
          statusKey === ProposalStatusEnum.Passed
            ? 'passed'
            : statusKey === ProposalStatusEnum.Executed
            ? 'executed'
            : statusKey === ProposalStatusEnum.ExecutionFailed
            ? 'executionFailed'
            : statusKey === ProposalStatusEnum.Rejected
            ? 'rejected'
            : statusKey === ProposalStatusEnum.Closed
            ? 'closed'
            : statusKey === ProposalStatusEnum.Vetoed
            ? hasWinner
              ? 'vetoedWinner'
              : 'vetoedNoWinner'
            : undefined,
        turnoutPercent: formatPercentOf100(turnoutPercent),
        turnoutWinningPercent: hasWinner
          ? formatPercentOf100(winningChoice.turnoutVotePercentage)
          : undefined,
        turnoutWinner: hasWinner ? winningChoice.title : undefined,
      })
    }

    // Add sentence about closing to receive deposit back if it needs to be
    // closed and will refund.
    if (
      statusKey === ProposalStatusEnum.Rejected &&
      depositInfo?.refund_policy === DepositRefundPolicy.Always
    ) {
      status += ' ' + t('info.proposalDepositWillBeRefunded')
    }

    // Add sentence about veto status.
    if (canBeVetoed) {
      status += ' ' + t('info.proposalStatus.canStillBeVetoed')
    }
  }

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      action={
        statusKey === ProposalStatusEnum.Passed &&
        // Show if anyone can execute OR if the wallet is a member, once
        // polytone messages that need relaying are done loading.
        (!config.only_members_execute || isMember) &&
        !polytoneState.loading
          ? {
              label: t('button.execute'),
              Icon: Key,
              loading: actionLoading,
              doAction: polytoneState.data.needsSelfRelay
                ? polytoneState.data.openPolytoneRelay
                : onExecute,
            }
          : statusKey === ProposalStatusEnum.Rejected
          ? {
              label: t('button.close'),
              Icon: CancelOutlined,
              loading: actionLoading,
              doAction: onClose,
            }
          : // If executed and has polytone messages that need relaying...
          statusKey === ProposalStatusEnum.Executed &&
            !polytoneState.loading &&
            polytoneState.data.needsSelfRelay &&
            !loadingExecutionTxHash.loading &&
            loadingExecutionTxHash.data
          ? {
              label: t('button.relay'),
              Icon: Send,
              loading: actionLoading,
              doAction: polytoneState.data.openPolytoneRelay,
              description: t('error.polytoneExecutedNoRelay'),
            }
          : undefined
      }
      footer={
        !polytoneState.loading &&
        statusKey === ProposalStatusEnum.Executed &&
        polytoneState.data.hasPolytoneMessages && (
          <ProposalCrossChainRelayStatus state={polytoneState.data} />
        )
      }
      info={info}
      status={status}
      vetoOrEarlyExecute={
        matchingWalletVetoer
          ? {
              loading: vetoLoading,
              onVeto,
              onEarlyExecute: walletCanEarlyExecute
                ? onVetoEarlyExecute
                : undefined,
              isVetoerDaoMember: matchingWalletVetoer.type === EntityType.Dao,
            }
          : undefined
      }
      vote={
        loadingWalletVoteInfo &&
        !loadingWalletVoteInfo.loading &&
        loadingWalletVoteInfo.data.canVote &&
        !voteOptions.loading
          ? {
              loading: castingVote,
              currentVote: loadingWalletVoteInfo.data.vote,
              onCastVote: castVote,
              options: voteOptions.data,
              proposalOpen: statusKey === ProposalStatusEnum.Open,
            }
          : undefined
      }
    />
  )
}

const InnerProposalStatusAndInfoLoader = (
  props: BaseProposalStatusAndInfoProps
) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()

  const LoaderP: ComponentType<{ className: string }> = ({ className }) => (
    <p className={clsx('animate-pulse', className)}>...</p>
  )
  const info: ProposalStatusAndInfoProps<MultipleChoiceVote>['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink href={`/dao/${coreAddress}`} variant="underline" {...props}>
          {daoName}
        </ButtonLink>
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: LoaderP,
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: LoaderP,
    },
    {
      Icon: HourglassTopRounded,
      label: t('title.date'),
      Value: LoaderP,
    },
  ]

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      info={info}
      status={t('info.loading')}
    />
  )
}
