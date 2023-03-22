import { useTranslation } from 'react-i18next'
import { Formatter } from 'react-timeago'

export interface UseTranslatedTimeDeltaFormatterOptions {
  // Whether or not to show words around the time delta. If false, the time is
  // just rendered as the value (e.g. 1 day). If true, the time would be
  // rendered as "1 day ago", "1 day left", or "in 1 day".
  words: boolean
  // If date is in the future, use either "left" suffix or "in" prefix.
  futureMode?: 'left' | 'in'
}

export const useTranslatedTimeDeltaFormatter = ({
  words,
  futureMode = 'left',
}: UseTranslatedTimeDeltaFormatterOptions): Formatter => {
  const { t } = useTranslation()

  const timeDeltaFormatter: Formatter = (value, unit, suffix) =>
    t(
      words
        ? suffix === 'ago'
          ? 'format.timeAgo'
          : futureMode === 'left'
          ? 'format.timeLeft'
          : 'format.inTime'
        : 'format.time',
      {
        value,
        unit: t(`unit.${unit}s`, { count: value }).toLocaleLowerCase(),
      }
    )

  return timeDeltaFormatter
}
