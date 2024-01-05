import {
  AccountCircleOutlined,
  ArrowOutwardRounded,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  Redo,
  RotateRightOutlined,
  Send,
  Tag,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoProposalSingleCommonSelectors,
} from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalCrossChainRelayStatus,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  Tooltip,
  useCachedLoading,
  useConfiguredChainContext,
  useDaoInfoContext,
  useDaoNavHelpers,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  ActionKey,
  BaseProposalStatusAndInfoProps,
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
  EntityType,
  PreProposeModuleType,
  ProposalStatusEnum,
} from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  CHAIN_GAS_MULTIPLIER,
  cwMsgToEncodeObject,
  formatDateTimeTz,
  formatPercentOf100,
  getDaoProposalSinglePrefill,
  getProposalStatusKey,
  makeCw1WhitelistExecuteMessage,
  makeWasmMessage,
  processError,
} from '@dao-dao/utils'

import { ButtonLink, SuspenseLoader } from '../../../../components'
import { EntityDisplay } from '../../../../components/EntityDisplay'
import {
  CwProposalSingleV1Hooks,
  DaoProposalSingleV2Hooks,
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
import { ProposalStatusAndInfoLoader } from './ProposalStatusAndInfoLoader'

export const ProposalStatusAndInfo = (
  props: BaseProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingProposal()
  const loadingVotesInfo = useLoadingVotesInfo()
  const loadingDepositInfo = useLoadingDepositInfo()

  return (
    <SuspenseLoader
      fallback={<ProposalStatusAndInfoLoader {...props} />}
      forceFallback={
        loadingProposal.loading ||
        loadingVotesInfo.loading ||
        loadingDepositInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingVotesInfo.loading &&
        !loadingDepositInfo.loading && (
          <InnerProposalStatusAndInfo
            {...props}
            depositInfo={loadingDepositInfo.data}
            proposal={loadingProposal.data}
            votesInfo={loadingVotesInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

const InnerProposalStatusAndInfo = ({
  proposal: { timestampInfo, votingOpen, vetoTimelockExpiration, ...proposal },
  votesInfo: {
    quorum,
    thresholdReached,
    quorumReached,
    turnoutPercent,
    turnoutYesPercent,
  },
  depositInfo,
  onVoteSuccess,
  onExecuteSuccess,
  onVetoSuccess,
  onCloseSuccess,
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
    DaoProposalSingleCommonSelectors.configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )

  const creatorAddress =
    proposalModule.prePropose?.type === PreProposeModuleType.Approver
      ? proposalModule.prePropose.config.approvalDao
      : proposal.proposer

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const loadingExecutionTxHash = useLoadingProposalExecutionTxHash()
  const { refreshProposal, refreshProposalAndAll } = useProposalRefreshers()

  const approver =
    proposalModule.prePropose?.type === PreProposeModuleType.Approval
      ? proposalModule.prePropose.config.approver
      : undefined
  const approverProposalPath =
    proposalModule.prePropose?.type === PreProposeModuleType.Approval &&
    !!proposalModule.prePropose.config.preProposeApproverContract &&
    proposal.approverProposalId
      ? getDaoProposalPath(
          proposalModule.prePropose.config.approver,
          proposal.approverProposalId
        )
      : undefined

  const approvalDao =
    proposalModule.prePropose?.type === PreProposeModuleType.Approver
      ? proposalModule.prePropose.config.approvalDao
      : undefined
  const approvedProposalPath =
    approvalDao && proposal.approvedProposalId
      ? getDaoProposalPath(approvalDao, proposal.approvedProposalId)
      : undefined

  const statusKey = getProposalStatusKey(proposal.status)

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  const voteOptions = useLoadingVoteOptions()
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  const executeProposal = (
    proposalModule.version === ContractVersion.V1
      ? CwProposalSingleV1Hooks.useExecute
      : DaoProposalSingleV2Hooks.useExecute
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = (
    proposalModule.version === ContractVersion.V1
      ? CwProposalSingleV1Hooks.useClose
      : DaoProposalSingleV2Hooks.useClose
  )({
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
    msgs: proposal.msgs,
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
      await executeProposal({
        proposalId: proposalNumber,
      })

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

  const info: ProposalStatusAndInfoProps<Vote>['info'] = [
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
        <EntityDisplay {...props} address={creatorAddress} noCopy />
      ),
    },
    ...(approverProposalPath
      ? ([
          {
            Icon: ThumbUpOutlined,
            label: t('title.approval'),
            Value: (props) => (
              <Tooltip
                morePadding
                title={approver && <EntityDisplay address={approver} noCopy />}
              >
                <ButtonLink
                  href={approverProposalPath}
                  variant="underline"
                  {...props}
                >
                  {t('title.proposalId', {
                    id: proposal.approverProposalId,
                  })}
                </ButtonLink>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : approver
      ? ([
          {
            Icon: ThumbUpOutlined,
            label: t('title.approver'),
            Value: (props) => (
              <EntityDisplay {...props} address={approver} noCopy />
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
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
        })) as ProposalStatusAndInfoProps<Vote>['info'])
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
        ] as ProposalStatusAndInfoProps<Vote>['info'])
      : []),
    ...(timestampInfo?.display
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampInfo.display.label,
            Value: (props) => (
              <Tooltip title={timestampInfo.display!.tooltip}>
                <p {...props}>{timestampInfo.display!.content}</p>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps<Vote>['info'])
      : []),
    ...(vetoTimelockExpiration
      ? ([
          {
            Icon: HourglassTopRounded,
            label: t('title.vetoTimeLeft'),
            Value: (props) => (
              <Tooltip title={formatDateTimeTz(vetoTimelockExpiration)}>
                <p {...props}>
                  <TimeAgo
                    date={vetoTimelockExpiration}
                    formatter={timeAgoFormatter}
                  />
                </p>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps<Vote>['info'])
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
                    Icon={ArrowOutwardRounded}
                    href={explorerUrlTemplates.tx.replace(
                      'REPLACE',
                      loadingExecutionTxHash.data
                    )}
                    variant="ghost"
                  />
                </div>
              ) : null,
          },
        ] as ProposalStatusAndInfoProps<Vote>['info'])
      : []),
    ...(approvedProposalPath
      ? ([
          {
            Icon: ThumbUpOutlined,
            label: t('title.approved'),
            Value: (props) => (
              <Tooltip
                morePadding
                title={
                  approvalDao && <EntityDisplay address={approvalDao} noCopy />
                }
              >
                <ButtonLink
                  href={approvedProposalPath}
                  variant="underline"
                  {...props}
                >
                  {t('title.proposalId', {
                    id: proposal.approvedProposalId,
                  })}
                </ButtonLink>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
  ]

  let status: string
  if (statusKey === ProposalStatusEnum.Open) {
    if (!quorum || quorumReached) {
      if (thresholdReached) {
        status = t('info.proposalStatus.willPass', {
          context: vetoEnabled ? 'vetoEnabled' : undefined,
        })
      } else {
        status = t('info.proposalStatus.willFailBadThreshold')
      }

      // quorum && !quorumReached
    } else if (thresholdReached) {
      status = t('info.proposalStatus.willFailBadQuorum')
    } else {
      status = t('info.proposalStatus.willFail')
    }

    // not open
  } else {
    if (votingOpen) {
      // Proposal status is determined but voting is still open
      status = t('info.proposalStatus.completedAndOpen', {
        context: statusKey === ProposalStatusEnum.Vetoed ? 'vetoed' : undefined,
      })
    } else {
      status = t('info.proposalStatus.notOpenSingleChoice', {
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
            ? thresholdReached && (!quorum || quorumReached)
              ? 'vetoedPassed'
              : 'vetoedNotPassed'
            : undefined,
        turnoutPercent: formatPercentOf100(turnoutPercent),
        turnoutYesPercent: formatPercentOf100(turnoutYesPercent),
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
