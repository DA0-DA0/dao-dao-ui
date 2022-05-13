import { ArrowRightIcon, ExternalLinkIcon } from '@heroicons/react/outline'
import { MenuIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'

import { Logo } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'

import ThemeToggle from 'components/ThemeToggle'

import ConnectWalletButton from './ConnectWalletButton'
import { Loader } from './Loader'
import { NavListItem } from './NavListItem'
import { PinnedDaoNavList } from './PinnedDaoNavList'
import { PinnedMultisigNavList } from './PinnedMultisigNavList'
import { SuspenseLoader } from './SuspenseLoader'

type NavProps = {
  onMenuClick?: () => void
}

export const Nav: FC<NavProps> = ({ onMenuClick }) => (
  <nav className="flex sticky top-0 flex-col justify-between p-6 w-full h-screen text-lg border-r border-inactive">
    <div>
      <div className="flex justify-between items-center lg:justify-start">
        <Link href="/starred">
          <a>
            <Logo alt={`${SITE_TITLE} Logo`} height={28} width={28} />
          </a>
        </Link>
        <div className="cursor-pointer lg:hidden" onClick={onMenuClick}>
          <MenuIcon className="w-8" />
        </div>
      </div>
      <div className="my-4 w-full">
        <ConnectWalletButton />
      </div>
      <div className="ml-1 text-sm">
        <div className="mt-[20px]">
          <h3 className="mb-[16px] font-mono caption-text">DAOs</h3>

          <SuspenseLoader
            fallback={<Loader className="!justify-start ml-2" size={20} />}
          >
            <PinnedDaoNavList />
          </SuspenseLoader>

          <ul className="mt-2 ml-2 list-none">
            <NavListItem
              href="/dao/list"
              icon={ArrowRightIcon}
              text="All DAOs"
            />
          </ul>
        </div>
        <div className="mt-3">
          <h3 className="mt-[20px] mb-[16px] font-mono caption-text">
            Multisigs
          </h3>

          <SuspenseLoader
            fallback={<Loader className="!justify-start ml-2" size={20} />}
          >
            <PinnedMultisigNavList />
          </SuspenseLoader>

          <ul className="mt-2 ml-2 list-none">
            <NavListItem
              href="/multisig/list"
              icon={ArrowRightIcon}
              text="All Multisigs"
            />
          </ul>
        </div>
      </div>
    </div>
    <div className="ml-1">
      <h3 className="mb-2 font-mono caption-text">
        dao dao <div className="inline text-error">beta</div> v
        {process.env.NEXT_PUBLIC_DAO_DAO_VERSION}{' '}
      </h3>
      <ul className="text-sm list-none link-text">
        <li className="mb-2">
          <ThemeToggle />
        </li>
        <li className="mb-2">
          <ExternalLinkIcon className="inline mr-2 w-5 h-5" />
          <a href="https://docs.daodao.zone" rel="noreferrer" target="_blank">
            Docs
          </a>
        </li>
        <li>
          <ExternalLinkIcon className="inline mr-2 w-5 h-5" />
          <a
            href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
            rel="noreferrer"
            target="_blank"
          >
            Feedback
          </a>
        </li>
      </ul>
    </div>
  </nav>
)
