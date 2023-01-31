import { useTranslation } from 'react-i18next'

import { DaoTabId } from '@dao-dao/types'

import { useDaoInfoContext } from '../../hooks'
import { useNavHelpers } from '../../hooks/useNavHelpers'
import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { useAppLayoutContext } from '../layout/AppLayoutContext'

export const ProposalNotFound = () => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  return (
    <>
      <PageHeader title={t('title.proposalNotFound')} />

      <ErrorPage title={t('error.couldntFindProposal')}>
        <ButtonLink
          href={getDaoPath(coreAddress) + '#' + DaoTabId.Proposals}
          variant="secondary"
        >
          {t('button.viewProposals')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
