import { FC, ReactNode } from 'react'

export interface GovInfoListItemProps {
  icon: ReactNode
  text: string
  value: string
}

export const GovInfoListItem: FC<GovInfoListItemProps> = ({
  icon,
  text,
  value,
}) => (
  <li className="flex flex-row items-center caption-text">
    <span className="inline flex gap-1 items-center mr-1">
      {icon} {text}:
    </span>
    {value}
  </li>
)
