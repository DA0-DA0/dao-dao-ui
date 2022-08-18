import { ReactNode } from 'react'

export interface GovInfoListItemProps {
  icon: ReactNode
  text: string
  value?: string
  loading?: boolean
}

export const GovInfoListItem = ({
  icon,
  text,
  value,
  loading,
}: GovInfoListItemProps) => (
  <li className="flex flex-row items-center caption-text">
    <span className="flex gap-1 items-center mr-1">
      {icon} {text}:
    </span>
    <div className={loading ? 'animate-pulse bg-dark' : ''}>
      {value ?? '...'}
    </div>
  </li>
)
