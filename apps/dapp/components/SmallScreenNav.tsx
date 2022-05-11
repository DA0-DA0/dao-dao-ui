import {
  ArrowRightIcon,
  MenuAlt1Icon,
  MenuIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState } from 'react'

import { Logo } from '@dao-dao/ui'

import ConnectWalletButton from './ConnectWalletButton'
import { Loader } from './Loader'
import { NavListItem } from './NavListItem'
import { MobilePinnedDaoNavList } from './PinnedDaoNavList'
import { MobilePinnedMultisigNavList } from './PinnedMultisigNavList'
import { SuspenseLoader } from './SuspenseLoader'

export interface SmallScreenNavProps {}

export const SmallScreenNav: FC<SmallScreenNavProps> = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 py-2 px-6',
        expanded && 'pb-6 border-b border-inactive'
      )}
    >
      <div className="flex gap-6 justify-between items-center">
        <Link href="/starred" passHref>
          <a>
            <Logo height={28} width={28} />
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
          <div className="ml-1">
            <h3 className="mb-2 font-mono caption-text">DAOs</h3>

            <SuspenseLoader
              fallback={<Loader className="!justify-start ml-2" size={20} />}
            >
              <MobilePinnedDaoNavList />
            </SuspenseLoader>

            <ul className="mt-2 list-none">
              <NavListItem
                href="/dao/list"
                icon={ArrowRightIcon}
                text="All DAOs"
              />
            </ul>
            <h3 className="mt-5 mb-2 font-mono caption-text">Multisigs</h3>

            <SuspenseLoader
              fallback={<Loader className="!justify-start ml-2" size={20} />}
            >
              <MobilePinnedMultisigNavList />
            </SuspenseLoader>

            <ul className="mt-2 list-none">
              <NavListItem
                href="/multisig/list"
                icon={ArrowRightIcon}
                text="All Multisigs"
              />
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
