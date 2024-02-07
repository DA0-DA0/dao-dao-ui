import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { PageHeaderProps } from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'

export type DaoNotFoundProps = {
  PageHeaderContent: ComponentType<PageHeaderProps>
}

export const DaoNotFound = ({ PageHeaderContent }: DaoNotFoundProps) => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeaderContent forceCenter title={t('title.daoNotFound')} />

      <ErrorPage title={t('error.couldntFindDAO')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
