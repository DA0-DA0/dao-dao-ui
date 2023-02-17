import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { useAppContextIfAvailable } from '../layout/AppContext'

export const DaoNotFound = () => {
  const { t } = useTranslation()
  const PageHeader = useAppContextIfAvailable()?.PageHeader

  return (
    <>
      {/* SDA does not have AppLayoutContext here. */}
      {PageHeader && <PageHeader title={t('title.daoNotFound')} />}

      <ErrorPage title={t('error.couldntFindDAO')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
