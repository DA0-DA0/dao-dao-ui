import { ReactNode } from 'react'

export type DaoInfoBarItem = {
  label: string
  tooltip?: string
  loading?: boolean
  value: ReactNode
}

export type DaoInfoBarProps = {
  items: DaoInfoBarItem[]
  className?: string
}
