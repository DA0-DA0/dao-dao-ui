import { Check, Close } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ProgressBar, Tooltip, TooltipInfoIcon } from '@dao-dao/stateless'
import { ProcessedTQType } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { VotesInfo } from '../../types'

export interface ProposalVoteTallyProps {
  votesInfo: VotesInfo
  open: boolean
}

export const ProposalVoteTally = ({
  votesInfo: {
    quorum,
    isTie,
    processedChoices,
    turnoutPercent,
    turnoutTotal,
    quorumReached,
  },
}: ProposalVoteTallyProps) => {
  const { t } = useTranslation()

  const winningChoice = processedChoices.reduce((prev, current) => {
    return Number(prev.vote_count) > Number(current.vote_count) ? prev : current
  })

  const effectiveQuorum = quorum && {
    display: quorum.display,
    value: quorum.type === ProcessedTQType.Majority ? 50 : quorum.value,
  }

  return (
    <div className="flex flex-col">
      <p className="primary-text gap-4 py-4 pt-5 text-text-body">
        {t('title.votingProgress')}
      </p>
      <div className="rounded-lg border border-border-secondary bg-component-widget">
        <div className="space-y-4 py-4 px-6">
          {/* Threshold title */}
          <p className="link-text text-text-body">
            {quorum ? t('title.ratioOfVotes') : t('title.turnout')}
          </p>

          {/* Votes progress bar */}
          <div className="my-2">
            <ProgressBar
              rows={[
                {
                  thickness: 10,
                  data: [
                    ...processedChoices.map((choice) => {
                      const tooltipTitle =
                        formatPercentOf100(choice.turnoutVotePercentage) +
                        ' ' +
                        choice.title
                      return {
                        value: Number(choice.turnoutVotePercentage),
                        color: choice.color,
                        tooltipTitle: tooltipTitle,
                      }
                    }),
                  ],
                },
              ]}
            />
          </div>

          {turnoutTotal > 0 && (
            <div className="secondary-text flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1">
                <p className="text-text-tertiary">{t('title.currentWinner')}</p>
              </div>

              {/* Winning option display */}
              <p className="flex flex-row items-center gap-1">
                <p className="text-text-body">
                  {isTie ? t('title.Tied') : winningChoice.title}
                </p>
              </p>
            </div>
          )}
        </div>

        {/* Quorum, if present */}
        {effectiveQuorum && (
          <div className="space-y-4 border-t border-border-secondary py-4 px-6">
            {/* Quorum title */}
            <p className="link-text text-text-body">
              {t('title.percentTurnout', {
                value: formatPercentOf100(turnoutPercent),
              })}
            </p>

            {/* Quorum progress bar */}
            <div className="my-2">
              <ProgressBar
                caretPosition={effectiveQuorum.value}
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
                  <p className="text-text-body">{effectiveQuorum.display}</p>
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
          </div>
        )}
      </div>
    </div>
  )
}

export const ProposalVoteTallyLoader = () => {
  const { t } = useTranslation()

  return (
    <div className="animate-pulse rounded-lg border border-border-secondary bg-component-widget">
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
