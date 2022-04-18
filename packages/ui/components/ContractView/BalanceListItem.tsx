import { FC, ReactNode } from 'react'

export interface BalanceListItemProps {
  children: ReactNode
}

export const BalanceListItem: FC<BalanceListItemProps> = ({ children }) => (
  <li className="flex flex-row flex-wrap gap-2 items-center caption-text">
    {children}
  </li>
)
