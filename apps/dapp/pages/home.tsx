// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { pinnedDaoCardInfoAtom, usePinnedDaos } from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/tstypes'
import { Home, ProfileHomeDisconnectedCard } from '@dao-dao/ui'
import {
  FEATURED_DAOS_CACHE_SECONDS,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { ProfileHomeCard } from '@/components'
import { getFeaturedDaos } from '@/server'

interface HomePageProps {
  featuredDaos: DaoCardInfo[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredDaos }) => {
  const { connected, address: walletAddress } = useWallet()

  const { isPinned: isDaoPinned, setPinned, setUnpinned } = usePinnedDaos()
  const pinnedDaosLoadable = useRecoilValueLoadable(
    pinnedDaoCardInfoAtom({ walletAddress, daoUrlPrefix: `/dao/` })
  )

  //! Loadable errors.
  useEffect(() => {
    if (pinnedDaosLoadable.state === 'hasError') {
      console.error(pinnedDaosLoadable.contents)
    }
  }, [pinnedDaosLoadable.contents, pinnedDaosLoadable.state])

  return (
    <Home
      featuredDaos={featuredDaos}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileHomeDisconnectedCard />
      }
      {...(connected
        ? {
            connected,
            pinnedDaos: loadableToLoadingData(pinnedDaosLoadable, []),
            isDaoPinned,
            onPin: (coreAddress) =>
              isDaoPinned(coreAddress)
                ? setUnpinned(coreAddress)
                : setPinned(coreAddress),
          }
        : {
            connected,
          })}
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
    featuredDaos: await getFeaturedDaos(),
    revalidate: FEATURED_DAOS_CACHE_SECONDS,
  },
})
