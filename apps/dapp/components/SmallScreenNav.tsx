// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { MenuAlt1Icon, MenuIcon, SearchIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ConnectWalletButton } from '@dao-dao/common'
import { Loader, Logo, SuspenseLoader } from '@dao-dao/ui'

import { commandModalVisibleAtom, pinnedAddressesAtom } from '@/atoms'

import { MobilePinnedDAONavList } from './PinnedDAONavList'

interface SmallScreenNavProps {
  className?: string
}

export const SmallScreenNav = ({ className }: SmallScreenNavProps) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)
  const pinnedAddresses = useRecoilValue(pinnedAddressesAtom)

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 py-2 px-6 lg:hidden',
        {
          'h-16': !expanded,
          'pb-6 mb-4 border-b border-inactive': expanded,
        },
        className
      )}
    >
      <div className="flex gap-6 justify-between items-center">
        <Link href="/home" passHref>
          <a>
            <Logo size={28} />
          </a>
        </Link>
        <ConnectWalletButton mobile />
        <button onClick={() => setExpanded((e) => !e)} type="button">
          {!expanded && <MenuIcon className="w-5" />}
          {expanded && <MenuAlt1Icon className="w-5" />}
        </button>
      </div>
      {expanded && (
        <div>
          <button
            className="flex gap-2 items-center p-2 w-full bg-primary rounded-lg link-text"
            onClick={() => setCommandModalVisible(true)}
          >
            <SearchIcon className="w-4 h-4" /> {t('title.search')}
          </button>

          {pinnedAddresses.length > 0 && (
            <div className="mt-5 ml-1">
              <h3 className="mb-2 font-mono caption-text">{t('title.daos')}</h3>
              <SuspenseLoader
                fallback={<Loader className="!justify-start ml-2" size={20} />}
              >
                <MobilePinnedDAONavList />
              </SuspenseLoader>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
