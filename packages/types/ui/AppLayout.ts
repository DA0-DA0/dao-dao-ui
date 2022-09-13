import { ReactNode } from 'react'

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
}

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  context: IAppLayoutContext
}
