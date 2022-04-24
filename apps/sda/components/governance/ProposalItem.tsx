import Link from 'next/link'

import {
  ProposalResponse,
  Status,
  Vote,
} from '@dao-dao/state/clients/cw-proposal-single'
import { StatusIcons } from '@dao-dao/ui/components/StatusIcons'
import { getProposalEnd, pad } from '@dao-dao/utils'
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

interface ProposalItemProps {
  proposalResponse: ProposalResponse
  walletVote?: Vote
}

export const ProposalItem = ({
  proposalResponse: { id, proposal },
  walletVote,
}: ProposalItemProps) => {
  const StatusIcon = StatusIcons[proposal.status]

  return (
    <Link href={`/proposal/${id}`}>
      <a
        className={clsx(
          'block rounded',
          'grid gap-x-4 items-center',
          'grid-cols-[auto_12ch_16ch_12ch_6ch_6ch_12ch]',
          'py-3 px-4 text-xs sm:text-sm',
          {
            'bg-card': proposal.status === Status.Open,
            'bg-disabled': proposal.status !== Status.Open,
          },
          'hover:bg-secondary'
        )}
      >
        {/* auto */}
        <div className="font-mono text-secondary"># {pad(id, 6)}</div>
        {/* 12ch */}
        <div
          className={clsx('flex items-center space-x-2', {
            'text-valid': proposal.status == Status.Passed,
            'text-error': proposal.status == Status.Rejected,
          })}
        >
          {StatusIcon && <StatusIcon className="w-4 h-4" />}{' '}
          <span>{proposal.status}</span>
        </div>
        {/* 16ch */}
        <div className="truncate">{proposal.title}</div>
        {/* 12ch */}
        <div>{walletVote ? VOTE_MAP[walletVote] : 'Not voted'}</div>
        {/* 6ch */}
        <div className="flex items-center space-x-2 text-valid">
          <span>{proposal.votedYesPercent}%</span>{' '}
          <CheckIcon className="w-4 h-4 fill-current" />
        </div>
        {/* 6ch */}
        <div className="flex items-center space-x-2 text-error">
          <span>{proposal.votedNoPercent}%</span>{' '}
          <XIcon className="w-4 h-4 fill-current" />
        </div>
        {/* 12ch */}
        <div>{getProposalEnd(proposal.expiration, proposal.status)}</div>
      </a>
    </Link>
  )
}

const VOTE_MAP: Record<Vote, string> = {
  [Vote.Abstain]: 'Voted abstain',
  [Vote.Yes]: 'Voted yes',
  [Vote.No]: 'Voted no',
}
