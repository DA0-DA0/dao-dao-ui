// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  daoCardInfoSelector,
  getFeaturedDaoAddresses,
  pinnedDaoCardInfosSelector,
  useCachedLoadable,
} from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/tstypes'
import { Home, ProfileDisconnectedCard } from '@dao-dao/ui'
import {
  FEATURED_DAOS_CACHE_SECONDS,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { commandModalVisibleAtom } from '@/atoms'
import { DaoCard, ProfileHomeCard } from '@/components'

interface HomePageProps {
  featuredDaoAddresses: string[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredDaoAddresses }) => {
  const { connected } = useWallet()

  const setCommandModalVisible = useSetRecoilState(commandModalVisibleAtom)

  // TODO: Load the metadata from the DAOs indexer.
  const featuredDaosLoadable = useCachedLoadable(
    waitForAll(
      featuredDaoAddresses.map((coreAddress) =>
        daoCardInfoSelector({ coreAddress, daoUrlPrefix: '/dao/' })
      )
    )
  )
  const featuredDaosLoading = loadableToLoadingData(featuredDaosLoadable, [])
  const pinnedDaosLoadable = useCachedLoadable(
    pinnedDaoCardInfosSelector({ daoUrlPrefix: '/dao/' })
  )

  //! Loadable errors.
  useEffect(() => {
    if (featuredDaosLoadable.state === 'hasError') {
      console.error(featuredDaosLoadable.contents)
    }
    if (pinnedDaosLoadable.state === 'hasError') {
      console.error(pinnedDaosLoadable.contents)
    }
  }, [
    featuredDaosLoadable.contents,
    featuredDaosLoadable.state,
    pinnedDaosLoadable.contents,
    pinnedDaosLoadable.state,
  ])

  return (
    <Home
      connected={connected}
      featuredDaosProps={{
        DaoCard,
        featuredDaos: featuredDaosLoading.loading
          ? featuredDaosLoading
          : {
              ...featuredDaosLoading,
              data: featuredDaosLoading.data.filter(Boolean) as DaoCardInfo[],
            },
      }}
      pinnedDaosProps={{
        DaoCard,
        openSearch: () => setCommandModalVisible(true),
        pinnedDaos: loadableToLoadingData(pinnedDaosLoadable, []),
      }}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
    featuredDaoAddresses: await getFeaturedDaoAddresses(),
    revalidate: FEATURED_DAOS_CACHE_SECONDS,
  },
})
