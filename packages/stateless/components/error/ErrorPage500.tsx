import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { PageHeaderProps } from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { ErrorPage } from './ErrorPage'

export interface ErrorPage500Props {
  error: string
  PageHeaderContent: ComponentType<PageHeaderProps>
}

export const ErrorPage500 = ({
  error,
  PageHeaderContent,
}: ErrorPage500Props) => {
  const { t } = useTranslation()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <PageHeaderContent forceCenter title={t('title.500')} />

      <ErrorPage error={error} title={t('error.errorOccurredOnPage')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
