import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

const Custom404: NextPage = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader fallback={null}>
      <ErrorPage title={t('404Title')}>
        <p>
          {t('pageNotFound')}{' '}
          <Link href="/">
            <a className="underline link-text">{t('considerReturningHome')}</a>
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
