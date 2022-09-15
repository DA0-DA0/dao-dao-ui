// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useRecoilValueLoadable } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { pinnedDaoCardInfoAtom } from '@dao-dao/state'
import { DaoCardInfo } from '@dao-dao/tstypes'
import {
  HomeConnected,
  HomeDisconnected,
  ProfileHomeDisconnectedCard,
} from '@dao-dao/ui'
import {
  CI,
  FEATURED_DAOS_CACHE_SECONDS,
  FEATURED_DAOS_URL,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { ProfileHomeCard } from '@/components'

interface HomePageProps {
  featuredDaos: DaoCardInfo[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredDaos }) => {
  const { connected } = useWallet()

  const pinnedDaosLoadable = useRecoilValueLoadable(
    pinnedDaoCardInfoAtom({ daoUrlPrefix: `/dao/` })
  )

  return connected ? (
    <HomeConnected
      featuredDaos={featuredDaos}
      pinnedDaos={loadableToLoadingData(pinnedDaosLoadable, [])}
      rightSidebarContent={<ProfileHomeCard />}
    />
  ) : (
    <HomeDisconnected
      featuredDaos={featuredDaos}
      rightSidebarContent={<ProfileHomeDisconnectedCard />}
    />
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}) => {
  const featuredDaos: {
    name: string
    description: string
    image: string
    href: string
    TVL: number
  }[] = []
  if (!CI) {
    const resp = await fetch(FEATURED_DAOS_URL)
    // These are returned as a timeseries in the form [{time, value}, ...].
    const featuredDaosOverTime = await resp.json()
    featuredDaos.push(
      ...featuredDaosOverTime[featuredDaosOverTime.length - 1].value
    )
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      featuredDaos: featuredDaos.map(
        ({ name, description, image, href, TVL }, index) => ({
          // TODO: Retrieve.
          coreAddress: index.toString(),
          name,
          description,
          imageUrl: image,
          href,
          tokenBalance: TVL,
          tokenSymbol: 'USDC',
          // TODO: Retrieve.
          proposalCount: 0,
          // TODO: Retrieve.
          // parentDao: {},
        })
      ),
    },
    revalidate: FEATURED_DAOS_CACHE_SECONDS,
  }
}
