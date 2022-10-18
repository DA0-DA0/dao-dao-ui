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
  <li className="caption-text flex flex-row items-center">
    <span className="mr-1 flex items-center gap-1">
      {icon} {text}:
    </span>
    <div className={loading ? 'animate-pulse bg-dark' : ''}>
      {value ?? '...'}
    </div>
  </li>
)
