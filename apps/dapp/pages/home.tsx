// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { DaoCardInfo } from '@dao-dao/ui'
import {
  CI,
  FEATURED_DAOS_CACHE_SECONDS,
  FEATURED_DAOS_URL,
} from '@dao-dao/utils'

import {
  FeaturedDAOsList,
  PinnedDAOsList,
  PinnedProposalsList,
  SmallScreenNav,
} from '@/components'

interface HomePageProps {
  featuredDaos: DaoCardInfo[]
}

const HomePage: NextPage<HomePageProps> = ({ featuredDaos }) => (
  <>
    <SmallScreenNav />

    <div className="p-4 space-y-6 max-w-6xl md:p-6">
      <PinnedProposalsList />
      <PinnedDAOsList />
      <FeaturedDAOsList featuredDaos={featuredDaos} />
    </div>
  </>
)

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const featuredDaos: DaoCardInfo[] = []
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
      featuredDaos,
    },
    revalidate: FEATURED_DAOS_CACHE_SECONDS,
  }
}
