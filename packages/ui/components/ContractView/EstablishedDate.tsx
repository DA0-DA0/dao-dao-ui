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
