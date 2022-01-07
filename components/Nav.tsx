import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import ThemeToggle from 'components/ThemeToggle'
import NavContractLabel from 'components/NavContractLabel'
import Logo from 'components/Logo'
import {
  BeakerIcon,
  CashIcon,
  ExternalLinkIcon,
  MapIcon,
} from '@heroicons/react/outline'

const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TI

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

function Nav() {
  return (
    <nav className="p-6 text-lg sticky top-0 h-screen flex flex-col justify-between border-r border-base-300">
      <div>
        <div className="flex items-center">
          <Link href="/">
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
              <li>
                <MapIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/dao/list">
                  <a>Explore</a>
                </Link>
              </li>
              <li>
                <BeakerIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/dao/create">
                  <a>Create</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <h3 className="text-secondary font-mono mb-1">Multisigs</h3>
            <ul className="list-none ml-2">
              <li>
                <MapIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/multisig/list">
                  <a>Explore</a>
                </Link>
              </li>
              <li>
                <BeakerIcon className="inline w-5 h-5 mr-2 mb-1" />
                <Link href="/multisig/create">
                  <a>Create</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ml-1">
        <h3 className="text-secondary font-mono mb-1">dao dao v0.2</h3>
        <ul className="ml-2 list-none">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
            Docs
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
            GitHub
          </li>
          <li>
            <ExternalLinkIcon className="inline w-5 h-5 mr-2 mb-1" />
            Twitter
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
