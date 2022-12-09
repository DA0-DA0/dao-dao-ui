import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ProposalWalletVote, Tooltip } from '@dao-dao/stateless'
import { formatDateTimeTz } from '@dao-dao/utils'

import { Status, SurveyStatus } from '../../types'

export interface OpenSurveySectionProps {
  status: Status
  onClick?: () => void
  loading: boolean
  connected: boolean
  isMember: boolean
  tooltip?: string
}

export const OpenSurveySection = ({
  status: {
    contribution,
    rated,
    survey: {
      status,
      name,
      contributionsOpenAt,
      contributionsCloseRatingsOpenAt,
    },
  },
  onClick,
  loading,
  connected,
  isMember,
  tooltip,
}: OpenSurveySectionProps) => {
  const { t } = useTranslation()

  const sectionTitleKey =
    status === SurveyStatus.Inactive
      ? 'title.upcoming'
      : status === SurveyStatus.AcceptingContributions
      ? 'title.acceptingSubmissions'
      : 'info.waitingForRateAndPropose'

  // Display upcoming date first, then date when contributions close. Even
  // during processing, show the date when contributions closed.
  const date =
    status === SurveyStatus.Inactive
      ? t('info.opensAtDate', {
          date: formatDateTimeTz(new Date(contributionsOpenAt)),
        })
      : status === SurveyStatus.AcceptingContributions
      ? t('info.closesAtDate', {
          date: formatDateTimeTz(new Date(contributionsCloseRatingsOpenAt)),
        })
      : t('info.closedAtDate', {
          date: formatDateTimeTz(new Date(contributionsCloseRatingsOpenAt)),
        })

  const submitted =
    connected &&
    ((!isMember && !!contribution) ||
      (isMember &&
        (status === SurveyStatus.AcceptingContributions
          ? !!contribution
          : status === SurveyStatus.AcceptingRatings
          ? rated
          : // Always display pending/badge when awaiting completion.
            false)))
  const canPerformAction =
    connected &&
    (status === SurveyStatus.AcceptingContributions ||
      (isMember &&
        (status === SurveyStatus.AcceptingRatings ||
          status === SurveyStatus.AwaitingCompletion)))
  // Don't show if wallet not connected or inactive (upcoming).
  const statusDisplay = connected && status !== SurveyStatus.Inactive && (
    <ProposalWalletVote
      className={clsx(
        '!w-auto ring-2 ring-inset',
        submitted
          ? 'text-text-body ring-component-badge-valid'
          : canPerformAction
          ? 'text-text-body ring-component-badge-brand'
          : 'text-text-tertiary ring-border-secondary'
      )}
      label={
        submitted
          ? t('info.submitted')
          : canPerformAction
          ? t('info.pending')
          : // Did not submit when it was open.
            t('info.noSubmission')
      }
      showBadge={
        // True when isMember and status is awaiting completion, since submitted
        // is set to false.
        !submitted && canPerformAction
      }
    />
  )

  return (
    <>
      <div className="link-text ml-2 flex flex-row items-center gap-3">
        <ArrowDropDown className="!h-4 !w-4 text-icon-primary" />

        <p className="text-text-secondary">{t(sectionTitleKey)}</p>
      </div>

      <Tooltip title={tooltip}>
        <div
          className={clsx(
            'rounded-md bg-background-secondary',
            onClick &&
              'cursor-pointer transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
            loading && 'animate-pulse'
          )}
          onClick={onClick}
        >
          {/* Desktop */}
          <div className="hidden h-12 flex-row items-center gap-6 p-3 sm:flex">
            <p className="body-text grow truncate">{name}</p>

            <p className="caption-text shrink-0 break-words text-right font-mono">
              {date}
            </p>

            {statusDisplay}
          </div>

          {/* Mobile */}
          <div className="flex flex-col justify-between gap-2 rounded-md p-4 text-sm sm:hidden">
            <div className="flex flex-row items-start justify-between gap-3">
              <p className="body-text break-words">{name}</p>
              {statusDisplay}
            </div>

            <div className="flex flex-row items-center justify-between gap-6">
              <p className="caption-text shrink-0 break-words text-right font-mono">
                {date}
              </p>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  )
}
