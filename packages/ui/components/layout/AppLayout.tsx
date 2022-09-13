import { AppLayoutProps } from '@dao-dao/tstypes/ui/AppLayout'

import { AppLayoutContext } from './AppLayoutContext'
import { Navigation } from './Navigation'
import { RightSidebar } from './RightSidebar'

export * from '@dao-dao/tstypes/ui/AppLayout'

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  context,
}: AppLayoutProps) => (
  <AppLayoutContext.Provider value={context}>
    <div className="flex overflow-hidden relative flex-row items-stretch w-full h-full">
      <Navigation {...navigationProps} />

      <main className="overflow-y-auto grow pb-6 border-x border-border-base styled-scrollbar">
        {children}
      </main>

      <RightSidebar {...rightSidebarProps} />
    </div>
  </AppLayoutContext.Provider>
)
