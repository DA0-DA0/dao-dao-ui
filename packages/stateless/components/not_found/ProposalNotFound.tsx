import { useTranslation } from 'react-i18next'

import { ContractVersion, DaoTabId } from '@dao-dao/types'
import { getGovPath } from '@dao-dao/utils'

import { useDaoInfoContext } from '../../hooks'
import { useDaoNavHelpers } from '../../hooks/useDaoNavHelpers'
import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { PageHeaderContent } from '../layout'

export const ProposalNotFound = () => {
  const { t } = useTranslation()
  const { coreVersion, coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  return (
    <>
      <PageHeaderContent title={t('title.proposalNotFound')} />

      <ErrorPage title={t('error.couldntFindProposal')}>
        <ButtonLink
          href={(coreVersion === ContractVersion.Gov ? getGovPath : getDaoPath)(
            coreAddress,
            DaoTabId.Proposals
          )}
          variant="secondary"
        >
          {t('button.viewProposals')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
