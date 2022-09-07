import { ReactNode } from 'react'

import { Navigation, NavigationProps } from './Navigation'
import { RightSidebar, RightSidebarProps } from './RightSidebar'

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
}

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
}: AppLayoutProps) => (
  <div className="flex flex-row items-stretch w-full h-full">
    <Navigation {...navigationProps} />

    <main className="overflow-y-auto grow pb-6 border-x border-border-base styled-scrollbar">
      {children}
    </main>

    <RightSidebar {...rightSidebarProps} />
  </div>
)
