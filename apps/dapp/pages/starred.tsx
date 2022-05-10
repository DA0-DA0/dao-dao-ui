import { MapIcon, PlusIcon, StarIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'

import { LoadingScreen } from '@dao-dao/ui'

import { pinnedDaosAtom, pinnedMultisigsAtom } from '@/atoms/pinned'
import { EmptyDaoCard } from '@/components/EmptyDaoCard'
import { EmptyMultisigCard } from '@/components/EmptyMultisigCard'
import { PinnedDaoCard, PinnedMultisigCard } from '@/components/starred'
import { SuspenseLoader } from '@/components/SuspenseLoader'

const InnerStarred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <h1 className="header-text">Starred</h1>
        <h2 className="flex gap-1 items-center mt-6 mb-2 primary-text">
          <StarIcon className="inline w-4 " />
          DAOs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {pinnedDaos.length ? (
            pinnedDaos.map((address) => (
              <PinnedDaoCard key={address} address={address} />
            ))
          ) : (
            <EmptyDaoCard />
          )}
        </div>
        <div className="mt-6">
          <h2 className="flex gap-1 items-center mt-6 mb-2 primary-text">
            <StarIcon className="inline w-4 " />
            Multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedMultisigs.length ? (
              pinnedMultisigs.map((address) => (
                <PinnedMultisigCard key={address} address={address} />
              ))
            ) : (
              <EmptyMultisigCard />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-5 p-6 min-h-screen">
        <h2 className="mb-6 text-[16px] font-semibold body-text">Actions</h2>
        <ul className="mt-1 ml-2 list-none link-text">
          <li className="mt-1">
            <Link href="/dao/create">
              <a>
                <PlusIcon className="inline mr-2 mb-1 w-5 h-5" />
                Create a DAO
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/create">
              <a>
                <PlusIcon className="inline mr-2 mb-1 w-5 h-5" />
                Create a multisig
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/dao/list">
              <a>
                <MapIcon className="inline mr-2 mb-1 w-5 h-5" />
                Explore all DAOs
              </a>
            </Link>
          </li>
          <li className="mt-1">
            <Link href="/multisig/list">
              <a>
                <MapIcon className="inline mr-2 mb-1 w-5 h-5" />
                Explore all multisigs
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

const StarredPage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerStarred />
  </SuspenseLoader>
)

export default StarredPage
