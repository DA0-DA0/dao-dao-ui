import { ComponentType, ReactNode } from 'react'

import { PageHeaderProps } from '@dao-dao/ui'

import { NavigationProps } from './Navigation'
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
  RightSidebarContent: ComponentType<{ children: ReactNode }>
  PageHeader: ComponentType<PageHeaderProps>
}

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  profileImageUrl?: string
  context: Omit<IAppLayoutContext, 'RightSidebarContent' | 'PageHeader'>
}
