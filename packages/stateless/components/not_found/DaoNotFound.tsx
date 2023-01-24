import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { useAppLayoutContext } from '../layout/AppLayoutContext'

export interface DaoNotFoundProps {
  Trans: ComponentType<TransProps>
}

export const DaoNotFound = ({ Trans }: DaoNotFoundProps) => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()

  return (
    <>
      <PageHeader title={t('title.daoNotFound')} />

      <ErrorPage>
        <p>
          <Trans i18nKey="error.couldntFindDAO">
            We couldn&apos;t find a DAO with that address. Search DAOs on the{' '}
            <ButtonLink className="link-text" href="/" variant="underline">
              home page
            </ButtonLink>
            .
          </Trans>
        </p>
      </ErrorPage>
    </>
  )
}
