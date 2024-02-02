import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { DappLayoutProps } from '@dao-dao/types/components/DappLayout'

import { useDaoNavHelpers } from '../../hooks/useDaoNavHelpers'
import { ErrorBoundary } from '../error/ErrorBoundary'
import { useAppContext } from './AppContext'
import { DappNavigation } from './DappNavigation'

export * from '@dao-dao/types/components/DappLayout'

export const DappLayout = ({ navigationProps, children }: DappLayoutProps) => {
  const { router, getDaoPath, getDaoFromPath } = useDaoNavHelpers()
  const { responsiveNavigation, setPageHeaderRef } = useAppContext()

  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  // On DAO or non-DAO route change, close responsive bars and scroll to top.
  // When staying on the same DAO page, likely switching between tabs, so no
  // need to reset scroll to the top.
  const scrollPathDelta = router.asPath.startsWith(getDaoPath(''))
    ? getDaoFromPath()
    : router.asPath
  useEffect(() => {
    responsiveNavigation.enabled && responsiveNavigation.toggle()

    // When on a page, and navigating to another page with a Link, we need to
    // make sure the scrollable container moves to the top since we may be
    // scrolled lower on the page. Next.js automatically does this for the html
    // tag, but we have a nested scrollable container, so we have to do this
    // manually.
    scrollableContainerRef.current?.scrollTo({
      top: 0,
    })

    // Only toggle on route change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPathDelta])

  return (
    <div className="relative z-[1] flex h-full w-full flex-row items-stretch overflow-hidden pt-safe">
      <ErrorBoundary>
        <DappNavigation {...navigationProps} />
      </ErrorBoundary>

      <main
        className={clsx(
          'flex grow flex-col overflow-hidden border-x border-border-base transition-opacity',
          // After navigation bar responsive cutoff, it automatically displays.
          responsiveNavigation.enabled
            ? 'opacity-30 md:opacity-100'
            : 'opacity-100'
        )}
      >
        <div className="shrink-0 px-6" ref={setPageHeaderRef}></div>

        {/* Make horizontal padding 1 unit more than page header so that the body is not touching the sides of the page header's bottom border when it scrolls. */}
        <div
          className="no-scrollbar relative grow overflow-y-auto px-7 pt-10 pb-8"
          // PageHeader uses this ID to obtain this element and track its
          // scroll position so that it can move the top gradient accordingly
          // to match the underlying gradient on the page.
          id="main-content-scrollable"
          ref={scrollableContainerRef}
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  )
}
