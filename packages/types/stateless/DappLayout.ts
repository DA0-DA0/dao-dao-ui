import { ReactNode } from 'react'

import { WalletProfile } from '../profile'
import { IAppLayoutContext } from './AppLayoutContext'
import { LoadingData } from './common'
import { DappNavigationProps } from './DappNavigation'
import { RightSidebarProps } from './RightSidebar'

export interface DappLayoutProps {
  navigationProps: DappNavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  walletProfile?: LoadingData<WalletProfile>
  context: Omit<IAppLayoutContext, 'RightSidebarContent' | 'PageHeader'>
  connect: () => void
  connected: boolean
  connectWalletButton: ReactNode
}
