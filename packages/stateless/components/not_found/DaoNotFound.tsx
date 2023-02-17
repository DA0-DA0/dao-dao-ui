import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { PageHeaderContent } from '../layout'

export const DaoNotFound = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeaderContent title={t('title.daoNotFound')} />

      <ErrorPage title={t('error.couldntFindDAO')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
