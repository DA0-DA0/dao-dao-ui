import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { PageHeaderProps } from '@dao-dao/types/components/PageHeader'

import { Breadcrumbs } from '../Breadcrumbs'
import { IconButton } from '../icon_buttons'
import { TopGradient } from '../TopGradient'
import { useAppLayoutContext } from './AppLayoutContext'

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
  const { toggle } = useAppLayoutContext().responsiveNavigation

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
            // mode, and on DAO pages, this is when the pin toggle displays its
            // text instead of just its icon. On these larger views, add more
            // padding to compensate.
            (title || breadcrumbs) && {
              'px-16 sm:px-28': true,
              // Centered on small screen or if forceCenter is true. If not
              // centered, no left padding.
              'sm:!pl-0': !forceCenter,
            }
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
          <div className="bg-border-secondary absolute right-0 bottom-0 left-0 h-[1px]"></div>
        )}
      </div>
    </div>
  )
}

// This is a function that generates a function component, used in pages to
// render the page header. See the `makeRightSidebarContent` function comment in
// `RightSidebar.tsx` for more information on how this works.
export const makePageHeader = (container: HTMLDivElement | null) =>
  function PageHeaderPortal(props: PageHeaderProps) {
    return container ? createPortal(<PageHeader {...props} />, container) : null
  }
