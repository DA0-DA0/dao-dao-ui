import { FC, ReactNode } from 'react'

export interface BalanceListItemProps {
  children: ReactNode
}

export const BalanceListItem: FC<BalanceListItemProps> = ({ children }) => (
  <li className="caption-text flex flex-row items-center gap-2 overflow-auto whitespace-nowrap">
    {children}
  </li>
)
