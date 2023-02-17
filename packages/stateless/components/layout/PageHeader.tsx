import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { PageHeaderProps } from '@dao-dao/types/stateless/PageHeader'

import { IconButton } from '../icon_buttons'
import { TopGradient } from '../TopGradient'
import { useAppContext, useAppContextIfAvailable } from './AppContext'
import { Breadcrumbs } from './Breadcrumbs'

export const PAGE_HEADER_HEIGHT_CLASS_NAMES = 'h-20'

// Title and breadcrumbs are mutually exclusive. Title takes precedence.
export const PageHeader = ({
  title,
  breadcrumbs,
  className,
  noBorder = false,
  forceCenter = false,
  centerNode,
  rightNode,
  gradient,
}: PageHeaderProps) => {
  const { toggle } = useAppContext().responsiveNavigation

  // Intelligently move gradient to match scroll of page.
  const [scrollableScrollTop, setScrollableScrollTop] = useState(0)
  useEffect(() => {
    if (typeof document === 'undefined' || !gradient) {
      return
    }

    const gradientScrollElement = document.getElementById(
      'main-content-scrollable'
    )
    if (!gradientScrollElement) {
      return
    }

    // Prevent gradient from moving down on the page, happens during mobile
    // browser scroll bounce. Only allow negative offsets to hide gradient
    // upward as page is scrolled down.
    const onScroll = () =>
      setScrollableScrollTop(Math.max(gradientScrollElement.scrollTop, 0))

    // Initialize with correct value.
    onScroll()

    gradientScrollElement.addEventListener('scroll', onScroll)
    return () => gradientScrollElement.removeEventListener('scroll', onScroll)
  }, [gradient])

  return (
    <div className="relative">
      {gradient && (
        <TopGradient
          style={{
            top: -scrollableScrollTop,
          }}
        />
      )}

      <div
        className={clsx('relative', PAGE_HEADER_HEIGHT_CLASS_NAMES, className)}
      >
        <div
          className={clsx(
            'relative flex h-full w-full flex-row items-center justify-center',
            !forceCenter && 'sm:justify-start',
            // When showing title or breadcrumbs, add padding. The `sm`
            // breakpoint is when the UI switches from responsive to desktop
            // mode.
            (title || breadcrumbs) && [
              'px-12',
              // Centered on small screen or if forceCenter is true. If not
              // centered, no left padding.
              !forceCenter && 'sm:pl-0',
            ]
          )}
        >
          {title ? (
            <p className="header-text truncate leading-[5rem]">{title}</p>
          ) : breadcrumbs ? (
            <Breadcrumbs {...breadcrumbs} />
          ) : (
            centerNode
          )}
        </div>

        {/* Place left and right components here below the center component so they take higher touch precedence over the Breadcrumbs container. */}
        <div className="absolute top-0 bottom-0 -left-2 flex flex-col justify-center">
          <IconButton
            Icon={Menu}
            className="!outline-none sm:hidden"
            onClick={toggle}
            variant="ghost"
          />
        </div>

        <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-center">
          {rightNode}
        </div>

        {/* Use div for border so we can set absolute positioning and padding. */}
        {!noBorder && (
          <div className="absolute right-0 bottom-0 left-0 h-[1px] bg-border-secondary"></div>
        )}
      </div>
    </div>
  )
}

// This is a portal that inserts a PageHeader wherever the AppContext's
// `pageHeaderRef` is placed. This is handled by the layout components. See the
// `ReactSidebarContent` comment in `RightSidebar.tsx` for more information on
// how this works.
//
// If not in an AppContext, this component will render a PageHeader normally
// instead of using the portal.
export const PageHeaderContent = (props: PageHeaderProps) => {
  const container = useAppContextIfAvailable()?.pageHeaderRef
  return container?.current ? (
    createPortal(<PageHeader {...props} />, container.current)
  ) : (
    <PageHeader {...props} />
  )
}
