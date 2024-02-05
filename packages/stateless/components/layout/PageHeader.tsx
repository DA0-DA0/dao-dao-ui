import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { PageHeaderProps } from '@dao-dao/types/components/PageHeader'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import { IconButton } from '../icon_buttons'
import { TopGradient } from '../TopGradient'
import { useAppContextIfAvailable } from './AppContext'
import { Breadcrumbs } from './Breadcrumbs'

// Title and breadcrumbs are mutually exclusive. Title takes precedence.
export const PageHeader = ({
  title,
  breadcrumbs,
  className,
  noBorder = false,
  forceCenter = false,
  leftMobileNode,
  centerNode,
  rightNode,
  gradient,
  forceExpandBorderToEdge = false,
  titleClassName,
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
    <div
      className={clsx(
        'relative',
        // Undo container horizontal padding so border stretches to the edge on
        // small screens.
        UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
        // On large screens, don't undo container padding so there's a small gap
        // (unless force expand is on).
        !forceExpandBorderToEdge && 'md:mx-0'
      )}
    >
      {gradient && (
        <TopGradient
          style={{
            top: -scrollableScrollTop,
          }}
        />
      )}

      <div
        className={clsx(
          // Add padding to title content on small screens since the container
          // padding is undone above in the container.
          'relative h-14 px-4 sm:h-16 md:h-[4.5rem]',
          // On large screens, no need to add padding since the normal page
          // padding is in effect (unless force expand is on).
          !forceExpandBorderToEdge && 'md:px-0',
          // Add bottom border.
          !noBorder && 'border-b border-border-secondary',
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
              'px-8',
              !forceExpandBorderToEdge && 'md:px-12',
              // Centered on small screen or if forceCenter is true. If not
              // centered, no left padding.
              !forceCenter && 'md:pl-0',
            ]
          )}
        >
          {!!title && (
            <p
              className={clsx(
                'header-text truncate text-lg leading-[5rem] sm:text-xl',
                titleClassName
              )}
            >
              {title}
            </p>
          )}

          {!!breadcrumbs && <Breadcrumbs {...breadcrumbs} />}

          {centerNode}
        </div>

        {/* Place left and right components here below the center component so they take higher touch precedence over the Breadcrumbs container. */}
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-2 flex flex-row items-center justify-start gap-1 md:hidden',
            !forceExpandBorderToEdge && 'md:-left-2'
          )}
        >
          <IconButton
            Icon={Menu}
            className="!outline-none"
            onClick={toggle}
            variant="ghost"
          />

          {leftMobileNode}
        </div>

        <div
          className={clsx(
            // Match container padding since this is absolutely positioned.
            'absolute top-0 bottom-0 right-4 flex flex-row items-stretch justify-end',
            !forceExpandBorderToEdge && 'md:right-0'
          )}
        >
          {rightNode}
        </div>
      </div>
    </div>
  )
}
