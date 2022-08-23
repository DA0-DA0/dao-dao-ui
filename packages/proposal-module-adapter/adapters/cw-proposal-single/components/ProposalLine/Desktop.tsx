import clsx from 'clsx'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalIdDisplay } from '@dao-dao/ui'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BaseProposalLineProps } from '../../../../types'
import { useProposalExpirationString } from '../../hooks'
import { ProposalStatus } from '../ProposalStatus'

export const ProposalLineDesktop = ({ className }: BaseProposalLineProps) => {
  const {
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const expirationString = useProposalExpirationString()

  return (
    <div
      className={clsx(
        'grid grid-cols-6 items-center p-4 text-sm rounded-lg transition bg-primary hover:bg-secondary',
        {
          'bg-purple-300/30': new Date(proposal.last_updated).getTime() >= new Date().getTime() - 24 * 60 * 60 * 1000,
          'bg-card': proposal.status === Status.Open,
          'bg-disabled': proposal.status !== Status.Open,
        },
        className
      )}
    >
      <div className="flex flex-row flex-wrap col-span-2 gap-4 items-center">
        <p className="font-mono caption-text">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>
        <ProposalStatus status={proposal.status} />
      </div>
      <p className="col-span-3 truncate link-text">{proposal.title}</p>
      <p className="text-right truncate body-text">{expirationString}</p>
      <p className="text-right truncate body-text">{proposal.last_updated}</p>
    </div>
  )
}
