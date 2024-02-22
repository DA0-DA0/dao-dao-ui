import { ComponentType, ReactNode } from 'react'

export type DaoInfoCard = {
  /**
   * Optional card icon to the left of the label.
   */
  Icon?: ComponentType<{ className?: string }>
  /**
   * The card label.
   */
  label: string
  /**
   * Optional tooltip to the right of the label.
   */
  tooltip?: string
  /**
   * Whether or not the value is loading.
   */
  loading?: boolean
  /**
   * The card value.
   */
  value: ReactNode
}

export type DaoInfoCardsProps = {
  /**
   * The cards to display.
   */
  cards: DaoInfoCard[]
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Optionally allow the card values to wrap. Defaults to `false`.
   */
  wrap?: boolean
}
