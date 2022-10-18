// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

import { CreateDaoForm, SuspenseLoader } from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { PageLoader } from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

const CreateDaoPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        description={t('info.createADaoDescription')}
        openGraph={{
          url: SITE_URL + '/dao/create',
          title: t('title.createADAO'),
          description: t('info.createADaoDescription'),
        }}
        title={t('title.createADAO')}
      />

      {/* Prevent hydration errors due to localStorage form stuff. */}
      <SuspenseLoader fallback={<PageLoader />}>
        <CreateDaoForm />
      </SuspenseLoader>
    </>
  )
}

export default CreateDaoPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
