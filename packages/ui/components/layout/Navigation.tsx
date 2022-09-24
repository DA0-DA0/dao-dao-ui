// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import {
  Add,
  HomeOutlined,
  InboxOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  PushPinOutlined,
  Search,
} from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NavigationProps } from '@dao-dao/tstypes/ui/Navigation'
import { usePlatform } from '@dao-dao/utils'

import { ButtonLink } from '../Button'
import { DaoDropdown } from '../dao'
import { IconButton, IconButtonLink } from '../IconButton'
import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { PricePercentChange } from '../PricePercentChange'
import { ThemeToggle } from '../ThemeToggle'
import { Tooltip } from '../Tooltip'
import { useAppLayoutContext } from './AppLayoutContext'
import { PageHeader } from './PageHeader'
import { Row } from './Row'

export * from '@dao-dao/tstypes/ui/Navigation'

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
    // Initialize compact to prevent hydration errors and let navigation animate
    // opening on load.
    true
  )
  useEffect(() => {
    // Only run in browser.
    if (typeof window === 'undefined') {
      return
    }

    const updateForceCompact = () => setForceCompact(getForceCompact())

    // Update on initialization.
    updateForceCompact()

    window.addEventListener('resize', updateForceCompact)
    // Clean up on umount
    return () => window.removeEventListener('resize', updateForceCompact)
  }, [])

  // Automatically force compact on small screens and force non-compact when
  // mobile since the nav will be full width.
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
          'flex overflow-y-auto flex-col shrink-0 py-6 pt-0 h-full text-lg bg-background-base transition-all no-scrollbar',
          // If compact, items will manager their own padding so that
          // highlighted rows fill the whole width.
          !compact && 'px-6',
          // Responsive
          'absolute top-0 bottom-0 z-20 w-[90vw] shadow-dp8',
          responsiveEnabled ? 'left-0' : '-left-full',
          // Large
          'sm:relative sm:left-0 sm:shadow-none',
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
              <a className="flex flex-row gap-2 items-center">
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
            compact={compact}
            label={t('title.home')}
            localHref="/home"
          />

          <Row
            Icon={Search}
            compact={compact}
            label={t('title.search')}
            onClick={setCommandModalVisible}
            rightNode={
              <div className="flex flex-row gap-1 items-center text-icon-primary legend-text">
                <div className="flex justify-center items-center w-6 h-6 bg-background-interactive-disabled rounded-md">
                  <p>{isMac ? '⌘' : '⌃'}</p>
                </div>
                <div className="flex justify-center items-center w-6 h-6 bg-background-interactive-disabled rounded-md">
                  <p>k</p>
                </div>
              </div>
            }
          />

          {!hideInbox && (
            <Row
              Icon={InboxOutlined}
              compact={compact}
              label={
                !inboxCount.loading && inboxCount.data > 0
                  ? t('title.inboxWithCount', { count: inboxCount.data })
                  : t('title.inbox')
              }
              loading={inboxCount.loading}
              localHref="/inbox"
              showBadge={!inboxCount.loading && inboxCount.data > 0}
            />
          )}

          <Row
            Icon={PushPinOutlined}
            compact={compact}
            defaultExpanded
            label={t('info.pinned')}
            loading={pinnedDaos.loading}
          >
            {!pinnedDaos.loading && (
              <div
                className={clsx(
                  'relative sm:max-h-[33vh]',
                  !pinnedDaos.loading && 'overflow-y-auto no-scrollbar',
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

          {compact ? (
            <Tooltip title={t('button.createADAO')}>
              <IconButtonLink
                Icon={Add}
                className="mx-6 mt-3"
                href="/dao/create"
                variant="primary"
              />
            </Tooltip>
          ) : (
            <ButtonLink
              className="mt-8 w-full"
              contentContainerClassName="justify-center"
              href="/dao/create"
              size="lg"
            >
              {t('button.createADAO')}
            </ButtonLink>
          )}
        </div>

        <div className={clsx('flex flex-col grow gap-2 justify-end mt-8')}>
          {!compact && (
            <div className="space-y-3 font-mono caption-text">
              <p>{t('info.daodaoWithVersion', { version })}</p>

              {tokenPrices.loading ? (
                <Loader className="!justify-start" size={38} />
              ) : (
                tokenPrices.data.map(
                  ({ label, price, priceDenom, change }, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 justify-between items-end"
                    >
                      <p className="text-text-primary">
                        {label} = {price} ${priceDenom}
                      </p>
                      <PricePercentChange value={change} />
                    </div>
                  )
                )
              )}
            </div>
          )}

          <div
            className={clsx(
              'flex gap-2 mt-8',
              compact ? 'flex-col mx-6' : 'flex-row items-center'
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
