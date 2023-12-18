import { ReactNode } from 'react'

import { Account } from '../account'

export type TreasuryHistoryGraphProps = {
  // Base account.
  chainId: string
  address: string
  // If defined, only show history for this account.
  account?: Account
  // If account above is a valence account, and `showRebalancer` is true, only
  // show rebalanced tokens with their associated targets.
  showRebalancer?: boolean
  // Applied to container.
  className?: string
  // Applied to graph container.
  graphClassName?: string
  // If defined, will be called when tokens are loaded with their associated
  // colors in the graph. Maps serialized token source to color.
  registerTokenColors?: (tokenSourceColorMap: Record<string, string>) => void
  // If defined, will be inserted at the top.
  header?: ReactNode
}
