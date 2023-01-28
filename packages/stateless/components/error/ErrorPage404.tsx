import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/stateful'

import { useNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { ErrorPage } from './ErrorPage'

export const ErrorPage404 = () => {
  const { t } = useTranslation()

  // If on a DAO page, return to DAO home instead of site home.
  const {
    getDaoPath,
    router: { asPath },
  } = useNavHelpers()
  // Get DAO address from path if exists.
  const coreAddress = asPath.startsWith(getDaoPath(''))
    ? asPath.replace(getDaoPath(''), '').split('/')[0]
    : null

  return (
    <SuspenseLoader fallback={null}>
      <ErrorPage title={t('title.404')}>
        <ButtonLink
          href={coreAddress ? getDaoPath(coreAddress) : '/'}
          variant="secondary"
        >
          {t('button.returnHome')}
        </ButtonLink>
      </ErrorPage>
    </SuspenseLoader>
  )
}
