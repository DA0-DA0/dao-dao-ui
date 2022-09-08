import { ReactNode } from 'react'

import { Navigation, NavigationProps } from './Navigation'
import { RightSidebar, RightSidebarProps } from './RightSidebar'
import { ToggleResponsiveNavigationContext } from './ToggleResponsiveNavigationContext'

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  toggleResponsiveNavigation: () => void
}

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  toggleResponsiveNavigation,
}: AppLayoutProps) => (
  <ToggleResponsiveNavigationContext.Provider
    value={toggleResponsiveNavigation}
  >
    <div className="flex overflow-hidden relative flex-row items-stretch w-full h-full">
      <Navigation {...navigationProps} />

      <main className="overflow-y-auto grow pb-6 border-x border-border-base styled-scrollbar">
        {children}
      </main>

      <RightSidebar {...rightSidebarProps} />
    </div>
  </ToggleResponsiveNavigationContext.Provider>
)
