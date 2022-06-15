import { PlusIcon, SparklesIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import i18n from '@dao-dao/i18n'
import { Button, LoadingScreen, SuspenseLoader } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms'
import { FeaturedCard, PinnedDAOCard, SmallScreenNav } from '@/components'
import { featuredDaos } from '@/util'

const InnerStarred: FC = () => {
  const pinnedDaos = useRecoilValue(pinnedAddressesAtom)

  return (
    <>
      <SmallScreenNav />

      <div className="px-2 md:py-6 md:px-6">
        {pinnedDaos.length > 0 && (
          <div className="mb-6">
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <SparklesIcon className="inline w-4 " />
                {i18n.t('DAOs')}
              </div>
              <Link href="/dao/create" passHref>
                <Button size="sm">
                  <PlusIcon className="w-4 h-4" /> Create a DAO
                </Button>
              </Link>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
              {pinnedDaos.map((address) => (
                <PinnedDAOCard key={address} address={address} />
              ))}
            </div>
          </div>
        )}
        <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
          <div className="flex gap-1 items-center">
            <SparklesIcon className="inline w-4 " />
            Featured DAOs
          </div>
          {pinnedDaos.length === 0 && (
            <Link href="/dao/create" passHref>
              <Button size="sm">
                <PlusIcon className="w-4 h-4" /> Create a DAO
              </Button>
            </Link>
          )}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
          {featuredDaos.map((props) => (
            <FeaturedCard {...props} key={props.name} />
          ))}
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
