import { ReactNode } from 'react'

export type DaoInfoCard = {
  label: string
  tooltip?: string
  loading?: boolean
  value: ReactNode
}

export type DaoInfoCardsProps = {
  cards: DaoInfoCard[]
  className?: string
}
