import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

import { Header } from '@/components'

const Custom500: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Header />

      {/* Only render page once mounted in browser (via SuspenseLoader) to
       * prevent hydration error. Server renders router.asPath as `/404`
       * but client renders router.asPath as the redirected/invalid
       * route.
       */}
      <SuspenseLoader fallback={null}>
        <ErrorPage title={t('title.500')}>
          <p>
            {t('error.internalServerError')}{' '}
            <Link href="/">
              <a className="link">{t('info.considerReturningHome')}</a>
            </Link>
          </p>
        </ErrorPage>
      </SuspenseLoader>
    </>
  )
}

export default Custom500

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
