// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Home, Inbox, PinOutline } from '@dao-dao/icons'

import { ButtonLink } from '../Button'
import { Logo } from '../Logo'
import { PricePercentChange } from '../PricePercentChange'
import { ThemeToggle } from '../ThemeToggle'
import { PinnedDao } from './PinnedDao'
import { Row } from './Row'

export interface TokenPrice {
  label: string
  price: number
  priceDenom: string
  change: number
}

export interface NavigationProps {
  setCommandModalVisible: () => void
  isMac: boolean
  inboxCount: number
  version: string
  tokenPrices: TokenPrice[]
  hideInbox?: boolean
}

export const Navigation = ({
  setCommandModalVisible,
  isMac,
  inboxCount,
  version,
  tokenPrices,
  hideInbox,
}: NavigationProps) => {
  const { t } = useTranslation()

  return (
    <nav className="flex sticky top-0 flex-col justify-between p-6 space-y-20 w-full max-w-xs h-screen text-lg">
      <div>
        <Link href="/home">
          <a className="flex flex-row gap-2 items-center py-4 mb-2 border-b border-border-secondary">
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
            showBadge={inboxCount > 0}
          >
            <p className="p-5 text-sm">Inbox content</p>
          </Row>
        )}

        <Row Icon={PinOutline} defaultExpanded label={t('info.pinned')}>
          <div className="overflow-y-auto max-h-[33vh] styled-scrollbar">
            <PinnedDao
              dao={{
                name: 'Core 1',
                imageUrl: '/placeholders/1.svg',
              }}
              defaultExpanded
            />
            <PinnedDao
              dao={{
                name: 'Raw',
                imageUrl: '/placeholders/2.svg',
                subdaos: [
                  {
                    name: 'Payroll',
                    imageUrl: '/placeholders/3.svg',
                  },
                  {
                    name: 'Pool distribution',
                    imageUrl: '/placeholders/4.svg',
                    subdaos: [
                      {
                        name: 'Native tokens',
                        imageUrl: '/placeholders/1.svg',
                      },
                    ],
                  },
                ],
              }}
              defaultExpanded
            />
            <PinnedDao
              dao={{
                name: 'Animals',
                imageUrl: '/placeholders/5.svg',
              }}
              defaultExpanded
            />
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
