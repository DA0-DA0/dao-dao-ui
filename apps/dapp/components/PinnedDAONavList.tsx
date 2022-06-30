import { LibraryIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { CwCoreSelectors } from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { Logo } from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

import { pinnedAddressesAtom } from '@/atoms'
import { NavListItem } from '@/components'

export const PinnedDAONavList: FC = () => {
  const { t } = useTranslation()
  const pinnedAddresses = useRecoilValue(pinnedAddressesAtom)
  const daoConfigs = useRecoilValue(
    waitForAll(
      pinnedAddresses.map((a) =>
        CwCoreSelectors.configSelector({ contractAddress: a })
      )
    )
  )
  const daosWithAddresses = daoConfigs
    .map((config, idx) => ({
      config,
      address: pinnedAddresses[idx],
    }))
    .filter((o) => o.config) as {
    config: ConfigResponse
    address: string
  }[]

  return (
    <ul className="ml-2 list-none">
      {daosWithAddresses.length > 0 &&
        daosWithAddresses.map(({ config, address }) => (
          <NavListItem
            key={address}
            href={`/dao/${address}`}
            icon={LibraryIcon}
            text={config.name}
          />
        ))}
      <Link href="/dao/create">
        <a className="link-text mt-2 flex items-center gap-2 hover:underline">
          <PlusIcon className="h-5 w-5" /> {t('button.create')}
        </a>
      </Link>
    </ul>
  )
}

export const MobilePinnedDAONavList: FC = () => {
  const { t } = useTranslation()
  const pinnedAddresses = useRecoilValue(pinnedAddressesAtom)
  const daoConfigs = useRecoilValue(
    waitForAll(
      pinnedAddresses.map((a) =>
        CwCoreSelectors.configSelector({ contractAddress: a })
      )
    )
  )
  const daosWithAddresses = daoConfigs
    .map((config, idx) => ({
      config,
      address: pinnedAddresses[idx],
    }))
    .filter((o) => o.config) as {
    config: ConfigResponse
    address: string
  }[]

  return (
    <ul className="no-scrollbar flex list-none gap-1 overflow-auto">
      {daosWithAddresses.map(({ config, address }) => (
        <Link key={address} href={`/dao/${address}`} passHref>
          <a
            className="flex min-w-[100px] max-w-[100px] flex-col items-center gap-3 rounded bg-tab-hover p-5 transition"
            style={{
              backgroundImage:
                'radial-gradient(#FF990033, #FFCC001A, transparent 80%)',
            }}
          >
            {!!config.image_url && HEADER_IMAGES_ENABLED ? (
              <div
                aria-label={t('info.daosLogo')}
                className="h-[50px] w-[50px] rounded-full bg-cover bg-center"
                role="img"
                style={{
                  backgroundImage: `url(${config.image_url})`,
                }}
              ></div>
            ) : (
              <Logo alt={t('info.daodaoLogo')} height={50} width={50} />
            )}
            <h2 className="button-text break-words text-center text-dark line-clamp-2">
              {config.name}
            </h2>
          </a>
        </Link>
      ))}
    </ul>
  )
}
