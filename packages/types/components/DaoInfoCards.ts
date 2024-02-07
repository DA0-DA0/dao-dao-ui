import { ComponentType, ReactNode } from 'react'

export type DaoInfoCard = {
  Icon?: ComponentType<{ className?: string }>
  label: string
  tooltip?: string
  loading?: boolean
  value: ReactNode
}

export type DaoInfoCardsProps = {
  cards: DaoInfoCard[]
  className?: string
}
