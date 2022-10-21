// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage } from '@dao-dao/stateless'

const Custom404: NextPage = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader fallback={null}>
      <ErrorPage title={t('title.404')}>
        <p>
          {t('error.pageNotFound')}{' '}
          <Link href="/">
            <a className="link-text underline">
              {t('info.considerReturningHome')}
            </a>
          </Link>
        </p>
      </ErrorPage>
    </SuspenseLoader>
  )
}

export default Custom404

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
