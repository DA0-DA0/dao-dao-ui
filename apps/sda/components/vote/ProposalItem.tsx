import clsx from 'clsx'
import Link from 'next/link'

import { useProposalInfo } from '@dao-dao/state'
import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import { VoteDisplay } from '@dao-dao/ui/components/ProposalDetails/VoteDisplay'
import { StatusIcons } from '@dao-dao/ui/components/StatusIcons'
import { getProposalEnd, pad, titlecase } from '@dao-dao/utils'

import { DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

interface ProposalItemProps {
  proposalResponse: ProposalResponse
  old?: boolean
}

export const ProposalItem = ({
  proposalResponse: { id, proposal },
  old,
}: ProposalItemProps) => {
  const { voteResponse } = useProposalInfo(DAO_ADDRESS, id, {
    oldProposalsAddress: OLD_PROPOSALS_ADDRESS,
  })

  const StatusIcon = StatusIcons[proposal.status]

  return (
    <Link href={`/vote/${id}${old ? '?old=true' : ''}`}>
      <a
        className={clsx(
          'block overflow-hidden rounded',
          'grid grid-cols-2 grid-rows-2 gap-2 items-center',
          'sm:grid-cols-[10ch_12ch_1fr_12ch_12ch] sm:grid-rows-1 sm:justify-start',
          'p-4 text-sm',
          {
            'bg-card': proposal.status === Status.Open,
            'bg-disabled': proposal.status !== Status.Open,
          },
          'hover:bg-secondary'
        )}
      >
        <div className="font-mono text-left text-secondary"># {pad(id, 6)}</div>
        <div
          className={clsx(
            'flex flex-row gap-x-2 justify-center justify-self-end items-center sm:justify-start sm:justify-self-auto',
            {
              'text-valid': proposal.status == Status.Passed,
              'text-error': proposal.status == Status.Rejected,
            }
          )}
        >
          {StatusIcon && <StatusIcon className="w-4 h-4" />}{' '}
          <span>{titlecase(proposal.status)}</span>
        </div>
        <div className="truncate overflow-ellipsis">{proposal.title}</div>
        {voteResponse?.vote ? (
          <VoteDisplay
            className="hidden justify-center sm:block sm:justify-end"
            vote={voteResponse.vote.vote}
          />
        ) : (
          <div className="hidden sm:block"></div>
        )}
        <p className="text-right">
          {getProposalEnd(proposal.expiration, proposal.status)}
        </p>
      </a>
    </Link>
  )
}
