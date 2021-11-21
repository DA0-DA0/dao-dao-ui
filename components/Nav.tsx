import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from 'components/ThemeToggle'
import NavContractLabel from 'components/NavContractLabel'
import Logo from 'components/Logo'

function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
    }
  }

  const PUBLIC_SITE_ICON_URL = process.env.NEXT_PUBLIC_SITE_ICON_URL || ''
  const PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE

  return (
    <div className="border-b w-screen px-2 md:px-16">
      <nav className="flex flex-wrap text-center md:text-left md:flex flex-row w-full justify-between items-center py-4 ">
        <div className="flex items-center">
          <Link href="/">
            <a>
              {PUBLIC_SITE_ICON_URL.length > 0 ? (
                <Logo
                  height={32}
                  width={32}
                  alt={`${PUBLIC_SITE_TITLE} Logo`}
                />
              ) : (
                <span className="text-2xl">⚛️ </span>
              )}
            </a>
          </Link>
          <Link href="/">
            <a className="ml-1 md:ml-2 link link-hover font-semibold text-xl md:text-2xl align-top">
              {PUBLIC_SITE_TITLE}
            </a>
          </Link>
          <div className="flex-1 px-2 mx-2">
            <div className="items-stretch hidden lg:flex">
              <Link href="/proposals">
                <a className="btn btn-ghost btn-sm rounded-btn">Proposals</a>
              </Link>
              <Link href="/treasury">
                <a className="btn btn-ghost btn-sm rounded-btn">Treasury</a>
              </Link>
            </div>
          </div>
        </div>
        {/* <NavContractLabel /> */}
        <ThemeToggle />
        <div className="flex flex-grow md:flex-grow-0 max-w-full">
          <button
            className={`block btn btn-outline btn-primary w-full max-w-full truncate ${
              walletAddress.length > 0 ? 'lowercase' : ''
            }`}
            onClick={handleConnect}
          >
            {walletAddress || 'Connect Wallet'}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Nav
