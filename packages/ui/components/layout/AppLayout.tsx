import { useCallback, useState } from 'react'

import { RightSidebarProps } from '@dao-dao/tstypes'
import { AppLayoutProps } from '@dao-dao/tstypes/ui/AppLayout'

import { AppLayoutContext } from './AppLayoutContext'
import { Navigation } from './Navigation'
import { RightSidebar, makeRightSidebarContent } from './RightSidebar'

export * from '@dao-dao/tstypes/ui/AppLayout'

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  context,
}: AppLayoutProps) => {
  // See comment on makeRightSidebarContent in RightSidebar.tsx for information
  // on what this is and how it works and why it exists.
  // Use state setting function since we want to return a function
  // (component).
  const [RightSidebarContent, setRightSidebarContent] = useState(() =>
    makeRightSidebarContent(null)
  )
  const setRightSidebarContentRef: RightSidebarProps['setContentRef'] =
    useCallback(
      (ref) =>
        // Use state setting function since we want to return a function
        // (component).
        setRightSidebarContent(() => makeRightSidebarContent(ref)),
      []
    )

  return (
    <AppLayoutContext.Provider
      value={{
        ...context,
        // Include the right sidebar portal renderer in the context to be
        // accessed by pages.
        RightSidebarContent,
      }}
    >
      <div className="flex overflow-hidden relative flex-row items-stretch w-full h-full">
        <Navigation {...navigationProps} />

        <main className="overflow-y-auto grow pb-6 border-x border-border-base styled-scrollbar">
          {children}
        </main>

        <RightSidebar
          {...rightSidebarProps}
          setContentRef={setRightSidebarContentRef}
        />
      </div>
    </AppLayoutContext.Provider>
  )
}
