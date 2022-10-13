import { useTranslation } from 'react-i18next'
import { Formatter } from 'react-timeago'

export const useTranslatedTimeDeltaFormatter = (): Formatter => {
  const { t } = useTranslation()

  const timeDeltaFormatter: Formatter = (value, unit, suffix) =>
    t(suffix === 'ago' ? 'info.timeAgo' : 'info.timeLeft', {
      value,
      unit: t(`unit.${unit}s`, { count: value }).toLocaleLowerCase(),
    })

  return timeDeltaFormatter
}
