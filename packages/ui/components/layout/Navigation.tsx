// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { SearchIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Home, Inbox, PinOutline } from '@dao-dao/icons'
import { usePlatform } from '@dao-dao/utils'

import { ButtonLink } from '../Button'
import { DaoDropdown, DaoDropdownInfo } from '../dao'
import { Logo } from '../Logo'
import { PricePercentChange } from '../PricePercentChange'
import { ThemeToggle } from '../ThemeToggle'
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
}

export const Navigation = ({
  setCommandModalVisible,
  inboxCount,
  version,
  tokenPrices,
  pinnedDaos,
  hideInbox,
}: NavigationProps) => {
  const { t } = useTranslation()
  const { isMac } = usePlatform()

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
  }, [scrollablePinnedContainerRef])

  return (
    <nav className="flex flex-col justify-between p-6 pt-0 space-y-20 w-full h-full text-lg">
      <div>
        <Link href="/home">
          <a className="flex flex-row gap-2 items-center mb-2 h-20 border-b border-border-secondary">
            <Logo size={32} />
            <p className="header-text">{t('meta.title')}</p>
          </a>
        </Link>

        <Row
          Icon={SearchIcon}
          iconClassName="!w-[18px] !h-[18px]"
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

        <Row Icon={Home} label={t('title.home')} localHref="/home" />

        {!hideInbox && (
          <Row
            Icon={Inbox}
            label={
              inboxCount
                ? t('title.inboxWithCount', { count: inboxCount })
                : t('title.inbox')
            }
            localHref="/inbox"
            showBadge={inboxCount > 0}
          >
            <p className="p-5 text-sm">Inbox content</p>
          </Row>
        )}

        <Row Icon={PinOutline} defaultExpanded label={t('info.pinned')}>
          <div
            className="overflow-y-auto relative pr-5 -mr-5 max-h-[33vh] styled-scrollbar"
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
              <DaoDropdown key={index} dao={dao} defaultExpanded />
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

        <ButtonLink
          className="mt-12 w-full"
          contentContainerClassName="justify-center"
          href="/dao/create"
          size="lg"
        >
          {t('button.createADAO')}
        </ButtonLink>
      </div>

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

        <div className="flex flex-row gap-3 items-center !mt-8">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
