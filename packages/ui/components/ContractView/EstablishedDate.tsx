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
  <p className="mb-3 text-sm invisible">
    <span className="inline animate-pulse bg-dark rounded-sm">
      Est. 12 May 2022
    </span>
  </p>
)
