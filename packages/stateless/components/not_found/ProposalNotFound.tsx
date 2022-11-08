import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { ButtonLink } from '../buttons'
import { ErrorPage } from '../error/ErrorPage'
import { useAppLayoutContext } from '../layout/AppLayoutContext'

export interface ProposalNotFoundProps {
  homeHref: string
  homeLabel?: string
  Trans: ComponentType<TransProps>
}

export const ProposalNotFound = ({
  homeHref,
  homeLabel = "DAO's home page",
  Trans,
}: ProposalNotFoundProps) => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()

  return (
    <>
      <PageHeader title={t('title.proposalNotFound')} />

      <ErrorPage>
        <p>
          <Trans i18nKey="error.couldntFindProposal">
            We couldn&apos;t find a proposal with that ID. See all proposals on
            the{' '}
            <ButtonLink
              className="link-text"
              href={homeHref}
              variant="underline"
            >
              {homeLabel}
            </ButtonLink>
            .
          </Trans>
        </p>
      </ErrorPage>
    </>
  )
}
