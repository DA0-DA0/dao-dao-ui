// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Querier, SuspenseLoader } from '@dao-dao/stateful'
import { PageLoader } from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

const QuerierPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        description="Query any CosmWasm smart contract."
        openGraph={{
          url: SITE_URL + '/querier',
          title: t('title.querier'),
          description: 'Query any CosmWasm smart contract.',
        }}
        title={t('title.querier')}
      />

      <SuspenseLoader fallback={<PageLoader />}>
        <Querier />
      </SuspenseLoader>
    </>
  )
}

export default QuerierPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
