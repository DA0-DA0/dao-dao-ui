import { useTranslation } from 'react-i18next'
import { Formatter } from 'react-timeago'

export interface UseTranslatedTimeDeltaFormatterOptions {
  suffix: boolean
}

export const useTranslatedTimeDeltaFormatter = ({
  suffix: showSuffix,
}: UseTranslatedTimeDeltaFormatterOptions): Formatter => {
  const { t } = useTranslation()

  const timeDeltaFormatter: Formatter = (value, unit, suffix) =>
    t(
      showSuffix
        ? suffix === 'ago'
          ? 'format.timeAgo'
          : 'format.timeLeft'
        : 'format.time',
      {
        value,
        unit: t(`unit.${unit}s`, { count: value }).toLocaleLowerCase(),
      }
    )

  return timeDeltaFormatter
}
