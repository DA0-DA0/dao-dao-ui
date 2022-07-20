import { useTranslation } from 'react-i18next'

import { ErrorPage } from '../ErrorPage'
import { LinkText } from '../LinkText'
import { Trans } from '../Trans'

export const DaoNotFound = () => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.daoNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindDAO">
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
