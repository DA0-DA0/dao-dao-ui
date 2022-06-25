import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

const Custom500: NextPage = () => {
  const { t } = useTranslation()

  return (
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
  )
}

export default Custom500

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
