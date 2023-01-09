import {
  Add,
  HomeOutlined,
  InboxOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  PushPinOutlined,
  Search,
} from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NavigationProps } from '@dao-dao/types/stateless/Navigation'
import { usePlatform } from '@dao-dao/utils'

import { DaoDropdown } from '../dao'
import { IconButton, ThemeToggle } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { Logo } from '../logo/Logo'
import { PricePercentChange } from '../token/PricePercentChange'
import { Tooltip } from '../tooltip/Tooltip'
import { useAppLayoutContext } from './AppLayoutContext'
import { PageHeader } from './PageHeader'
import { Row } from './Row'

export * from '@dao-dao/types/stateless/Navigation'

// Width of `lg` tailwind selector. Don't change this without changing the
// compact button media query class that shows the compact toggle at the very
// bottom, so the user can toggle between compact and not compact mode when it
// is not forced.
const FORCE_COMPACT_NAVIGATION_AT_WIDTH = 1024
// Width of `sm` tailwind selector. Don't change this without changing all of
// the `sm:` tailwind class media queries since they are set based on when it is
// in responsive mobile mode.
const FORCE_MOBILE_NAVIGATION_AT_WIDTH = 640

// Force off when in responsive mobile mode since it displays full width when
// open and we can show all details. Force on when larger than mobile but still
// not very wide since it takes up a lot of space.
const getForceCompact = () =>
  window.innerWidth < FORCE_MOBILE_NAVIGATION_AT_WIDTH
    ? false
    : window.innerWidth < FORCE_COMPACT_NAVIGATION_AT_WIDTH
    ? true
    : undefined

export const Navigation = ({
  setCommandModalVisible,
  inboxCount,
  version,
  tokenPrices,
  pinnedDaos,
  hideInbox = false,
  compact,
  setCompact,
  mountedInBrowser,
  LinkWrapper,
}: NavigationProps) => {
  const { t } = useTranslation()
  const { isMac } = usePlatform()
  const {
    responsiveNavigation: {
      enabled: responsiveEnabled,
      toggle: toggleResponsive,
    },
    responsiveRightSidebar: { enabled: responsiveRightSidebarEnabled },
  } = useAppLayoutContext()

  // Use screen resize to determine when compact should be forced on or off.
  const [forceCompact, setForceCompact] = useState<boolean | undefined>(
    // Initialize not compact to prevent hydration errors (since it takes at
    // least 1 render to update this).
    false
  )
  useEffect(() => {
    // Only run in browser.
    if (typeof window === 'undefined' || !mountedInBrowser) {
      return
    }

    const updateForceCompact = () => setForceCompact(getForceCompact())

    // Update on initialization.
    updateForceCompact()

    window.addEventListener('resize', updateForceCompact)
    // Clean up on umount
    return () => window.removeEventListener('resize', updateForceCompact)
  }, [mountedInBrowser])

  // If forceCompact is set to a boolean, override compact.
  if (forceCompact !== undefined) {
    compact = forceCompact
  }

  const [showPinnedTopBorder, setShowPinnedTopBorder] = useState(false)
  const [showPinnedBottomBorder, setShowPinnedBottomBorder] = useState(false)
  const scrollablePinnedContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ref = scrollablePinnedContainerRef.current
    if (!ref) {
      return
    }

    const updateBorders = () => {
      const { scrollTop, scrollHeight, clientHeight } = ref

      // 0.5rem (~8px) padding before the top of the first sub DAO image, and a
      // couple extra pixels so the first element actually looks covered.
      const contentHiddenOnTop = scrollTop > 11
      setShowPinnedTopBorder(contentHiddenOnTop)

      // 1rem (~16px) padding before the bottom of the last sub DAO image, and
      // a couple extra pixels so the last element actually looks covered.
      const contentHiddenOnBottom = scrollTop < scrollHeight - clientHeight - 19
      setShowPinnedBottomBorder(contentHiddenOnBottom)
    }

    updateBorders()

    // Add listener on mount, remove on cleanup.
    ref.addEventListener('scroll', updateBorders)
    return () => ref.removeEventListener('scroll', updateBorders)
    // Update when compact is changed since positioning is different.
  }, [scrollablePinnedContainerRef, compact])

  return (
    <>
      {/* Layer underneath that allows closing the responsive navigation by tapping on visible parts of the page. */}
      {responsiveEnabled && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-[19] cursor-pointer sm:hidden"
          onClick={() => responsiveEnabled && toggleResponsive()}
        ></div>
      )}

      <nav
        className={clsx(
          // General
          'no-scrollbar flex h-full shrink-0 flex-col overflow-y-auto bg-background-base py-6 pt-0 text-lg',
          // If compact, items will manager their own padding so that
          // highlighted rows fill the whole width.
          !compact && 'px-6',
          // Responsive
          'absolute top-0 bottom-0 z-20 w-[90vw] shadow-dp8 transition-all',
          responsiveEnabled ? 'left-0' : '-left-full',
          // Large
          'sm:relative sm:left-0 sm:shadow-none sm:transition-[padding-left]',
          compact ? 'sm:w-min' : 'sm:w-[264px]',

          // Dim if responsive right sidebar is open. Right sidebar can be responsive up to xl size. After that, it automatically displays.
          responsiveRightSidebarEnabled
            ? 'opacity-30 xl:opacity-100'
            : 'opacity-100'
        )}
      >
        <PageHeader
          centerNode={
            <Link href="/home">
              <a className="flex flex-row items-center gap-2">
                <Logo size={32} />
                {!compact && <p className="header-text">{t('meta.title')}</p>}
              </a>
            </Link>
          }
          forceCenter={compact}
          noBorder={compact}
        />

        <div className={clsx(!compact && 'pt-2')}>
          <Row
            Icon={HomeOutlined}
            LinkWrapper={LinkWrapper}
            compact={compact}
            href="/home"
            label={t('title.home')}
          />

          <Row
            Icon={Search}
            LinkWrapper={LinkWrapper}
            compact={compact}
            label={t('title.search')}
            onClick={setCommandModalVisible}
            rightNode={
              !isMobile() && (
                <div className="legend-text flex flex-row items-center gap-1 text-icon-primary">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-interactive-disabled">
                    <p>{isMac ? '⌘' : '⌃'}</p>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-interactive-disabled">
                    <p>k</p>
                  </div>
                </div>
              )
            }
          />

          {!hideInbox && (
            <Row
              Icon={InboxOutlined}
              LinkWrapper={LinkWrapper}
              compact={compact}
              href="/inbox"
              label={
                !inboxCount.loading && inboxCount.data > 0
                  ? t('title.inboxWithCount', { count: inboxCount.data })
                  : t('title.inbox')
              }
              loading={inboxCount.loading}
              showBadge={!inboxCount.loading && inboxCount.data > 0}
            />
          )}

          <Row
            Icon={Add}
            LinkWrapper={LinkWrapper}
            compact={compact}
            href="/dao/create"
            label={t('button.create')}
          />

          <Row
            Icon={PushPinOutlined}
            LinkWrapper={LinkWrapper}
            compact={compact}
            defaultExpanded
            label={t('title.following')}
            loading={pinnedDaos.loading}
          >
            {!pinnedDaos.loading && (
              <div
                className={clsx(
                  'relative sm:max-h-[33vh]',
                  !pinnedDaos.loading && 'no-scrollbar overflow-y-auto',
                  compact && 'mt-1 w-min'
                )}
                ref={scrollablePinnedContainerRef}
              >
                {/* Top border */}
                <div
                  className={clsx(
                    'sticky top-0 right-0 left-0 h-[1px] bg-border-primary transition-opacity',
                    showPinnedTopBorder ? 'opacity-100' : 'opacity-0'
                  )}
                ></div>

                {/* DAOs */}
                {pinnedDaos.data.map((dao, index) => (
                  <DaoDropdown
                    key={index}
                    LinkWrapper={LinkWrapper}
                    compact={compact}
                    dao={dao}
                    defaultExpanded
                  />
                ))}

                {/* Bottom border */}
                <div
                  className={clsx(
                    'sticky right-0 bottom-0 left-0 h-[1px] bg-border-primary transition-opacity',
                    showPinnedBottomBorder ? 'opacity-100' : 'opacity-0'
                  )}
                ></div>
              </div>
            )}
          </Row>
        </div>

        <div className={clsx('mt-8 flex grow flex-col justify-end gap-2')}>
          {!compact && (
            <div className="caption-text space-y-3 font-mono">
              <p>{t('info.daodaoWithVersion', { version })}</p>

              {tokenPrices &&
                (tokenPrices.loading ? (
                  <Loader className="!justify-start" size={38} />
                ) : (
                  tokenPrices.data.map(
                    ({ label, price, priceDenom, change }, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-end justify-between gap-2"
                      >
                        <p className="text-text-primary">
                          {label} = {price} ${priceDenom}
                        </p>
                        {change !== undefined && (
                          <PricePercentChange value={change} />
                        )}
                      </div>
                    )
                  )
                ))}
            </div>
          )}

          <div
            className={clsx(
              'mt-4 flex gap-2',
              compact ? 'mx-6 flex-col' : 'flex-row items-center'
            )}
          >
            {compact ? (
              <Tooltip title={t('button.toggleTheme')}>
                <ThemeToggle compact />
              </Tooltip>
            ) : (
              <ThemeToggle />
            )}

            <IconButton
              Icon={
                compact ? KeyboardDoubleArrowRight : KeyboardDoubleArrowLeft
              }
              circular
              className="hidden lg:flex"
              onClick={() => setCompact(!compact)}
              size={compact ? 'default' : 'xl'}
              variant="secondary"
            />
          </div>
        </div>
      </nav>
    </>
  )
}
