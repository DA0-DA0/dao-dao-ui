import { FC, ReactNode } from 'react'

export interface BalanceListItemProps {
  children: ReactNode
}

export const BalanceListItem: FC<BalanceListItemProps> = ({ children }) => (
  <li className="flex overflow-auto flex-row gap-2 items-center whitespace-nowrap caption-text">
    {children}
  </li>
)
