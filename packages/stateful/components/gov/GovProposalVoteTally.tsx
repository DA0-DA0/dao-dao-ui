import { Block, Check, Close } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ProposalStatus } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { ProgressBar, Tooltip, TooltipInfoIcon } from '@dao-dao/stateless'
import { GovProposalWithMetadata, ProcessedTQType } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useLoadingGovProposal } from '../../hooks/useLoadingGovProposal'
import { SuspenseLoader } from '../SuspenseLoader'

export type GovProposalVoteTallyProps = {
  proposalId: string
}

export const GovProposalVoteTally = ({
  proposalId,
}: GovProposalVoteTallyProps) => {
  const loadingProposal = useLoadingGovProposal(proposalId)

  return (
    <SuspenseLoader
      fallback={<GovProposalVoteTallyLoader />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerGovProposalTally proposal={loadingProposal.data} />
      )}
    </SuspenseLoader>
  )
}

const InnerGovProposalTally = ({
  proposal: {
    proposal: { status },
    votesInfo: {
      threshold,
      quorum,
      vetoThreshold,
      // Raw info
      yesVotes,
      noVotes,
      abstainVotes,
      turnoutTotal,
      // Turnout percents
      turnoutPercent,
      turnoutYesPercent,
      turnoutNoPercent,
      turnoutAbstainPercent,
      turnoutNoWithVetoPercent,
      // Meta
      thresholdReached,
      quorumReached,
      vetoReached,
    },
  },
}: {
  proposal: GovProposalWithMetadata
}) => {
  const { t } = useTranslation()

  const open = status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD

  // Type-check for values below. Should never happen.
  if (
    threshold.type !== ProcessedTQType.Percent ||
    quorum.type !== ProcessedTQType.Percent ||
    vetoThreshold.type !== ProcessedTQType.Percent
  ) {
    return null
  }

  const votePercentages = [
    {
      value: turnoutYesPercent,
      node: (
        <p className="text-text-interactive-valid">
          {formatPercentOf100(turnoutYesPercent)} {t('info.yesVote')}
        </p>
      ),
    },
    {
      value: turnoutNoPercent,
      node: (
        <p className="text-text-interactive-error">
          {formatPercentOf100(turnoutNoPercent)} {t('info.noVote')}
        </p>
      ),
    },
    {
      value: turnoutNoWithVetoPercent,
      node: (
        <p className="text-text-interactive-error opacity-60">
          {formatPercentOf100(turnoutNoWithVetoPercent)} {t('info.noWithVeto')}
        </p>
      ),
    },
  ]
    // Sort largest first.
    .sort((a, b) => b.value - a.value)

  // Cannot retrieve bonded tokens in the past, so can't show accurate quorum
  // once the vote concludes.
  const quorumShowing =
    status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
    status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD

  return (
    <div className="rounded-lg border border-border-secondary bg-component-widget">
      <div className="space-y-4 py-4 px-6">
        {/* Threshold title */}
        <p className="link-text text-text-body">
          {quorum ? t('title.ratioOfVotes') : t('title.turnout')}
        </p>

        {/* Vote percentage stats */}
        <div className="caption-text flex flex-row items-center gap-4">
          {votePercentages.map(({ node }, idx) => (
            <div key={idx} className={idx === 0 ? 'flex-1' : ''}>
              {node}
            </div>
          ))}

          <p className="text-text-tertiary">
            {formatPercentOf100(turnoutAbstainPercent)} {t('info.abstainVote')}
          </p>
        </div>

        {/* Threshold progress bar */}
        <div>
          <ProgressBar
            caretPosition={threshold.value}
            rows={[
              {
                thickness: 10,
                data: [
                  ...[
                    {
                      value: Number(turnoutYesPercent),
                      color: 'var(--icon-interactive-valid)',
                    },
                    {
                      value: Number(turnoutNoPercent),
                      color: 'var(--icon-interactive-error)',
                    },
                    {
                      value: Number(turnoutNoWithVetoPercent),
                      color: 'var(--icon-interactive-error)',
                    },
                  ].sort((a, b) => b.value - a.value),
                  {
                    value: Number(turnoutAbstainPercent),
                    color: 'var(--icon-tertiary)',
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="secondary-text flex flex-row items-center justify-between gap-2">
          <p className="text-text-tertiary">{t('title.passingThreshold')}</p>

          {/* Threshold config display */}
          <p className="flex flex-row items-center gap-1">
            <Tooltip title={t('info.proposalThresholdTooltip')}>
              <p className="text-text-body">{threshold.display}</p>
            </Tooltip>

            {vetoReached ? (
              <Tooltip title={open ? t('info.vetoing') : t('info.vetoed')}>
                <Block className="!h-5 !w-5 text-icon-primary" />
              </Tooltip>
            ) : thresholdReached ? (
              <Tooltip title={open ? t('info.passing') : t('info.reached')}>
                <Check className="!h-5 !w-5 text-icon-primary" />
              </Tooltip>
            ) : (
              <Tooltip title={open ? t('info.failing') : t('info.notMet')}>
                <Close className="!h-5 !w-5 text-icon-primary" />
              </Tooltip>
            )}
          </p>
        </div>

        <div className="secondary-text !mt-2 flex flex-row items-center justify-between gap-2">
          <p className="text-text-tertiary">{t('title.vetoThreshold')}</p>

          {/* Veto threshold config display */}
          <p className="flex flex-row items-center gap-1">
            <Tooltip title={t('info.proposalThresholdTooltip')}>
              <p className="text-text-body">{vetoThreshold.display}</p>
            </Tooltip>

            {vetoReached ? (
              <Tooltip title={open ? t('info.vetoing') : t('info.vetoed')}>
                <Check className="!h-5 !w-5 text-icon-primary" />
              </Tooltip>
            ) : (
              <Tooltip title={t('info.notMet')}>
                <Close className="!h-5 !w-5 text-icon-primary" />
              </Tooltip>
            )}
          </p>
        </div>
      </div>

      {/* Quorum */}
      <div className="space-y-4 border-t border-border-secondary py-4 px-6">
        {/* Quorum title */}
        <p className="link-text text-text-body">
          {quorumShowing
            ? t('title.percentTurnout', {
                value: formatPercentOf100(turnoutPercent),
              })
            : t('title.quorum')}
        </p>

        {quorumShowing ? (
          <>
            {/* Quorum progress bar */}
            <div className="my-2">
              <ProgressBar
                caretPosition={quorum.value}
                rows={[
                  {
                    thickness: 10,
                    data: [
                      {
                        value: Number(turnoutPercent),
                        color: 'var(--icon-secondary)',
                      },
                    ],
                  },
                ]}
              />
            </div>

            {/* Quorum config display */}
            <div className="secondary-text flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1">
                <p className="text-text-tertiary">{t('title.quorum')}</p>
                <TooltipInfoIcon
                  iconClassName="text-icon-tertiary"
                  size="sm"
                  title={t('info.proposalQuorumTooltip')}
                />
              </div>

              <p className="flex flex-row items-center gap-1">
                <Tooltip title={t('info.proposalQuorumTooltip')}>
                  <p className="text-text-body">{quorum.display}</p>
                </Tooltip>

                {quorumReached ? (
                  <Tooltip title={t('info.reached')}>
                    <Check className="!h-5 !w-5 text-icon-primary" />
                  </Tooltip>
                ) : (
                  <Tooltip title={t('info.notMet')}>
                    <Close className="!h-5 !w-5 text-icon-primary" />
                  </Tooltip>
                )}
              </p>
            </div>
          </>
        ) : (
          <p className="secondary-text !mt-1">
            {t('info.pastGovPropQuorumHiddenExplanation', {
              context:
                status === ProposalStatus.PROPOSAL_STATUS_PASSED
                  ? 'passed'
                  : 'rejected',
            })}
          </p>
        )}
      </div>

      {turnoutTotal > 0 && !vetoReached && (
        <>
          {/* Provide clarification for what happens in the event of a tie when the threshold is exactly 50%. */}
          {threshold.value === 50 && yesVotes === noVotes && (
            <div className="space-y-2 border-t border-border-secondary py-4 px-6">
              <p className="secondary-text text-text-tertiary">
                {t('title.proposalTieClarification')}
              </p>

              <p className="body-text">
                {t('info.yesWillWinTieClarification')}
              </p>
            </div>
          )}

          {/* Provide clarification for what happens in the event that all voters abstain. */}
          {abstainVotes === turnoutTotal && (
            <div className="space-y-2 border-t border-border-secondary py-4 px-6">
              <p className="secondary-text text-text-tertiary">
                {t('title.proposalAllAbstain')}
              </p>

              <p className="body-text">
                {t('info.proposalAllAbstainClarification')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export const GovProposalVoteTallyLoader = () => {
  const { t } = useTranslation()

  return (
    <div className="animate-pulse rounded-lg border border-border-secondary bg-component-widget">
      <div className="space-y-4 py-4 px-6">
        {/* Threshold title */}
        <p className="link-text text-text-body">{t('title.ratioOfVotes')}</p>

        {/* Vote percentage stats */}
        <div className="caption-text flex flex-row items-center gap-4">
          <p key="yes" className="text-text-interactive-valid">
            ... {t('info.yesVote')}
          </p>
          <p key="no" className="text-text-interactive-error">
            ... {t('info.noVote')}
          </p>
          <p className="text-text-tertiary">... {t('info.abstainVote')}</p>
        </div>

        {/* Threshold progress bar */}
        <div className="my-2">
          <ProgressBar
            rows={[
              {
                thickness: 10,
              },
            ]}
          />
        </div>

        <div className="secondary-text flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-1">
            <p className="text-text-tertiary">{t('title.passingThreshold')}</p>
            <TooltipInfoIcon
              iconClassName="text-icon-tertiary"
              size="sm"
              title={t('info.proposalThresholdTooltip')}
            />
          </div>

          {/* Threshold config display */}
          <p className="flex flex-row items-center">
            <Tooltip title={t('info.proposalThresholdTooltip')}>
              <p className="text-text-body">...</p>
            </Tooltip>
          </p>
        </div>

        <div className="secondary-text flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-1">
            <p className="text-text-tertiary">{t('title.vetoThreshold')}</p>
            <TooltipInfoIcon
              iconClassName="text-icon-tertiary"
              size="sm"
              title={t('info.vetoThresholdTooltip')}
            />
          </div>

          {/* Veto threshold config display */}
          <p className="flex flex-row items-center">
            <Tooltip title={t('info.vetoThresholdTooltip')}>
              <p className="text-text-body">...</p>
            </Tooltip>
          </p>
        </div>
      </div>

      {/* Quorum, if present */}
      <div className="space-y-4 border-t border-border-secondary py-4 px-6">
        {/* Quorum title */}
        <p className="link-text text-text-body">{t('title.turnout')}</p>

        {/* Quorum progress bar */}
        <div className="my-2">
          <ProgressBar
            rows={[
              {
                thickness: 10,
              },
            ]}
          />
        </div>

        {/* Quorum config display */}
        <div className="secondary-text flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-1">
            <p className="text-text-tertiary">{t('title.quorum')}</p>
            <TooltipInfoIcon
              iconClassName="text-icon-tertiary"
              size="sm"
              title={t('info.proposalQuorumTooltip')}
            />
          </div>

          <p className="flex flex-row items-center">
            <Tooltip title={t('info.proposalQuorumTooltip')}>
              <p className="text-text-body">...</p>
            </Tooltip>
          </p>
        </div>
      </div>
    </div>
  )
}
