import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

import { Header } from '@/components'

const Custom404: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Header />

      <SuspenseLoader fallback={null}>
        <ErrorPage title={t('title.404')}>
          <p>
            {t('error.pageNotFound')}{' '}
            <Link href="/">
              <a className="underline link-text">
                {t('info.considerReturningHome')}
              </a>
            </Link>
          </p>
        </ErrorPage>
      </SuspenseLoader>
    </>
  )
}

export default Custom404

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
