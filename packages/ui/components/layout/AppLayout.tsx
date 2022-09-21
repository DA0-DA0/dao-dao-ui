import clsx from 'clsx'
import { useCallback, useState } from 'react'

import { RightSidebarProps } from '@dao-dao/tstypes'
import { AppLayoutProps } from '@dao-dao/tstypes/ui/AppLayout'

import { ProfileImage } from '../profile/ProfileImage'
import { AppLayoutContext } from './AppLayoutContext'
import { Navigation } from './Navigation'
import { RightSidebar, makeRightSidebarContent } from './RightSidebar'

export * from '@dao-dao/tstypes/ui/AppLayout'

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  profileImageUrl,
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

        <main
          className={clsx(
            'overflow-y-auto grow pb-6 border-x border-border-base transition-opacity styled-scrollbar',
            // Navigation bar can be responsive up to sm size. After that, it
            // automatically displays.
            context.responsiveNavigation.enabled
              ? 'opacity-30 sm:opacity-100'
              : // Right sidebar can be responsive up to xl size. After that, it automatically displays.
              context.responsiveRightSidebar.enabled
              ? 'opacity-30 xl:opacity-100'
              : 'opacity-100'
          )}
        >
          <div
            className="absolute right-4 bottom-4 z-10 bg-background-base rounded-full shadow-dp8 cursor-pointer sm:right-6 sm:bottom-6 xl:hidden"
            onClick={context.responsiveRightSidebar.toggle}
          >
            <ProfileImage
              className="bg-background-primary hover:bg-background-interactive-hover active:bg-background-interactive-pressed transition"
              fallbackIconClassName="!text-icon-primary !w-3/5 !h-3/5"
              imageUrl={profileImageUrl}
              size="xs"
            />
          </div>

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
