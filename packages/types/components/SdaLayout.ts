import { ReactNode } from 'react'

import { RightSidebarProps } from './RightSidebar'
import { SdaNavigationProps } from './SdaNavigation'

export interface SdaLayoutProps {
  navigationProps: SdaNavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
}
