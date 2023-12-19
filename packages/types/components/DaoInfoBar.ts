import { ComponentType, ReactNode } from 'react'

export interface DaoInfoBarItem {
  Icon: ComponentType<{ className: string }>
  label: string
  tooltip?: string
  loading?: boolean
  value: ReactNode
}

export interface DaoInfoBarProps {
  items: DaoInfoBarItem[]
  className?: string
}
