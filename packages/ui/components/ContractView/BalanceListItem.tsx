import { ReactNode } from 'react'

export interface BalanceListItemProps {
  children: ReactNode
}

export const BalanceListItem = ({ children }: BalanceListItemProps) => (
  <li className="flex overflow-auto flex-row gap-2 items-center whitespace-nowrap caption-text">
    {children}
  </li>
)
