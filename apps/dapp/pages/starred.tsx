import { StarIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import i18n from '@dao-dao/i18n'
import { LoadingScreen, SuspenseLoader } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms'
import {
  ActionMenu,
  EmptyDAOCard,
  PinnedDAOCard,
  SmallScreenNav,
} from '@/components'

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

          <h1 className="header-text">{i18n.t('Home page')} </h1>
          <h2 className="flex gap-1 items-center mt-4 mb-2 md:mt-6 primary-text">
            <StarIcon className="inline w-4 " />
            {i18n.t('DAOs')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedAddresses.length ? (
              pinnedAddresses.map((address) => (
                <PinnedDAOCard key={address} address={address} />
              ))
            ) : (
              <EmptyDAOCard />
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
