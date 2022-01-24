import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import ThemeToggle from 'components/ThemeToggle'
import { Logo } from 'components/Logo'
import {
  ArrowRightIcon,
  CashIcon,
  ExternalLinkIcon,
  LibraryIcon,
} from '@heroicons/react/outline'
import { useRecoilValue, waitForAll } from 'recoil'
import { daoSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import { pinnedDaosAtom, pinnedMultisigsAtom } from 'atoms/pinned'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

function WalletConnect() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
    }
  }

  return (
    <div className="flex flex-grow md:flex-grow-0 mt-4">
      <button
        className="block btn bg-primary text-primary-content w-full normal-case truncate p-2 text-left"
        onClick={handleConnect}
      >
        {walletAddress || (
          <>
            <CashIcon className="inline w-6 h-6 mr-1" />
            Connect Wallet
          </>
        )}
      </button>
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

function Nav() {
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

  return (
    <nav className="p-6 text-lg sticky top-0 h-screen flex flex-col justify-between border-r border-base-300">
      <div>
        <div className="flex items-center">
          <Link href="/starred">
            <a>
              <Logo height={38} width={38} alt={`${PUBLIC_SITE_TITLE} Logo`} />
            </a>
          </Link>
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
          dao dao v{process.env.NEXT_PUBLIC_DAO_DAO_VERSION}
        </h3>
        <ul className="ml-2 list-none">
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
              href="https://github.com/da0-da0"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
            <a
              href="https://twitter.com/da0_da0"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
