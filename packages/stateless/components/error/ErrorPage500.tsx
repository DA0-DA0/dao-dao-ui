import Link from 'next/link'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppLayoutContext } from '../layout/AppLayoutContext'
import { ErrorPage } from './ErrorPage'

export interface ErrorPage500Props {
  error: string
}

export const ErrorPage500 = ({ error }: ErrorPage500Props) => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <PageHeader title={t('title.500')} />

      <ErrorPage>
        <p>
          {t('error.errorOccurredOnPage')}
          <br />
          <Link href="/home">
            <a className="underline hover:no-underline">
              {t('info.considerReturningHome')}
            </a>
          </Link>
        </p>

        <pre className="mt-6 whitespace-pre-wrap text-xs text-text-interactive-error">
          {error}
        </pre>
      </ErrorPage>
    </>
  )
}
