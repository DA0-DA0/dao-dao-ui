import clsx from 'clsx'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalIdDisplay } from '@dao-dao/ui'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BaseProposalLineProps } from '../../../../types'
import { useProposalExpirationString } from '../../hooks'
import { ProposalStatus } from '../ProposalStatus'

export const ProposalLineMobile = ({ className }: BaseProposalLineProps) => {
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
  const msSinceUpdated = new Date().getTime() - (new Date(Number(proposal.last_updated) / 1000000).getTime());

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 justify-between p-4 min-h-[9.5rem] text-sm rounded-lg bg-primary hover:bg-secondary',
        {
          'bg-purple-300/30': msSinceUpdated < 24 * 60 * 60 * 1000,
          'bg-card': proposal.status === Status.Open,
          'bg-disabled': proposal.status !== Status.Open,
        },
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <ProposalStatus status={proposal.status} />
        <p className="col-span-3 break-words body-text">{proposal.title}</p>
      </div>
      <div className="flex flex-row gap-6">
        <p className="font-mono caption-text">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>
        <p className="text-right truncate caption-text">{expirationString}</p>
      </div>
    </div>
  )
}
