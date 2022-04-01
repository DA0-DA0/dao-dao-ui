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
    <div className="truncate">
      <LibraryIcon className="inline h-5 w-5 mb-1 mr-2" />
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
    <nav className="p-6 text-lg sticky top-0 h-screen w-full flex flex-col justify-between border-r border-inactive">
      <div>
        <div className="flex justify-between lg:justify-start items-center">
          <Link href="/starred">
            <a>
              <Logo height={28} width={28} alt={`${SITE_TITLE} Logo`} />
            </a>
          </Link>

          <div className="lg:hidden cursor-pointer" onClick={onMenuClick}>
            <MenuIcon className="w-8" />
          </div>
        </div>
        <ConnectWalletButton />
        <div className="ml-1 text-sm">
          <div className="mt-3">
            <h3 className="text-tertiary font-mono text-sm mb-1">DAOs</h3>
            <ul className="list-none ml-2">
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
            <ul className="list-none ml-2 mt-2">
              <li className="mt-1">
                <ArrowRightIcon className="inline w-4 mr-2 mb-1" />
                <Link href="/dao/list">
                  <a>All DAOs</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <h3 className="text-tertiary font-mono text-sm mb-1">Multisigs</h3>
            <ul className="list-none ml-2">
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

            <ul className="list-none ml-2">
              <li className="mt-1">
                <ArrowRightIcon className="inline w-4 mr-2 mb-1" />
                <Link href="/multisig/list">
                  <a>All Multisigs</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ml-1">
        <h3 className="text-tertiary font-mono text-sm mb-2">
          dao dao <div className="inline text-error">beta</div> v
          {process.env.NEXT_PUBLIC_DAO_DAO_VERSION}{' '}
        </h3>
        <ul
          className={`text-sm list-none ${
            betaWarningShowing ? ' text-secondary' : ''
          }`}
        >
          <li className="mb-2">
            <ThemeToggle />
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-2" />
            <a href="https://docs.daodao.zone" target="_blank" rel="noreferrer">
              Docs
            </a>
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-2" />
            <a
              href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
              target="_blank"
              rel="noreferrer"
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
