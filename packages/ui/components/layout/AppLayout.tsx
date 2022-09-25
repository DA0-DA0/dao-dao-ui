import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { RightSidebarProps } from '@dao-dao/tstypes'
import { AppLayoutProps } from '@dao-dao/tstypes/ui/AppLayout'

import { ErrorBoundary } from '../ErrorBoundary'
import { ProfileImage } from '../profile/ProfileImage'
import { AppLayoutContext } from './AppLayoutContext'
import { Navigation } from './Navigation'
import { makePageHeader } from './PageHeader'
import { RightSidebar, makeRightSidebarContent } from './RightSidebar'

export * from '@dao-dao/tstypes/ui/AppLayout'

export const AppLayout = ({
  navigationProps,
  children,
  rightSidebarProps,
  profileImageUrl,
  context,
}: AppLayoutProps) => {
  const router = useRouter()
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

  const [PageHeader, setPageHeader] = useState(() => makePageHeader(null))
  const setPageHeaderRef = useCallback(
    (ref: HTMLDivElement | null) =>
      // Use state setting function since we want to return a function
      // (component).
      setPageHeader(() => makePageHeader(ref)),
    []
  )

  // On route change, close responsive bars.
  useEffect(() => {
    context.responsiveNavigation.enabled &&
      context.responsiveNavigation.toggle()
    context.responsiveRightSidebar.enabled &&
      context.responsiveRightSidebar.toggle()

    // Only toggle on route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <AppLayoutContext.Provider
      value={{
        ...context,
        // Include the right sidebar and page header portal renderers in the
        // context to be accessed by pages.
        RightSidebarContent,
        PageHeader,
      }}
    >
      <div className="flex overflow-hidden relative z-[1] flex-row items-stretch w-full h-full">
        <ErrorBoundary>
          <Navigation {...navigationProps} />
        </ErrorBoundary>

        <main
          className={clsx(
            'flex overflow-hidden flex-col grow border-x border-border-base transition-opacity',
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
            className="fixed right-4 bottom-4 z-10 bg-background-base rounded-full shadow-dp8 cursor-pointer sm:right-6 sm:bottom-6 xl:hidden"
            onClick={context.responsiveRightSidebar.toggle}
          >
            <ProfileImage
              className="bg-background-primary hover:bg-background-interactive-hover active:bg-background-interactive-pressed transition"
              fallbackIconClassName="!text-icon-primary !w-3/5 !h-3/5"
              imageUrl={profileImageUrl}
              size="xs"
            />
          </div>

          <div className="shrink-0 px-6" ref={setPageHeaderRef}></div>

          {/* Make horizontal padding 1 unit more than page header so that the body is not touching the sides of the page header's bottom border when it scrolls. */}
          <div
            className="overflow-y-auto relative grow px-7 pt-10 pb-6 no-scrollbar"
            // PageHeader uses this ID to obtain this element and track its
            // scroll position so that it can move the top gradient accordingly
            // to match the underlying gradient on the page.
            id="main-content-scrollable"
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </main>

        <ErrorBoundary>
          <RightSidebar
            {...rightSidebarProps}
            setContentRef={setRightSidebarContentRef}
          />
        </ErrorBoundary>
      </div>
    </AppLayoutContext.Provider>
  )
}
