import { useTranslation } from 'react-i18next'

import { ErrorPage, LinkText, Trans } from '@dao-dao/ui'

import { useDAOInfoContext } from '../DAOPageWrapper'

export const DAONotFound = () => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.daoNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindDAO">
          We couldn&apos;t find a DAO with that address. Search DAOs on the{' '}
          <LinkText aProps={{ className: 'underline link-text' }} href="/home">
            home page
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}

export const ProposalNotFound = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()

  return (
    <ErrorPage title={t('error.proposalNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindProposal">
          We couldn&apos;t find a proposal with that ID. See all proposals on
          the{' '}
          <LinkText
            aProps={{ className: 'underline link-text' }}
            href={`/dao/${coreAddress}`}
          >
            DAO&apos;s home page
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}
