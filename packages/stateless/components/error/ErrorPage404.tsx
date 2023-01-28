import { useTranslation } from 'react-i18next'

import { SuspenseLoader } from '@dao-dao/stateful'
import { DaoPageMode } from '@dao-dao/types'

import { useNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { ErrorPage } from './ErrorPage'

export type ErrorPage404Props = {
  // The SDP 404 page renders outside the app layout context, so we cannot
  // access the mode from the nav helpers. This prop allows us to override the
  // mode for the 404 page so we can use the nav helpers below.
  overrideMode?: DaoPageMode
}

export const ErrorPage404 = ({ overrideMode }: ErrorPage404Props) => {
  const { t } = useTranslation()

  // If on a DAO page, return to DAO home instead of site home.
  const {
    getDaoPath,
    router: { asPath },
  } = useNavHelpers(overrideMode)
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
