import { useTranslation } from 'react-i18next'

import { VoteOption } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { ProposalWalletVote } from './ProposalWalletVote'

export type GovProposalWalletVoteProps = {
  vote: VoteOption | undefined
  fallback: 'pending' | 'hasNoVote'
}

export const GovProposalWalletVote = ({
  vote,
  fallback,
}: GovProposalWalletVoteProps) => {
  const { t } = useTranslation()

  const key = vote ?? fallback
  const { className, i18nKey } = GovProposalWalletVoteClassNameMap[key]

  return (
    <ProposalWalletVote
      className={className}
      label={t(i18nKey)}
      showBadge={key === 'pending'}
    />
  )
}

export const GovProposalWalletVoteClassNameMap: Record<
  VoteOption | 'pending' | 'hasNoVote',
  {
    className: string
    i18nKey: string
  }
> = {
  [VoteOption.VOTE_OPTION_YES]: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-valid',
    i18nKey: 'info.yesVote',
  },
  [VoteOption.VOTE_OPTION_NO]: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-error',
    i18nKey: 'info.noVote',
  },
  [VoteOption.VOTE_OPTION_ABSTAIN]: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-primary',
    i18nKey: 'info.abstainVote',
  },
  [VoteOption.VOTE_OPTION_NO_WITH_VETO]: {
    className:
      'text-text-body ring-2 ring-inset ring-component-badge-error opacity-60',
    i18nKey: 'info.noWithVeto',
  },
  [VoteOption.VOTE_OPTION_UNSPECIFIED]: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-primary',
    i18nKey: 'govProposalStatus.unspecified',
  },
  [VoteOption.UNRECOGNIZED]: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-primary',
    i18nKey: 'govProposalStatus.unrecognized',
  },
  pending: {
    className: 'text-text-body ring-2 ring-inset ring-component-badge-brand',
    i18nKey: 'proposalVoteTitle.pending',
  },
  hasNoVote: {
    className: 'text-text-tertiary ring-2 ring-inset ring-border-secondary',
    i18nKey: 'proposalVoteTitle.none',
  },
}
