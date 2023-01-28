import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/stateful'

import { ButtonLink } from '../buttons'
import { ErrorPage } from './ErrorPage'

export const ErrorPage404 = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader fallback={null}>
      <ErrorPage title={t('title.404')}>
        <ButtonLink href="/" variant="secondary">
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </SuspenseLoader>
  )
}
