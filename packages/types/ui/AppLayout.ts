import { ComponentType, ReactNode } from 'react'

import { NavigationProps } from './Navigation'
import { RightSidebarProps } from './RightSidebar'

export interface IAppLayoutContext {
  responsiveNavigation: {
    enabled: boolean
    toggle: () => void
  }
  daoCreation: {
    pageIndex: number
    setPageIndex: (pageIndex: number) => void
  }
  RightSidebarContent: ComponentType<{ children: ReactNode }>
}

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: Omit<RightSidebarProps, 'setContentRef'>
  context: Omit<IAppLayoutContext, 'RightSidebarContent'>
}
