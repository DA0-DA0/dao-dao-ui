import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLink } from '@dao-dao/stateful'

import { useAppLayoutContextIfAvailable } from '../layout/AppLayoutContext'
import { ErrorPage } from './ErrorPage'

export interface ErrorPage500Props {
  error: string
}

export const ErrorPage500 = ({ error }: ErrorPage500Props) => {
  const { t } = useTranslation()
  const PageHeader = useAppLayoutContextIfAvailable()?.PageHeader

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      {/* SDP does not have AppLayoutContext here. */}
      {PageHeader && <PageHeader title={t('title.500')} />}

      <ErrorPage>
        <p className="title-text">{t('error.errorOccurredOnPage')}</p>

        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>

        <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
          {error}
        </pre>
      </ErrorPage>
    </>
  )
}
