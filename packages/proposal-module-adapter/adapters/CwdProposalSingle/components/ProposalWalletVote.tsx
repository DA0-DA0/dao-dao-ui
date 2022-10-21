import { useTranslation } from 'react-i18next'

import { ProposalWalletVote as StatelessProposalWalletVote } from '@dao-dao/stateless'
import { BaseProposalWalletVoteProps } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/CwdProposalSingle.common'

export const ProposalWalletVote = ({
  vote,
  fallback,
}: BaseProposalWalletVoteProps<Vote>) => {
  const key = vote ?? fallback
  const className = ProposalWalletVoteClassNameMap[key]

  const { t } = useTranslation()

  return (
    <StatelessProposalWalletVote
      className={className}
      label={t(`proposalVoteTitle.${key}`)}
      showBadge={key === 'pending'}
    />
  )
}

export const ProposalWalletVoteClassNameMap: Record<
  Vote | 'pending' | 'none',
  string
> = {
  [Vote.Yes]: 'text-text-body ring-2 ring-inset ring-component-badge-valid',
  [Vote.No]: 'text-text-body ring-2 ring-inset ring-component-badge-error',
  [Vote.Abstain]:
    'text-text-body ring-2 ring-inset ring-component-badge-primary',
  pending: 'text-text-body ring-2 ring-inset ring-component-badge-brand',
  none: 'text-text-tertiary ring-2 ring-inset ring-border-secondary',
}
