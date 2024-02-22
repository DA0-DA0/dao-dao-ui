// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { CreateDaoForm, SuspenseLoader } from '@dao-dao/stateful'
import { PageLoader } from '@dao-dao/stateless'
import {
  CREATE_PAGE_DESCRIPTION,
  CREATE_PAGE_TITLE,
  SITE_URL,
} from '@dao-dao/utils'

const CreateDaoPage: NextPage = () => (
  <>
    <NextSeo
      description={CREATE_PAGE_DESCRIPTION}
      openGraph={{
        url: SITE_URL + '/dao/create',
        title: CREATE_PAGE_TITLE,
        description: CREATE_PAGE_DESCRIPTION,
      }}
      title={CREATE_PAGE_TITLE}
    />

    {/* Prevent hydration errors due to localStorage form stuff. */}
    <SuspenseLoader fallback={<PageLoader />}>
      <CreateDaoForm />
    </SuspenseLoader>
  </>
)

export default CreateDaoPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
