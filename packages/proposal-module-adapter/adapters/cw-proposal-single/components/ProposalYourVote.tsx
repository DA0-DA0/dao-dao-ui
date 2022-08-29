import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalYourVote as StatelessProposalYourVote } from '@dao-dao/ui'
import { convertToTitlecase } from '@dao-dao/utils'

export interface ProposalYourVoteProps {
  vote?: Vote
}

export const ProposalYourVote = ({ vote }: ProposalYourVoteProps) => {
  const key = vote ?? 'pending'
  const className = ProposalVoteClassNameMap[key]

  return (
    <StatelessProposalYourVote
      className={className}
      label={convertToTitlecase(key)}
      showBadge={key === 'pending'}
    />
  )
}

export const ProposalVoteClassNameMap: Record<Vote | 'pending', string> = {
  [Vote.Yes]: 'text-text-interactive-valid bg-background-interactive-valid',
  [Vote.No]: 'text-text-interactive-error bg-background-interactive-error',
  [Vote.Abstain]: 'text-text-secondary bg-background-secondary',
  pending: 'text-text-body ring-2 ring-inset ring-border-primary',
}
