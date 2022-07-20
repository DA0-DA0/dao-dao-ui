import { useTranslation } from 'react-i18next'

import { ErrorPage } from '../ErrorPage'
import { LinkText } from '../LinkText'
import { Trans } from '../Trans'

export interface ProposalNotFoundProps {
  homeHref: string
  homeLabel?: string
}

export const ProposalNotFound = ({
  homeHref,
  homeLabel = "DAO's home page",
}: ProposalNotFoundProps) => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.proposalNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindProposal">
          We couldn&apos;t find a proposal with that ID. See all proposals on
          the{' '}
          <LinkText
            aProps={{ className: 'underline link-text' }}
            href={homeHref}
          >
            {homeLabel}
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}
