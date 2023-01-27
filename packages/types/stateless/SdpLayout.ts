import { ReactNode } from 'react'

import { WalletProfile } from '../profile'
import { IAppLayoutContext } from './AppLayoutContext'
import { LoadingData } from './common'
import { RightSidebarProps } from './RightSidebar'
import { SdpNavigationProps } from './SdpNavigation'

export interface SdpLayoutProps {
  navigationProps: SdpNavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  walletProfile?: LoadingData<WalletProfile>
  context: Omit<IAppLayoutContext, 'RightSidebarContent' | 'PageHeader'>
  connect: () => void
  connected: boolean
  connectWalletButton: ReactNode
}
