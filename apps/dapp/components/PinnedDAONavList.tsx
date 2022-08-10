import { LibraryIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAll } from 'recoil'

import { CwCoreV0_1_0Selectors } from '@dao-dao/state'
import { Logo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms'
import { NavListItem } from '@/components'

export const PinnedDAONavList: FC = () => {
  const { t } = useTranslation()

  const pinnedAddresses = useRecoilValue(pinnedAddressesAtom)
  const daoConfigs = useRecoilValue(
    waitForAll(
      pinnedAddresses.map((a) =>
        CwCoreV0_1_0Selectors.configSelector({ contractAddress: a })
      )
    )
  )

  const daosWithAddresses = useMemo(
    () =>
      daoConfigs.map((config, idx) => ({
        config,
        address: pinnedAddresses[idx],
      })),
    [pinnedAddresses, daoConfigs]
  )

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
        <a className="flex gap-2 items-center mt-2 hover:underline link-text">
          <PlusIcon className="w-5 h-5" /> {t('button.create')}
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
        CwCoreV0_1_0Selectors.configSelector({ contractAddress: a })
      )
    )
  )

  const daosWithAddresses = useMemo(
    () =>
      daoConfigs.map((config, idx) => ({
        config,
        address: pinnedAddresses[idx],
      })),
    [pinnedAddresses, daoConfigs]
  )

  return (
    <ul className="flex overflow-auto gap-1 list-none no-scrollbar">
      {daosWithAddresses.map(({ config, address }) => (
        <Link key={address} href={`/dao/${address}`} passHref>
          <a
            className="flex flex-col gap-3 items-center p-5 min-w-[100px] max-w-[100px] bg-tab-hover rounded transition"
            style={{
              backgroundImage:
                'radial-gradient(#FF990033, #FFCC001A, transparent 80%)',
            }}
          >
            {!!config.image_url ? (
              <div
                aria-label={t('info.daosLogo')}
                className="w-[50px] h-[50px] bg-center bg-cover rounded-full"
                role="img"
                style={{
                  backgroundImage: `url(${config.image_url})`,
                }}
              ></div>
            ) : (
              <Logo size={50} />
            )}
            <h2 className="text-center text-dark break-words line-clamp-2 button-text">
              {config.name}
            </h2>
          </a>
        </Link>
      ))}
    </ul>
  )
}
