import { useTranslation } from 'react-i18next'

import { DaoTabId } from '@dao-dao/types'

import { useDaoInfoContext } from '../../hooks'
import { useNavHelpers } from '../../hooks/useNavHelpers'
import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { PageHeaderContent } from '../layout'

export const ProposalNotFound = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  return (
    <>
      <PageHeaderContent title={t('title.proposalNotFound')} />

      <ErrorPage title={t('error.couldntFindProposal')}>
        <ButtonLink
          href={getDaoPath(coreAddress) + '/' + DaoTabId.Proposals}
          variant="secondary"
        >
          {t('button.viewProposals')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
