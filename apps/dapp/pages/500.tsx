import type { NextPage } from 'next'
import Link from 'next/link'

import { useTranslation } from '@dao-dao/i18n'
import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

const Custom500: NextPage = () => {
  const { t } = useTranslation()

  return (
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
  )
}

export default Custom500
