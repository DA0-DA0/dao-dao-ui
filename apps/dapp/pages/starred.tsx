import { StarIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { LoadingScreen } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms/pinned'
import { EmptyOrgCard } from '@/components/EmptyDaoCard'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { ActionMenu, PinnedOrgCard } from '@/components/starred'
import { SuspenseLoader } from '@/components/SuspenseLoader'

const InnerStarred: FC = () => {
  const pinnedAddresses = useRecoilValue(pinnedAddressesAtom)

  return (
    <>
      <SmallScreenNav />

      <div className="flex">
        <div className="py-3 px-6 md:py-6 lg:basis-2/3">
          <div className="block mb-4 lg:hidden">
            <ActionMenu />
          </div>

          <h1 className="header-text">Starred</h1>
          <h2 className="flex gap-1 items-center mt-4 mb-2 md:mt-6 primary-text">
            <StarIcon className="inline w-4 " />
            Orgs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedAddresses.length ? (
              pinnedAddresses.map((address) => (
                <PinnedOrgCard key={address} address={address} />
              ))
            ) : (
              <EmptyOrgCard />
            )}
          </div>
        </div>

        <div className="hidden p-6 lg:block lg:basis-1/3">
          <ActionMenu />
        </div>
      </div>
    </>
  )
}

const StarredPage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerStarred />
  </SuspenseLoader>
)

export default StarredPage
