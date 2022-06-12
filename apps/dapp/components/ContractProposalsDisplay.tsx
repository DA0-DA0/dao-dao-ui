import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { useVotingModule } from '@dao-dao/state'
import { Button, Loader, SuspenseLoader, Tooltip } from '@dao-dao/ui'

import { useOrgInfoContext } from './OrgPageWrapper'
import { ProposalList } from './proposals/ProposalList'

export const InnerContractProposalsDisplay: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const { isMember } = useVotingModule(coreAddress)

  const tooltip = isMember
    ? undefined
    : 'You must have voting power to create a proposal. Consider staking some tokens.'

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={`/org/${coreAddress}/proposals/create`}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!isMember} size="sm">
                New proposal
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
        <h2 className="primary-text">Proposals</h2>
        <Loader />
      </div>
    }
  >
    <InnerContractProposalsDisplay />
  </SuspenseLoader>
)
