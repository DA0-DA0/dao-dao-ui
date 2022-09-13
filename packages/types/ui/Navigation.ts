import { DaoDropdownInfo } from './DaoDropdown'

export interface TokenPrice {
  label: string
  price: number
  priceDenom: string
  change: number
}

export interface NavigationProps {
  setCommandModalVisible: () => void
  inboxCount: number
  version: string
  tokenPrices: TokenPrice[]
  pinnedDaos: DaoDropdownInfo[]
  hideInbox?: boolean
  compact: boolean
  setCompact: (compact: boolean) => void
}
