import { ReactNode } from 'react'

import { WalletProfile } from '../profile'
import { LoadingData } from './common'
import { RightSidebarProps } from './RightSidebar'
import { SdaNavigationProps } from './SdaNavigation'

export interface SdaLayoutProps {
  navigationProps: SdaNavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  walletProfile?: LoadingData<WalletProfile>
  connect: () => void
  connected: boolean
  connectWalletButton: ReactNode
}
