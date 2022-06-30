import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { getProposalEnd, zeroPad } from '@dao-dao/utils'

import { ProposalStatus } from '../ProposalStatus'

export interface ProposalLineProps {
  proposalResponse: ProposalResponse
  proposalViewUrl: string
  className?: string
}

// For viewing a proposal line on a wide screen.
const LargeProposalLine: FC<ProposalLineProps> = ({
  proposalResponse: { id, proposal },
  className,
}) => (
  <div
    className={clsx(
      'grid grid-cols-6 items-center p-4 text-sm bg-primary rounded-lg',
      className
    )}
  >
    <div className="flex flex-row flex-wrap col-span-2 gap-4 items-center">
      <p className="font-mono caption-text"># {zeroPad(id, 6)}</p>
      <ProposalStatus status={proposal.status} />
    </div>
    <p className="col-span-3 truncate link-text">{proposal.title}</p>
    <p className="truncate body-text">
      {getProposalEnd(proposal.expiration, proposal.status)}
    </p>
  </div>
)

// For viewing a proposal on a small screen.
const SmallProposalLine: FC<ProposalLineProps> = ({
  proposalResponse: { id, proposal },
  className,
}) => (
  <div
    className={clsx(
      'flex flex-col gap-2 justify-between p-4 min-h-[150px] text-sm bg-primary rounded-lg',
      className
    )}
  >
    <div className="flex flex-col gap-2">
      <ProposalStatus status={proposal.status} />
      <p className="col-span-3 break-words body-text">{proposal.title}</p>
    </div>
    <div className="flex flex-row gap-6">
      <p className="font-mono caption-text"># {zeroPad(id, 6)}</p>
      <p className="truncate caption-text">
        {getProposalEnd(proposal.expiration, proposal.status)}
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
