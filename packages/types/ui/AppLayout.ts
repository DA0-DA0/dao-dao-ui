import { ComponentType, ReactNode } from 'react'

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
}

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  profileImageUrl?: string
  context: Omit<IAppLayoutContext, 'RightSidebarContent'>
}
