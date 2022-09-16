// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'

import { CreateDaoForm, SuspenseLoader } from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Loader } from '@dao-dao/ui'

const CreateDaoPage: NextPage = () => (
  // Prevent hydration errors due to localStorage form stuff.
  <SuspenseLoader fallback={<Loader />}>
    <CreateDaoForm daoUrlPrefix="/dao/" />
  </SuspenseLoader>
)

export default CreateDaoPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
