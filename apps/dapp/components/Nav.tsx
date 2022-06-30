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
import { SITE_TITLE, usePlatform } from '@dao-dao/utils'

import { searchVisibleAtom } from '@/atoms'
import { Loader, PinnedDAONavList } from '@/components'
import ThemeToggle from 'components/ThemeToggle'

type NavProps = {
  onMenuClick?: () => void
}

export const Nav: FC<NavProps> = ({ onMenuClick }) => {
  const { t } = useTranslation()
  const setSearchVisible = useSetRecoilState(searchVisibleAtom)
  const { isMac } = usePlatform()

  return (
    <>
      <nav className="sticky top-0 flex h-screen w-full flex-col justify-between border-r border-inactive p-6 text-lg">
        <div>
          <div className="flex items-center justify-between lg:justify-start">
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
            className="link-text mt-5 flex w-full items-center justify-between rounded-lg bg-primary p-2 hover:outline hover:outline-brand"
            onClick={() => setSearchVisible(true)}
          >
            <p className="flex items-center gap-2">
              <SearchIcon className="h-4 w-4" /> {t('title.search')}
            </p>
            <p className="text-secondary">{isMac ? '⌘' : '⌃'}K</p>
          </button>

          <div className="my-4 w-full">
            <ConnectWalletButton />
          </div>
          <div className="ml-1 text-sm">
            <div className="mt-6">
              <h3 className="caption-text mb-4 font-mono">
                {t('title.yourDAOs')}
              </h3>
              <SuspenseLoader
                fallback={<Loader className="ml-2 !justify-start" size={20} />}
              >
                <PinnedDAONavList />
              </SuspenseLoader>
            </div>
          </div>
        </div>
        <div className="ml-1">
          <h3 className="caption-text mb-2 font-mono">
            <Trans i18nKey="info.daodaoBetaV">
              dao dao <div className="inline text-error">beta</div> v
              {{ version: process.env.NEXT_PUBLIC_DAO_DAO_VERSION }}
            </Trans>
          </h3>
          <ul className="link-text list-none text-sm">
            <li className="mb-2">
              <ThemeToggle />
            </li>
            <li className="mb-2">
              <ExternalLinkIcon className="mr-2 inline h-5 w-5" />
              <a
                href="https://docs.daodao.zone"
                rel="noreferrer"
                target="_blank"
              >
                {t('title.documentation')}
              </a>
            </li>
            <li>
              <ExternalLinkIcon className="mr-2 inline h-5 w-5" />
              <a
                href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
                rel="noreferrer"
                target="_blank"
              >
                {t('title.feedback')}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
