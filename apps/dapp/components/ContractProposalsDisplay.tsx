import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { useVotingModule } from '@dao-dao/state'
import { Button, Tooltip, SuspenseLoader } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'

import { useOrgInfoContext } from './OrgPageWrapper'
import { ProposalList } from './proposals/ProposalList'

export const InnerContractProposalsDisplay: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const tooltip = isMember
    ? undefined
    : i18n.t('You must have voting power to create a proposal')

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">{i18n.t('Proposals')}</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={`/org/${coreAddress}/proposals/create`}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!isMember} size="sm">
                {i18n.t('Create a proposal')}
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

export const ContractProposalsDisplay: FC = () => (
  <SuspenseLoader
    fallback={
      <div className="flex justify-between items-center">
        <h2 className="primary-text">{i18n.t('Proposals')}</h2>
        <Loader />
      </div>
    }
  >
    <InnerContractProposalsDisplay />
  </SuspenseLoader>
)
