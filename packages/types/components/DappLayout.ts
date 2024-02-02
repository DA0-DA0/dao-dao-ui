import { ReactNode } from 'react'

import { DappNavigationProps } from './DappNavigation'
import { RightSidebarProps } from './RightSidebar'

export interface DappLayoutProps {
  navigationProps: DappNavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
}
