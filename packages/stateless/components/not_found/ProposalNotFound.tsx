import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoTabId, PageHeaderProps } from '@dao-dao/types'

import { useDao } from '../../contexts'
import { useDaoNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'

export type ProposalNotFoundProps = {
  PageHeaderContent: ComponentType<PageHeaderProps>
}

export const ProposalNotFound = ({
  PageHeaderContent,
}: ProposalNotFoundProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDao()
  const { getDaoPath } = useDaoNavHelpers()

  return (
    <>
      <PageHeaderContent title={t('title.proposalNotFound')} />

      <ErrorPage title={t('error.couldntFindProposal')}>
        <ButtonLink
          href={getDaoPath(coreAddress, DaoTabId.Proposals)}
          variant="secondary"
        >
          {t('button.viewProposals')}
        </ButtonLink>
      </ErrorPage>
    </>
  )
}
