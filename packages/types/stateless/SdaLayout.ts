import { ReactNode } from 'react'

import { WalletProfileData } from '../profile'
import { RightSidebarProps } from './RightSidebar'
import { SdaNavigationProps } from './SdaNavigation'

export interface SdaLayoutProps {
  navigationProps: SdaNavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  walletProfileData?: WalletProfileData
  connect: () => void
  connected: boolean
  connectWalletButton: ReactNode
}
