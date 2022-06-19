import type { NextPage } from 'next'
import Link from 'next/link'

import { useTranslation } from '@dao-dao/i18n'
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
        <ErrorPage title={t('500Title')}>
          <p>
            {t('internalServerError')}{' '}
            <Link href="/">
              <a className="link">{t('considerReturningHome')}</a>
            </Link>
          </p>
        </ErrorPage>
      </SuspenseLoader>
    </>
  )
}

export default Custom500
