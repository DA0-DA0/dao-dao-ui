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
  const key = vote?.option_id ?? fallback
  const className = ProposalWalletVoteClassNameMap[key]

  return (
    <StatelessProposalWalletVote
      className={className}
      label={optionTitle}
      showBadge={optionTitle === 'Pending'}
    />
  )
}

export const ProposalWalletVoteClassNameMap: Record<
  number | 'pending' | 'hasNoVote',
  string
> = {
  [0]: 'text-text-body ring-2 ring-inset ring-component-badge-valid',
  [1]: 'text-text-body ring-2 ring-inset ring-component-badge-error',
  [2]: 'text-text-body ring-2 ring-inset ring-component-badge-primary',
  pending: 'text-text-body ring-2 ring-inset ring-component-badge-brand',
  hasNoVote: 'text-text-tertiary ring-2 ring-inset ring-border-secondary',
}
