import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { SdaLayoutProps } from '@dao-dao/types'
import {
  PAGE_PADDING_BOTTOM_CLASSES,
  PAGE_PADDING_HORIZONTAL_CLASSES,
  PAGE_PADDING_TOP_CLASSES,
} from '@dao-dao/utils'

import { ErrorBoundary } from '../error/ErrorBoundary'
import { useAppContext } from './AppContext'
import { SdaNavigation } from './SdaNavigation'

export const SdaLayout = ({
  navigationProps,
  PageHeader,
  children,
}: SdaLayoutProps) => {
  const { pathname } = useRouter()
  const { responsiveNavigation, pageHeaderRef } = useAppContext()

  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  // On route change, close responsive bars and scroll to top.
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
  }, [pathname])

  return (
    <div className="relative z-[1] mx-auto flex h-full w-full max-w-7xl flex-row items-stretch overflow-hidden pt-safe">
      <ErrorBoundary>
        <SdaNavigation {...navigationProps} />
      </ErrorBoundary>

      <main
        className={clsx(
          'flex grow flex-col overflow-hidden border-l border-border-base transition-opacity',
          // After navigation bar responsive cutoff, it automatically displays.
          responsiveNavigation.enabled
            ? 'opacity-30 md:opacity-100'
            : 'opacity-100'
        )}
      >
        <div className="shrink-0 px-6" ref={pageHeaderRef}>
          <PageHeader />
        </div>

        <div
          className={clsx(
            'no-scrollbar relative grow overflow-y-auto',
            PAGE_PADDING_TOP_CLASSES,
            PAGE_PADDING_BOTTOM_CLASSES,
            PAGE_PADDING_HORIZONTAL_CLASSES
          )}
          ref={scrollableContainerRef}
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  )
}
