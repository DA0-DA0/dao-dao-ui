import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'

import { ErrorPage } from '../ErrorPage'
import { LinkText } from '../LinkText'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'

export interface ProposalNotFoundProps {
  homeHref: string
  homeLabel?: string
  Loader?: ComponentType<LoaderProps>
}

export const ProposalNotFound = ({
  homeHref,
  homeLabel = "DAO's home page",
  Loader = DefaultLoader,
}: ProposalNotFoundProps) => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.proposalNotFound')}>
      <p>
        <Trans Loader={Loader} i18nKey="error.couldntFindProposal">
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
