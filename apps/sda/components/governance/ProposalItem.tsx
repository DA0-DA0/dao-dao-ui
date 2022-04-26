import Link from 'next/link'

import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import { VoteDisplay } from '@dao-dao/ui/components/ProposalDetails/v1/VoteDisplay'
import { StatusIcons } from '@dao-dao/ui/components/StatusIcons'
import { getProposalEnd, pad, titlecase } from '@dao-dao/utils'
import clsx from 'clsx'

import { useProposalInfo } from '@/hooks'

interface ProposalItemProps {
  proposalResponse: ProposalResponse
}

export const ProposalItem = ({
  proposalResponse: { id, proposal },
}: ProposalItemProps) => {
  const { voteResponse } = useProposalInfo(id)

  const StatusIcon = StatusIcons[proposal.status]

  return (
    <Link href={`/proposal/${id}`}>
      <a
        className={clsx(
          'block rounded',
          'grid gap-x-4 items-center',
          'grid-cols-[10ch_12ch_auto_12ch_12ch]',
          'py-3 px-4 text-xs sm:text-sm',
          {
            'bg-card': proposal.status === Status.Open,
            'bg-disabled': proposal.status !== Status.Open,
          },
          'hover:bg-secondary'
        )}
      >
        <div className="font-mono text-secondary"># {pad(id, 6)}</div>
        <div
          className={clsx('flex items-center space-x-2', {
            'text-valid': proposal.status == Status.Passed,
            'text-error': proposal.status == Status.Rejected,
          })}
        >
          {StatusIcon && <StatusIcon className="w-4 h-4" />}{' '}
          <span>{titlecase(proposal.status)}</span>
        </div>
        <div className="truncate overflow-ellipsis">{proposal.title}</div>
        {voteResponse?.vote ? (
          <VoteDisplay className="justify-end" vote={voteResponse.vote.vote} />
        ) : (
          <div></div>
        )}
        <p className="text-right">
          {getProposalEnd(proposal.expiration, proposal.status)}
        </p>
      </a>
    </Link>
  )
}
