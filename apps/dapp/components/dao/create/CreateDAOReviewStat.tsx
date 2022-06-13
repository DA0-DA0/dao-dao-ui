import { FC } from 'react'

interface CreateDAOReviewStatProps {
  title: string
  value: string
}

export const CreateDAOReviewStat: FC<CreateDAOReviewStatProps> = ({
  value,
  title,
}) => (
  <div className="flex flex-col gap-1 items-center">
    <span className="font-mono caption-text">{title}</span>
    <span className="primary-text">{value}</span>
  </div>
)
