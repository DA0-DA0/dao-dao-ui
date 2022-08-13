import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorPage } from '../ErrorPage'
import { LinkText } from '../LinkText'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Trans } from '../Trans'

export interface DaoNotFoundProps {
  Loader?: ComponentType<LoaderProps>
}

export const DaoNotFound = ({ Loader = DefaultLoader }: DaoNotFoundProps) => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.daoNotFound')}>
      <p>
        <Trans Loader={Loader} i18nKey="error.couldntFindDAO">
          We couldn&apos;t find a DAO with that address. Search DAOs on the{' '}
          <LinkText aProps={{ className: 'underline link-text' }} href="/home">
            home page
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}
