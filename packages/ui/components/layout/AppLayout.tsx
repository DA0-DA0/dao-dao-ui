import { ReactNode, useMemo } from 'react'

import { Navigation, NavigationProps } from './Navigation'
import { ResponsiveNavigationContext } from './ResponsiveNavigationContext'
import { RightSidebar, RightSidebarProps } from './RightSidebar'

export interface AppLayoutProps {
  navigationProps: NavigationProps
  children: ReactNode
  rightSidebarProps: RightSidebarProps
  responsiveNavigationEnabled: boolean
  toggleResponsiveNavigation: () => void
}

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  responsiveNavigationEnabled,
  toggleResponsiveNavigation,
}: AppLayoutProps) => (
  <ResponsiveNavigationContext.Provider
    value={useMemo(
      () => ({
        enabled: responsiveNavigationEnabled,
        toggle: toggleResponsiveNavigation,
      }),
      [responsiveNavigationEnabled, toggleResponsiveNavigation]
    )}
  >
    <div className="flex overflow-hidden relative flex-row items-stretch w-full h-full">
      <Navigation {...navigationProps} />

      <main className="overflow-y-auto grow pb-6 border-x border-border-base styled-scrollbar">
        {children}
      </main>

      <RightSidebar {...rightSidebarProps} />
    </div>
  </ResponsiveNavigationContext.Provider>
)
