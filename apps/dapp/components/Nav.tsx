import {
  ExternalLinkIcon,
  MenuIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useSetRecoilState } from 'recoil'

import { ConnectWalletButton } from '@dao-dao/common'
import { Trans, useTranslation } from '@dao-dao/i18n'
import { Logo, SuspenseLoader } from '@dao-dao/ui'
import { SITE_TITLE } from '@dao-dao/utils'

import ThemeToggle from 'components/ThemeToggle'

import { searchVisibleAtom } from '@/atoms'
import { Loader, PinnedDAONavList } from '@/components'
import { usePlatform } from '@/hooks'

type NavProps = {
  onMenuClick?: () => void
}

export const Nav: FC<NavProps> = ({ onMenuClick }) => {
  const { t } = useTranslation()
  const setSearchVisible = useSetRecoilState(searchVisibleAtom)
  const { isMac } = usePlatform()

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
            onClick={() => setSearchVisible(true)}
          >
            <p className="flex gap-2 items-center">
              <SearchIcon className="w-4 h-4" /> {t('search')}
            </p>
            <p className="text-secondary">{isMac ? '⌘' : '⌃'}K</p>
          </button>

          <div className="my-4 w-full">
            <ConnectWalletButton />
          </div>
          <div className="ml-1 text-sm">
            <div className="mt-6">
              <h3 className="mb-4 font-mono caption-text">{t('yourDAOs')}</h3>
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
            <Trans i18nKey="daodaoBetaV">
              dao dao <div className="inline text-error">beta</div> v
              {{ version: process.env.NEXT_PUBLIC_DAO_DAO_VERSION }}
            </Trans>
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
                {t('Documentation')}
              </a>
            </li>
            <li>
              <ExternalLinkIcon className="inline mr-2 w-5 h-5" />
              <a
                href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
                rel="noreferrer"
                target="_blank"
              >
                {t('Feedback')}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
