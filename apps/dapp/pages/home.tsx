// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'

import {
  FeaturedDAOsList,
  FeaturedDao,
  PinnedDAOsList,
  PinnedProposalsList,
  SmallScreenNav,
} from '@/components'

interface HomePageProps {
  featuredDaos: FeaturedDao[]
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
  const resp = await fetch(
    'https://dao-stats.withoutdoing.com/mainnet/featured_daos.json'
  )
  // These are returned as a timeseries in the form [{time, value}, ...].
  const featuredDaosOverTime = await resp.json()
  const featuredDaos =
    featuredDaosOverTime[featuredDaosOverTime.length - 1].value

  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
      featuredDaos,
    },
  }
}
