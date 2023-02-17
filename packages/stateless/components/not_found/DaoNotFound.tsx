import { useTranslation } from 'react-i18next'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import {
  PageHeader,
  PageHeaderContent,
  useAppContextIfAvailable,
} from '../layout'

export const DaoNotFound = () => {
  const { t } = useTranslation()
  const appContext = useAppContextIfAvailable()

  // SDA does not have AppContext here, so if not available, just render
  // component directly. Otherwise use portal.
  const PageHeaderRenderer = appContext ? PageHeaderContent : PageHeader

  return (
    <>
      <PageHeaderRenderer title={t('title.daoNotFound')} />

      <ErrorPage title={t('error.couldntFindDAO')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
