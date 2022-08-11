import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface EstablishedDateProps {
  date: Date
}

export const EstablishedDate: FC<EstablishedDateProps> = ({ date }) => {
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
export const EstablishedDateLoader: FC = () => (
  <p className="invisible mb-3 text-sm">
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <span className="inline bg-dark rounded-sm animate-pulse">
      Est. XX Xxx XXXX
    </span>
  </p>
)
