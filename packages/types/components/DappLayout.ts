import { ReactNode } from 'react'

import { WalletProfileData } from '../profile'
import { DappNavigationProps } from './DappNavigation'
import { RightSidebarProps } from './RightSidebar'

export interface DappLayoutProps {
  navigationProps: DappNavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  walletProfileData?: WalletProfileData
  connect: () => void
  connected: boolean
  connectWalletButton: ReactNode
}
