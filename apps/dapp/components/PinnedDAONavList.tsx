import { LibraryIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { CwCoreSelectors } from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { Logo } from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

import { pinnedAddressesAtom } from '@/atoms'
import { NavListItem } from '@/components'

export const PinnedDAONavList: FC = () => {
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
      {daosWithAddresses.map(({ config, address }) => (
        <NavListItem
          key={address}
          href={`/dao/${address}`}
          icon={LibraryIcon}
          text={config.name}
        />
      ))}
    </ul>
  )
}

export const MobilePinnedDAONavList: FC = () => {
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
            {!!config.image_url && HEADER_IMAGES_ENABLED ? (
              <div
                aria-label="DAO's Custom Logo"
                className="w-[50px] h-[50px] bg-center bg-cover rounded-full"
                role="img"
                style={{
                  backgroundImage: `url(${config.image_url})`,
                }}
              ></div>
            ) : (
              <Logo alt={`${config.name} logo`} height={50} width={50} />
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
