import { ComponentType, ReactNode } from 'react'

import { CommandModalContextMaker } from '../command'
import { WalletProfile } from '../wallet'
import { LoadingData } from './common'
import { NavigationProps } from './Navigation'
import { PageHeaderProps } from './PageHeader'
import { RightSidebarProps } from './RightSidebar'

export interface IAppLayoutContext {
  responsiveNavigation: {
    enabled: boolean
    toggle: () => void
  }
  responsiveRightSidebar: {
    enabled: boolean
    toggle: () => void
  }
  updateProfileNft: {
    visible: boolean
    toggle: () => void
  }
  RightSidebarContent: ComponentType<{ children: ReactNode }>
  PageHeader: ComponentType<PageHeaderProps>
  setRootCommandContextMaker: (
    rootCommandContextMaker: CommandModalContextMaker
  ) => void
}

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  walletProfile?: LoadingData<WalletProfile>
  context: Omit<IAppLayoutContext, 'RightSidebarContent' | 'PageHeader'>
}
