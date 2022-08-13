import Link from 'next/link'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorPage } from './ErrorPage'

export interface ErrorPage500Props {
  error: string
}

export const ErrorPage500 = ({ error }: ErrorPage500Props) => {
  const { t } = useTranslation()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorPage title={t('title.500')}>
      <p>
        {t('error.errorOccurredOnPage')}{' '}
        <Link href="/home">
          <a className="underline hover:no-underline">
            {t('info.considerReturningHome')}
          </a>
        </Link>
      </p>

      <pre className="mt-6 text-xs text-error whitespace-pre-wrap">{error}</pre>
    </ErrorPage>
  )
}
