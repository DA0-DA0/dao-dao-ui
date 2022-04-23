import { Open, Passed, Rejected } from '@dao-dao/icons'
import { pad } from '@dao-dao/utils/string'
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

import { ProposalStatus, ProposalVote } from '@/types/proposals'

export interface ProposalItemType {
  id: number
  status: ProposalStatus
  name: string
  description: string
  vote?: ProposalVote
  votedYesPercent: number
  votedNoPercent: number
  endDate: string
}

export interface ProposalItemProps {
  data: ProposalItemType
}

export function ProposalItem({ data }: ProposalItemProps) {
  const Icon = ICON_MAP[data.status]
  return (
    <div
      className={clsx(
        'bg-gray-500/10 hover:bg-gray-500/20 rounded',
        'grid gap-x-4 items-center',
        'grid-cols-[auto_12ch_16ch_1fr_12ch_6ch_6ch_12ch]',
        'py-3 px-4 text-xs sm:text-sm'
      )}
    >
      {/* auto */}
      <div className="font-mono text-secondary"># {pad(data.id, 6)}</div>
      {/* 12ch */}
      <div
        className={clsx('flex items-center space-x-2', {
          'text-green-500': data.status == ProposalStatus.Approved,
          'text-red-500': data.status == ProposalStatus.Rejected,
        })}
      >
        <Icon className="w-4 h-4 fill-current" /> <span>{data.status}</span>
      </div>
      {/* 1fr */}
      <div className="truncate">{data.name}</div>
      {/* 2fr */}
      <div className="text-secondary truncate">{data.description}</div>
      {/*  */}
      <div>{VOTE_MAP[data.vote ?? ProposalVote.Abstain]}</div>
      <div className="flex items-center space-x-2 text-green-500">
        <span>{data.votedYesPercent}%</span>{' '}
        <CheckIcon className="w-4 h-4 fill-current" />
      </div>
      <div className="flex items-center space-x-2 text-red-500">
        <span>{data.votedNoPercent}%</span>{' '}
        <XIcon className="w-4 h-4 fill-current" />
      </div>
      <div>{data.endDate}</div>
    </div>
  )
}

const ICON_MAP = {
  [ProposalStatus.Open]: Open,
  [ProposalStatus.Passed]: Passed,
  [ProposalStatus.Approved]: Passed,
  [ProposalStatus.Rejected]: Rejected,
} as const

const VOTE_MAP = {
  [ProposalVote.Undecided]: 'Not voted',
  [ProposalVote.Yes]: 'Voted yes',
  [ProposalVote.No]: 'Voted no',
  [ProposalVote.Abstain]: 'Voted abstain',
} as const
