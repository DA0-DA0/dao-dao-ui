import Link from 'next/link'
import ThemeToggle from 'components/ThemeToggle'
import { Logo } from 'components/Logo'
import {
  ArrowRightIcon,
  CashIcon,
  ExternalLinkIcon,
  LibraryIcon,
} from '@heroicons/react/outline'
import { useRecoilValue, useRecoilState, waitForAll } from 'recoil'
import {
  connectedWalletAtom,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { daoSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'
import { Button } from '@components'
import { showBetaNoticeAtom } from 'atoms/status'
import { MenuIcon } from '@heroicons/react/outline'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

function WalletConnect() {
  const [wallet, setWallet] = useRecoilState(connectedWalletAtom)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const handleConnect = () => {
    if (!wallet) {
      setWallet('keplr')
    } else {
      setWallet('')
    }
  }

  return (
    <div className="flex flex-grow md:flex-grow-0 mt-4">
      {walletAddress ? (
        <Button full onClick={handleConnect}>
          {walletAddress}
        </Button>
      ) : (
        <Button
          full
          onClick={handleConnect}
          iconBefore={<CashIcon className="inline w-4 h-4" />}
        >
          Connect wallet
        </Button>
      )}
    </div>
  )
}

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
    <nav className="p-6 text-lg sticky top-0 h-screen flex flex-col justify-between border-r border-base-300">
      <div>
        <div className="flex items-center justify-between">
          <Link href="/starred">
            <a>
              <Logo height={38} width={38} alt={`${PUBLIC_SITE_TITLE} Logo`} />
            </a>
          </Link>

          <div className="lg:hidden" onClick={onMenuClick}>
            <MenuIcon height={38} width={38} />
          </div>
        </div>
        <WalletConnect />
        <div className="ml-1">
          <div className="mt-3">
            <h3 className="text-secondary font-mono mb-1">DAOs</h3>
            <ul className="list-none ml-2">
              {daoAddresses.map(({ dao, address }) => (
                <li key={dao.config.name} className="mt-1">
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
                <ArrowRightIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/dao/list">
                  <a>All DAOs</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <h3 className="text-secondary font-mono mb-1">Multisigs</h3>
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
                <ArrowRightIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/multisig/list">
                  <a>All Multisigs</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ml-1">
        <h3 className="text-secondary font-mono mb-1">
          dao dao <div className="inline text-error">beta</div> v
          {process.env.NEXT_PUBLIC_DAO_DAO_VERSION}{' '}
        </h3>
        <ul
          className={
            'ml-2 list-none' + (betaWarningShowing ? ' text-secondary' : '')
          }
        >
          <li>
            <ThemeToggle />
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
            <a href="https://docs.daodao.zone" target="_blank" rel="noreferrer">
              Docs
            </a>
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
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
