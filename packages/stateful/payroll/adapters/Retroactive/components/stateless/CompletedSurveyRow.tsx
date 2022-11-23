import { useTranslation } from 'react-i18next'

import { formatDate } from '@dao-dao/utils'

import { CompletedSurvey } from '../../types'

export interface CompletedSurveyRowProps {
  survey: CompletedSurvey
  onClick: () => void
}

export const CompletedSurveyRow = ({
  survey: { name, contributionCount, openedAt },
  onClick,
}: CompletedSurveyRowProps) => {
  const { t } = useTranslation()
  const openedAtEpoch = Date.parse(openedAt)

  return (
    <div className="cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed">
      {/* Desktop */}
      <div
        className="hidden h-12 flex-row items-center gap-6 p-3 sm:flex"
        onClick={onClick}
      >
        <p className="body-text grow truncate">{name}</p>

        <p className="text-right">
          {t('info.numContributors', { count: contributionCount })}
        </p>
        {!isNaN(openedAtEpoch) && (
          <p className="caption-text shrink-0 break-words text-right font-mono">
            {formatDate(new Date(openedAt))}
          </p>
        )}
      </div>

      {/* Mobile */}
      <div className="flex flex-col justify-between gap-2 rounded-md p-4 text-sm sm:hidden">
        <p className="body-text break-words">{name}</p>

        <div className="flex flex-row items-center justify-between gap-6">
          {!isNaN(openedAtEpoch) && (
            <p className="legend-text shrink-0 break-words font-mono">
              {formatDate(new Date(openedAt))}
            </p>
          )}

          <p className="caption-text grow text-right">
            {t('info.numContributors', { count: contributionCount })}
          </p>
        </div>
      </div>
    </div>
  )
}
