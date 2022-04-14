import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import {
  ArrowRightIcon,
  ExternalLinkIcon,
  LibraryIcon,
} from '@heroicons/react/outline'
import { MenuIcon } from '@heroicons/react/outline'

import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { showBetaNoticeAtom } from 'atoms/status'
import { Logo } from 'components/Logo'
import ThemeToggle from 'components/ThemeToggle'
import { daoSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'

import { SITE_TITLE } from '../util/constants'
import ConnectWalletButton from './ConnectWalletButton'

function MemberDisplay({ name }: { name: string }) {
  return (
    <div className="truncate link-text">
      <LibraryIcon className="inline mr-2 mb-1 w-5 h-5" />
      {name}
    </div>
  )
}

type NavProps = {
  onMenuClick?: () => void
}

function Nav({ onMenuClick }: NavProps) {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const daos = useRecoilValue(waitForAll(pinnedDaos.map((a) => daoSelector(a))))
  const daoAddresses = daos.map((d, idx) => ({
    dao: d,
    address: pinnedDaos[idx],
  }))

  const pinnedSigs = useRecoilValue(pinnedMultisigsAtom)
  const sigs = useRecoilValue(waitForAll(pinnedSigs.map((a) => sigSelector(a))))
  const sigAddresses = sigs.map((s, idx) => ({
    sig: s,
    address: pinnedSigs[idx],
  }))

  const betaWarningShowing = useRecoilValue(showBetaNoticeAtom)

  return (
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
        <ConnectWalletButton />
        <div className="ml-1 text-sm">
          <div className="mt-[20px]">
            <h3 className="mb-[16px] font-mono caption-text">DAOs</h3>
            <ul className="ml-2 list-none">
              {daoAddresses.map(({ dao, address }) => (
                <li key={address} className="mt-1">
                  <Link href={`/dao/${address}`}>
                    <a>
                      <MemberDisplay name={dao.config.name} />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 ml-2 list-none">
              <li className="mt-1 link-text">
                <ArrowRightIcon className="inline mr-2 mb-1 w-4" />
                <Link href="/dao/list">
                  <a>All DAOs</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <h3 className="mt-[20px] mb-[16px] font-mono caption-text">
              Multisigs
            </h3>
            <ul className="ml-2 list-none">
              {sigAddresses &&
                sigAddresses.map(({ sig, address }) => (
                  <li key={sig.config.name} className="mt-1">
                    <Link href={`/multisig/${address}`}>
                      <a>
                        <MemberDisplay name={sig.config.name} />
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>

            <ul className="ml-2 list-none">
              <li className="mt-1 link-text">
                <ArrowRightIcon className="inline mr-2 mb-1 w-4" />
                <Link href="/multisig/list">
                  <a>All Multisigs</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ml-1">
        <h3 className="mb-2 font-mono caption-text">
          dao dao <div className="inline text-error">beta</div> v
          {process.env.NEXT_PUBLIC_DAO_DAO_VERSION}{' '}
        </h3>
        <ul
          className={`text-sm list-none link-text ${
            betaWarningShowing ? ' text-secondary' : ''
          }`}
        >
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
}

export default Nav
