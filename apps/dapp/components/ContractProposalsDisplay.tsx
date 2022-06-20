import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { useVotingModule } from '@dao-dao/state'
import { Button, Loader, SuspenseLoader, Tooltip } from '@dao-dao/ui'

import { useDAOInfoContext } from './DAOPageWrapper'
import { ProposalList } from './proposals/ProposalList'

export const InnerContractProposalsDisplay: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const tooltip = isMember
    ? undefined
    : t('You must have voting power to create a proposal')

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">{t('Proposals')}</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={`/dao/${coreAddress}/proposals/create`}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!isMember} size="sm">
                {t('createAProposal')}
              </Button>
            </Tooltip>
          </a>
        </Link>
      </div>
      <div className="mt-4 mb-8 md:px-4">
        <SuspenseLoader fallback={<Loader />}>
          <ProposalList />
        </SuspenseLoader>
      </div>
    </>
  )
}

export const ContractProposalsDisplay: FC = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <div className="flex justify-between items-center">
          <h2 className="primary-text">{t('Proposals')}</h2>
          <Loader />
        </div>
      }
    >
      <InnerContractProposalsDisplay />
    </SuspenseLoader>
  )
}
