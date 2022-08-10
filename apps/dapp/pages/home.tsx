// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'

import {
  FeaturedDAOsList,
  PinnedDAOsList,
  PinnedProposalsList,
  SmallScreenNav,
} from '@/components'

const HomePage: NextPage = () => (
  <>
    <SmallScreenNav />

    <div className="p-4 space-y-6 md:p-6">
      <PinnedProposalsList />
      <PinnedDAOsList />
      <FeaturedDAOsList />
    </div>
  </>
)

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
