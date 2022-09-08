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

import { usePlatform } from '@dao-dao/utils'

import { ButtonLink } from '../Button'
import { DaoDropdown, DaoDropdownInfo } from '../dao'
import { IconButton, IconButtonLink } from '../IconButton'
import { Logo } from '../Logo'
import { PricePercentChange } from '../PricePercentChange'
import { ThemeToggle } from '../ThemeToggle'
import { Tooltip } from '../Tooltip'
import { PageHeader } from './PageHeader'
import { Row } from './Row'

export interface TokenPrice {
  label: string
  price: number
  priceDenom: string
  change: number
}

export interface NavigationProps {
  setCommandModalVisible: () => void
  inboxCount: number
  version: string
  tokenPrices: TokenPrice[]
  pinnedDaos: DaoDropdownInfo[]
  hideInbox?: boolean
  compact: boolean
  setCompact: (compact: boolean) => void
  responsiveMenuEnabled: boolean
}

// Width of `lg` tailwind selector.
// If this value is changed, change compact button display media query at the
// bottom of this component so the user can toggle when not forced.
const FORCE_COMPACT_NAVIGATION_AT_WIDTH = 1024
// Width of `sm` tailwind selector.
const FORCE_MOBILE_NAVIGATION_AT_WIDTH = 640

export const Navigation = ({
  setCommandModalVisible,
  inboxCount,
  version,
  tokenPrices,
  pinnedDaos,
  hideInbox = false,
  compact,
  setCompact,
  responsiveMenuEnabled,
}: NavigationProps) => {
  const { t } = useTranslation()
  const { isMac } = usePlatform()

  // Use screen resize event to determine when compact should be forced.
  const [forceCompact, setForceCompact] = useState<boolean | undefined>()
  useEffect(() => {
    // Only run in browser.
    if (typeof window === 'undefined') {
      return
    }

    const updateForceCompact = () => {
      setForceCompact(
        window.innerWidth < FORCE_MOBILE_NAVIGATION_AT_WIDTH
          ? false
          : window.innerWidth < FORCE_COMPACT_NAVIGATION_AT_WIDTH
          ? true
          : undefined
      )
    }

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
    <nav
      className={clsx(
        // General
        'flex overflow-y-auto flex-col shrink-0 py-6 pt-0 h-full text-lg bg-background-base transition-all styled-scrollbar',
        // If compact, items will manager their own padding so that
        // highlighted rows fill the whole width.
        !compact && 'px-6',
        // Responsive
        'absolute top-0 bottom-0 z-20 w-full',
        responsiveMenuEnabled ? 'left-0' : '-left-full',
        // Large
        'sm:relative sm:left-0',
        compact ? 'sm:w-auto' : 'sm:w-[264px]'
      )}
    >
      <PageHeader
        className={clsx(
          // Responsive
          'justify-center',
          // Large
          !compact && 'sm:justify-start'
        )}
        noBorder={compact}
      >
        <Link href="/home">
          <a className="flex flex-row gap-2 items-center">
            <Logo size={32} />
            {!compact && <p className="header-text">{t('meta.title')}</p>}
          </a>
        </Link>
      </PageHeader>

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
              inboxCount
                ? t('title.inboxWithCount', { count: inboxCount })
                : t('title.inbox')
            }
            localHref="/inbox"
            showBadge={inboxCount > 0}
          />
        )}

        <Row
          Icon={PushPinOutlined}
          compact={compact}
          defaultExpanded
          label={t('info.pinned')}
        >
          <div
            className={clsx(
              'overflow-y-auto relative sm:max-h-[33vh] styled-scrollbar',
              compact && 'mt-1 w-min',
              // Shift scrollbar to the right a bit.
              !compact && 'pr-5 -mr-5'
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
            {pinnedDaos.map((dao, index) => (
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
            className="mt-12 w-full"
            contentContainerClassName="justify-center"
            href="/dao/create"
            size="lg"
          >
            {t('button.createADAO')}
          </ButtonLink>
        )}
      </div>

      <div className={clsx('flex flex-col grow gap-2 justify-end mt-20')}>
        {!compact && (
          <div className="space-y-3 font-mono caption-text">
            <p>{t('info.daodaoWithVersion', { version })}</p>

            {tokenPrices.map(({ label, price, priceDenom, change }, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 justify-between items-end"
              >
                <p className="text-text-primary">
                  {label} = {price} ${priceDenom}
                </p>
                <PricePercentChange value={change} />
              </div>
            ))}
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
            Icon={compact ? KeyboardDoubleArrowRight : KeyboardDoubleArrowLeft}
            circular
            className="hidden lg:flex"
            onClick={() => setCompact(!compact)}
            size={compact ? 'default' : 'xl'}
            variant="secondary"
          />
        </div>
      </div>
    </nav>
  )
}
