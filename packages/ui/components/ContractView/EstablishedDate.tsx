import { FC } from 'react'

export interface EstablishedDateProps {
  date: Date
}

export const EstablishedDate: FC<EstablishedDateProps> = ({ date }) => {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return <p className="mb-3 text-sm">Est. {formattedDate}</p>
}

export const EstablishedDateLoader: FC<{}> = () => (
  <p className="invisible mb-3 text-sm">
    <span className="inline bg-dark rounded-sm animate-pulse">
      Est. 12 May 2022
    </span>
  </p>
)
