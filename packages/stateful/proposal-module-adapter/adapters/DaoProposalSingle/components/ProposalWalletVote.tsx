import { useTranslation } from 'react-i18next'

import { ProposalWalletVote as StatelessProposalWalletVote } from '@dao-dao/stateless'
import { BaseProposalWalletVoteProps } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

export const ProposalWalletVote = ({
  vote,
  fallback,
}: BaseProposalWalletVoteProps<Vote>) => {
  const key = vote ?? fallback
  const className = ProposalWalletVoteClassNameMap[key]

  const { t } = useTranslation()
  const label = t(`proposalVoteTitle.${key === 'hasNoVote' ? 'none' : key}`)

  return (
    <StatelessProposalWalletVote
      className={className}
      label={label}
      showBadge={key === 'pending'}
    />
  )
}

export const ProposalWalletVoteClassNameMap: Record<
  Vote | 'pending' | 'hasNoVote',
  string
> = {
  [Vote.Yes]: 'text-text-body ring-2 ring-inset ring-component-badge-valid',
  [Vote.No]: 'text-text-body ring-2 ring-inset ring-component-badge-error',
  [Vote.Abstain]:
    'text-text-body ring-2 ring-inset ring-component-badge-primary',
  pending: 'text-text-body ring-2 ring-inset ring-component-badge-brand',
  hasNoVote: 'text-text-tertiary ring-2 ring-inset ring-border-secondary',
}
