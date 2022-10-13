import { useTranslation } from 'react-i18next'

export interface EstablishedDateProps {
  date: Date
}

export const EstablishedDate = ({ date }: EstablishedDateProps) => {
  const { t } = useTranslation()
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <p className="mb-3 text-sm">
      {t('info.establishedAbbr')} {formattedDate}
    </p>
  )
}

// Note that this is invisible; this date is not rendered. It just takes up the
// right amount of space.
export const EstablishedDateLoader = () => (
  <p className="invisible mb-3 text-sm">
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <span className="inline animate-pulse rounded-sm bg-dark">
      Est. XX Xxx XXXX
    </span>
  </p>
)
