import { FC } from 'react'

export interface EstablishedDateProps {
  date: Date
}

// TODO use i18n for formatting
export const EstablishedDate: FC<EstablishedDateProps> = ({ date }) => {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return <p className="mb-3 text-sm">Est. {formattedDate}</p>
}

// Note that this is invisible; this date is not rendered. It just takes up the
// right amount of space.
export const EstablishedDateLoader: FC<{}> = () => (
  <p className="invisible mb-3 text-sm">
    <span className="inline bg-dark rounded-sm animate-pulse">
      Est. XX Xxx XXXX
    </span>
  </p>
)
