import Link from 'next/link'
import { FC } from 'react'

import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { getProposalEnd, zeroPad } from '@dao-dao/utils'

import { ProposalStatus } from '../ProposalStatus'
import clsx from 'clsx'

export interface ProposalLineProps {
  proposal: ProposalResponse
  proposalViewUrl: string
  className?: string
}

// For viewing a proposal line on a wide screen.
const LargeProposalLine: FC<ProposalLineProps> = ({ proposal, className }) => (
  <div
    className={clsx(
      'grid grid-cols-6 items-center p-4 my-1 text-sm bg-primary rounded-lg',
      className
    )}
  >
    <div className="flex flex-row flex-wrap col-span-2 gap-4 items-center">
      <p className="font-mono caption-text"># {zeroPad(proposal.id, 6)}</p>
      <ProposalStatus
        status={proposal.status === 'pending' ? Status.Open : proposal.status}
      />
    </div>
    <p className="col-span-3 truncate link-text">{proposal.title}</p>
    <p className="truncate body-text">
      {getProposalEnd(
        proposal.expires,
        proposal.status === 'pending' ? Status.Open : proposal.status
      )}
    </p>
  </div>
)

// For viewing a proposal on a small screen.
const SmallProposalLine: FC<ProposalLineProps> = ({ proposal, className }) => (
  <div
    className={clsx(
      'text-sm bg-primary flex flex-col gap-2 justify-between rounded-lg p-4 my-2 min-h-[150px]',
      className
    )}
  >
    <div className="flex flex-col gap-2">
      <ProposalStatus
        status={proposal.status === 'pending' ? Status.Open : proposal.status}
      />
      <p className="col-span-3 break-words body-text">{proposal.title}</p>
    </div>
    <div className="flex flex-row gap-6">
      <p className="font-mono caption-text"># {zeroPad(proposal.id, 6)}</p>
      <p className="truncate caption-text">
        {getProposalEnd(
          proposal.expires,
          proposal.status === 'pending' ? Status.Open : proposal.status
        )}
      </p>
    </div>
  </div>
)

export const ProposalLine: FC<ProposalLineProps> = (props) => (
  <Link href={props.proposalViewUrl}>
    <a>
      <LargeProposalLine {...props} className="hidden md:grid" />
      <SmallProposalLine {...props} className="block md:hidden" />
    </a>
  </Link>
)
