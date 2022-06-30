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
      'grid grid-cols-6 items-center rounded-lg bg-primary p-4 text-sm',
      className
    )}
  >
    <div className="col-span-2 flex flex-row flex-wrap items-center gap-4">
      <p className="caption-text font-mono"># {zeroPad(id, 6)}</p>
      <ProposalStatus status={proposal.status} />
    </div>
    <p className="link-text col-span-3 truncate">{proposal.title}</p>
    <p className="body-text truncate">
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
      'flex min-h-[150px] flex-col justify-between gap-2 rounded-lg bg-primary p-4 text-sm',
      className
    )}
  >
    <div className="flex flex-col gap-2">
      <ProposalStatus status={proposal.status} />
      <p className="body-text col-span-3 break-words">{proposal.title}</p>
    </div>
    <div className="flex flex-row gap-6">
      <p className="caption-text font-mono"># {zeroPad(id, 6)}</p>
      <p className="caption-text truncate">
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
