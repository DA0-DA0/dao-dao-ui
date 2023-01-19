import { ProposalWalletVote as StatelessProposalWalletVote } from '@dao-dao/stateless'
import { BaseProposalWalletVoteProps } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/CwdProposalMultiple'

import { useLoadingProposal } from '../hooks'

export const ProposalWalletVote = ({
  vote,
  fallback,
}: BaseProposalWalletVoteProps<MultipleChoiceVote>) => {
  const proposal = useLoadingProposal()
  const optionTitle =
    proposal.loading || vote === undefined
      ? 'Pending'
      : proposal.data.choices[vote?.option_id].title

  const className = ProposalWalletVoteClassNameMap(vote?.option_id, fallback)

  return (
    <StatelessProposalWalletVote
      className={className}
      label={optionTitle}
      showBadge={optionTitle === 'Pending'}
    />
  )
}

export const ProposalWalletVoteClassNameMap = (
  option_id?: number,
  fallback?: string
) => {
  return option_id
    ? 'text-text-body ring-2 ring-inset ring-component-badge-primary'
    : fallback === 'pending'
    ? 'text-text-body ring-2 ring-inset ring-component-badge-brand'
    : 'text-text-tertiary ring-2 ring-inset ring-border-secondary'
}
