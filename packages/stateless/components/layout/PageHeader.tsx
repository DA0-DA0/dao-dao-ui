import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { PageHeaderProps } from '@dao-dao/types/components/PageHeader'

import { IconButton } from '../icon_buttons'
import { TopGradient } from '../TopGradient'
import { useAppContextIfAvailable } from './AppContext'
import { Breadcrumbs } from './Breadcrumbs'

export const PAGE_HEADER_HEIGHT_CLASS_NAMES = 'h-16 lg:h-[4.5rem]'

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
  expandBorderToEdge = false,
}: PageHeaderProps) => {
  const toggle = useAppContextIfAvailable()?.responsiveNavigation.toggle

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
    <div className={clsx('relative', expandBorderToEdge && '-mx-6')}>
      {gradient && (
        <TopGradient
          style={{
            top: -scrollableScrollTop,
          }}
        />
      )}

      <div
        className={clsx(
          'relative',
          expandBorderToEdge && 'px-4',
          PAGE_HEADER_HEIGHT_CLASS_NAMES,
          className
        )}
      >
        <div
          className={clsx(
            'relative flex h-full w-full flex-row items-center justify-center',
            !forceCenter && 'md:justify-start',
            // When showing title or breadcrumbs, add padding. The `sm`
            // breakpoint is when the UI switches from responsive to desktop
            // mode.
            (title || breadcrumbs) && [
              expandBorderToEdge ? 'px-8' : 'px-12',
              // Centered on small screen or if forceCenter is true. If not
              // centered, no left padding.
              !forceCenter && 'md:pl-0',
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
        <div
          className={clsx(
            'absolute top-0 bottom-0 flex flex-col justify-center',
            expandBorderToEdge ? 'left-2' : '-left-2'
          )}
        >
          <IconButton
            Icon={Menu}
            className="!outline-none md:hidden"
            onClick={toggle}
            variant="ghost"
          />
        </div>

        <div
          className={clsx(
            'absolute top-0 bottom-0 flex flex-row items-stretch justify-end',
            // Match `px-4` on the container.
            expandBorderToEdge ? 'right-4' : 'right-0'
          )}
        >
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
