import { StarIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'

import { LoadingScreen } from '@dao-dao/ui'

import { pinnedDaosAtom, pinnedMultisigsAtom } from '@/atoms/pinned'
import { EmptyDaoCard } from '@/components/EmptyDaoCard'
import { EmptyMultisigCard } from '@/components/EmptyMultisigCard'
import {
  ActionMenu,
  PinnedDaoCard,
  PinnedMultisigCard,
} from '@/components/starred'
import { SuspenseLoader } from '@/components/SuspenseLoader'

const InnerStarred: NextPage = () => {
  const pinnedDaos = useRecoilValue(pinnedDaosAtom)
  const pinnedMultisigs = useRecoilValue(pinnedMultisigsAtom)

  return (
    <div className="flex">
      <div className="p-6 w-full lg:basis-2/3">
        <div className="block mb-4 lg:hidden">
          <ActionMenu />
        </div>

        <h1 className="header-text">Starred</h1>
        <h2 className="flex gap-1 items-center mt-4 mb-2 md:mt-6 primary-text">
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

      <div className="hidden basis-1/3 p-6 mb-4 min-h-screen border-l border-inactive lg:block">
        <ActionMenu />
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
