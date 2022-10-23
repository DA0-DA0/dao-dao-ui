import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { TransProps } from '@dao-dao/types'

import { ErrorPage } from '../ErrorPage'
import { useAppLayoutContext } from '../layout/AppLayoutContext'
import { LinkText } from '../LinkText'
import { Loader as DefaultLoader, LoaderProps } from '../Loader'

export interface ProposalNotFoundProps {
  homeHref: string
  homeLabel?: string
  Trans: ComponentType<TransProps>
  Loader?: ComponentType<LoaderProps>
}

export const ProposalNotFound = ({
  homeHref,
  homeLabel = "DAO's home page",
  Trans,
  Loader = DefaultLoader,
}: ProposalNotFoundProps) => {
  const { t } = useTranslation()
  const { PageHeader } = useAppLayoutContext()

  return (
    <>
      <PageHeader title={t('title.proposalNotFound')} />

      <ErrorPage>
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
    </>
  )
}
