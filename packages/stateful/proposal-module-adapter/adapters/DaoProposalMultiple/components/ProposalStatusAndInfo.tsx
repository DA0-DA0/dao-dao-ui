import {
  AccountCircleOutlined,
  ArrowOutwardRounded,
  HourglassTopRounded,
  PollOutlined,
  Redo,
  RotateRightOutlined,
  Tag,
  ThumbUpOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentProps, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'
import { useRecoilValue } from 'recoil'

import { DaoProposalMultipleSelectors } from '@dao-dao/state'
import {
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  Tooltip,
  TooltipTruncatedText,
  useConfiguredChainContext,
  useDao,
  useDaoNavHelpers,
  useExecuteAt,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  CheckedDepositInfo,
  DepositRefundPolicy,
  LoadingData,
  PreProposeModuleType,
  ProposalStatusEnum,
} from '@dao-dao/types'
import {
  formatDateTime,
  formatDateTimeTz,
  formatPercentOf100,
  getProposalStatusKey,
  humanReadableExpiration,
  processError,
} from '@dao-dao/utils'

import {
  ButtonLink,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import {
  useAwaitNextBlock,
  useProposalActionState,
  useProposalVetoState,
  useTxRelayState,
} from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import {
  useLoadingDepositInfo,
  useLoadingProposal,
  useLoadingProposalExecutionTxHash,
  useLoadingVotesInfo,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
} from '../hooks'
import { ProposalWithMetadata, VotesInfo } from '../types'
import { ProposalStatusAndInfoLoader } from './ProposalStatusAndInfoLoader'
import { ProposalVoter } from './ProposalVoter'

export const ProposalStatusAndInfo = (
  props: BaseProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingProposal()
  const loadingMultipleChoiceVotesInfo = useLoadingVotesInfo()
  const loadingDepositInfo = useLoadingDepositInfo()

  return (
    <SuspenseLoader
      fallback={<ProposalStatusAndInfoLoader {...props} />}
      forceFallback={
        loadingProposal.loading || loadingMultipleChoiceVotesInfo.loading
      }
    >
      {!loadingProposal.loading && !loadingMultipleChoiceVotesInfo.loading && (
        <InnerProposalStatusAndInfo
          {...props}
          loadingDepositInfo={loadingDepositInfo}
          proposal={loadingProposal.data}
          votesInfo={loadingMultipleChoiceVotesInfo.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalStatusAndInfo = ({
  proposal: { timestampInfo, votingOpen, vetoTimelock, ...proposal },
  votesInfo: { winningChoice, quorumReached, turnoutPercent, isTie },
  loadingDepositInfo,
  onExecuteSuccess,
  onCloseSuccess,
  onVetoSuccess,
  openSelfRelayExecute,
  voter,
  ...props
}: BaseProposalStatusAndInfoProps & {
  proposal: ProposalWithMetadata
  votesInfo: VotesInfo
  loadingDepositInfo: LoadingData<CheckedDepositInfo | undefined>
}) => {
  const { t } = useTranslation()
  const {
    chain: { chainId },
    config: { explorerUrlTemplates },
  } = useConfiguredChainContext()
  const { coreAddress } = useDao()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()

  const config = useRecoilValue(
    DaoProposalMultipleSelectors.configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )

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

  const statusKey = getProposalStatusKey(proposal.status)

  const relayState = useTxRelayState({
    msgs: winningChoice?.msgs || [],
    context: {
      type: 'proposal',
      proposalModuleAddress: proposalModule.address,
      proposalNumber,
      executed: proposal.status === ProposalStatusEnum.Executed,
      executedAt: proposal.executedAt,
    },
    openSelfRelayExecute,
    loadingTxHash: loadingExecutionTxHash,
  })
  const { action, footer } = useProposalActionState({
    description: winningChoice?.description || '',
    proposalStartHeight: proposal.start_height,
    statusKey,
    relayState,
    loadingExecutionTxHash,
    onExecuteSuccess,
    onCloseSuccess,
  })

  const awaitNextBlock = useAwaitNextBlock()
  // Refresh proposal and list of proposals (for list status) once voting or
  // veto period ends.
  useExecuteAt({
    fn: () => {
      // Refresh immediately so that the timestamp countdown re-renders and
      // hides itself.
      refreshProposal()
      // Refresh again after a block to make sure the status has been updated,
      // and refresh the list of all proposals so the status gets updated there
      // as well.
      awaitNextBlock().then(refreshProposalAndAll)
    },
    date:
      statusKey === ProposalStatusEnum.Open
        ? timestampInfo.expirationDate
        : statusKey === 'veto_timelock'
          ? vetoTimelock?.date
          : undefined,
  })

  const { vetoEnabled, canBeVetoed, vetoOrEarlyExecute, vetoInfoItems } =
    useProposalVetoState({
      statusKey,
      vetoConfig: 'veto' in config ? config.veto : undefined,
      onVetoSuccess,
      onExecuteSuccess,
    })

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: (props) => <Logo {...props} />,
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
    ...vetoInfoItems,
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
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(timestampInfo.display
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
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(vetoTimelock &&
    (vetoTimelock.date || 'at_height' in vetoTimelock.expiration)
      ? ([
          {
            Icon: HourglassTopRounded,
            label: vetoTimelock.date
              ? t('title.vetoTimeLeft')
              : 'at_height' in vetoTimelock.expiration
                ? t('title.vetoEndBlock')
                : undefined,
            Value: (props) =>
              vetoTimelock.date ? (
                <Tooltip title={formatDateTimeTz(vetoTimelock.date)}>
                  <p {...props}>
                    <TimeAgo
                      date={vetoTimelock.date}
                      formatter={timeAgoFormatter}
                    />
                  </p>
                </Tooltip>
              ) : (
                <p {...props}>
                  {humanReadableExpiration(
                    t,
                    formatDateTime,
                    vetoTimelock.expiration
                  )}
                </p>
              ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...((statusKey === ProposalStatusEnum.Executed ||
      statusKey === ProposalStatusEnum.ExecutionFailed) &&
    (loadingExecutionTxHash.loading ||
      loadingExecutionTxHash.errored ||
      loadingExecutionTxHash.data)
      ? ([
          {
            Icon: Tag,
            label: t('info.txAbbr'),
            Value: (props) =>
              loadingExecutionTxHash.loading ? (
                <p className={clsx('animate-pulse', props.className)}>...</p>
              ) : loadingExecutionTxHash.errored ? (
                <Tooltip
                  title={processError(loadingExecutionTxHash.error, {
                    forceCapture: false,
                  })}
                >
                  <p className={clsx('animate-pulse', props.className)}>
                    {t('info.errored')}
                  </p>
                </Tooltip>
              ) : loadingExecutionTxHash.data ? (
                <div className="flex w-full flex-row items-center gap-1 overflow-hidden">
                  <CopyToClipboardUnderline
                    // Will truncate automatically.
                    takeAll
                    value={loadingExecutionTxHash.data}
                    {...props}
                  />

                  {!!explorerUrlTemplates?.tx && (
                    <IconButtonLink
                      Icon={ArrowOutwardRounded}
                      href={explorerUrlTemplates.tx.replace(
                        'REPLACE',
                        loadingExecutionTxHash.data
                      )}
                      size="sm"
                      variant="ghost"
                    />
                  )}
                </div>
              ) : null,
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(winningChoice &&
    (statusKey === ProposalStatusEnum.Passed ||
      statusKey === ProposalStatusEnum.Executed ||
      statusKey === ProposalStatusEnum.ExecutionFailed ||
      statusKey === 'veto_timelock' ||
      statusKey === ProposalStatusEnum.NeutronTimelocked)
      ? ([
          {
            Icon: PollOutlined,
            label: t('title.winningChoice'),
            Value: (props) => (
              <TooltipTruncatedText {...props} text={winningChoice.title} />
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
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
                      : statusKey === 'veto_timelock'
                        ? 'vetoTimelock'
                        : statusKey === ProposalStatusEnum.NeutronOverruled
                          ? 'overruled'
                          : statusKey === ProposalStatusEnum.NeutronTimelocked
                            ? 'overruleTimelock'
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
      !loadingDepositInfo.loading &&
      loadingDepositInfo.data?.refund_policy === DepositRefundPolicy.Always
    ) {
      status += ' ' + t('info.proposalDepositWillBeRefunded')
    }

    // Add sentence about veto status.
    if (canBeVetoed) {
      status += ' ' + t('info.proposalStatus.canStillBeVetoed')
    }
  }

  const Voter = useCallback(
    (props: ComponentProps<Required<ProposalStatusAndInfoProps>['Voter']>) => (
      <ProposalVoter {...props} onVoteSuccess={voter.onVoteSuccess} />
    ),
    [voter.onVoteSuccess]
  )

  const canVote =
    !!loadingWalletVoteInfo &&
    !loadingWalletVoteInfo.loading &&
    loadingWalletVoteInfo.data.canVote

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      Voter={canVote ? Voter : undefined}
      action={action}
      footer={footer}
      info={info}
      status={status}
      vetoOrEarlyExecute={vetoOrEarlyExecute}
    />
  )
}
