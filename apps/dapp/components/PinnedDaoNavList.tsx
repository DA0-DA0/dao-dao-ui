import { LibraryIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { Logo } from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

import { NavListItem } from './NavListItem'
import { pinnedDaosAtom } from '@/atoms/pinned'
import { daoSelector } from '@/selectors/daos'

export const PinnedDaoNavList: FC = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const daos = useRecoilValue(waitForAll(pinnedDaos.map((a) => daoSelector(a))))
  const daoAddresses = daos.map((d, idx) => ({
    dao: d,
    address: pinnedDaos[idx],
  }))

  return (
    <ul className="ml-2 list-none">
      {daoAddresses.map(({ dao, address }) => (
        <NavListItem
          key={address}
          href={`/dao/${address}`}
          icon={LibraryIcon}
          text={dao.config.name}
        />
      ))}
    </ul>
  )
}

export const MobilePinnedDaoNavList: FC = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const daos = useRecoilValue(waitForAll(pinnedDaos.map((a) => daoSelector(a))))
  const daoAddresses = daos.map((d, idx) => ({
    dao: d,
    address: pinnedDaos[idx],
  }))

  return (
    <ul className="flex overflow-auto gap-1 list-none no-scrollbar">
      {daoAddresses.map(({ dao, address }) => (
        <Link key={address} href={`/dao/${address}`} passHref>
          <a
            className="flex flex-col gap-3 items-center p-5 min-w-[100px] max-w-[100px] bg-tab-hover rounded transition"
            style={{
              backgroundImage:
                'radial-gradient(#FF990033, #FFCC001A, transparent 80%)',
            }}
          >
            {dao.config.image_url && HEADER_IMAGES_ENABLED ? (
              <div
                aria-label="DAO's Custom Logo"
                className="w-[50px] h-[50px] bg-center bg-cover rounded-full"
                role="img"
                style={{
                  backgroundImage: `url(${dao.config.image_url})`,
                }}
              ></div>
            ) : (
              <Logo alt={`${dao.config.name} logo`} height={50} width={50} />
            )}
            <h2 className="text-center text-dark line-clamp-2 button-text break-word">
              {dao.config.name}
            </h2>
          </a>
        </Link>
      ))}
    </ul>
  )
}
