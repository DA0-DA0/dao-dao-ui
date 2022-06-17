import {
  ExternalLinkIcon,
  MenuIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'

import { ConnectWalletButton } from '@dao-dao/common'
import i18n from '@dao-dao/i18n'
import { Logo, SuspenseLoader } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'

import ThemeToggle from 'components/ThemeToggle'

import { Loader, PinnedDAONavList, SearchModal } from '@/components'

type NavProps = {
  onMenuClick?: () => void
}

export const Nav: FC<NavProps> = ({ onMenuClick }) => {
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()

  // Hide modal when we nav away.
  useEffect(() => {
    setShowSearch(false)
  }, [router.asPath, setShowSearch])

  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [setIsMac])

  const handleKeyPress = useCallback(
    (event) => {
      if ((!isMac && event.ctrlKey) || event.metaKey) {
        if (event.key === 'k') {
          setShowSearch((showSearch) => !showSearch)
        }
      }
    },
    [isMac]
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <>
      <nav className="flex sticky top-0 flex-col justify-between p-6 w-full h-screen text-lg border-r border-inactive">
        <div>
          <div className="flex justify-between items-center lg:justify-start">
            <Link href="/home">
              <a>
                <Logo alt={`${SITE_TITLE} Logo`} height={28} width={28} />
              </a>
            </Link>
            <div className="cursor-pointer lg:hidden" onClick={onMenuClick}>
              <MenuIcon className="w-8" />
            </div>
          </div>
          <button
            className="flex justify-between items-center p-2 mt-5 w-full bg-primary rounded-lg hover:outline-brand hover:outline link-text"
            onClick={() => setShowSearch(true)}
          >
            <p className="flex gap-2 items-center">
              <SearchIcon className="w-4 h-4" /> Search
            </p>
            <p className="text-secondary">{isMac ? '⌘' : '⌃'}K</p>
          </button>

          <div className="my-4 w-full">
            <ConnectWalletButton />
          </div>
          <div className="ml-1 text-sm">
            <div className="mt-6">
              <h3 className="mb-4 font-mono caption-text">Your DAOs</h3>
              <SuspenseLoader
                fallback={<Loader className="!justify-start ml-2" size={20} />}
              >
                <PinnedDAONavList />
              </SuspenseLoader>
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
              <a
                href="https://docs.daodao.zone"
                rel="noreferrer"
                target="_blank"
              >
                {i18n.t('Documentation')}
              </a>
            </li>
            <li>
              <ExternalLinkIcon className="inline mr-2 w-5 h-5" />
              <a
                href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
                rel="noreferrer"
                target="_blank"
              >
                {i18n.t('Feedback')}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  )
}
