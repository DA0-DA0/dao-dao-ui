import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { VoteOption } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/gov'

import { useGovProposalVoteOptions } from '../../hooks'

export type GovProposalVoteDisplayProps = {
  vote: VoteOption
}

export const GovProposalVoteDisplay = ({
  vote,
}: GovProposalVoteDisplayProps) => {
  const { t } = useTranslation()

  const voteOption = useGovProposalVoteOptions().find(
    ({ value }) => value === vote
  )
  if (!voteOption) {
    throw new Error(t('error.loadingData'))
  }

  const { Icon, label } = voteOption

  return (
    <div className="inline-flex w-full flex-row items-center gap-3 font-sans text-xs font-medium">
      <p className={ProposalVoteColorMap[vote].textClassName}>{label}</p>

      <Icon
        className={clsx('!h-4 !w-4', ProposalVoteColorMap[vote].iconClassName)}
      />
    </div>
  )
}

export const ProposalVoteColorMap: Record<
  VoteOption,
  {
    iconClassName: string
    textClassName: string
  }
> = {
  [VoteOption.VOTE_OPTION_YES]: {
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [VoteOption.VOTE_OPTION_NO]: {
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [VoteOption.VOTE_OPTION_ABSTAIN]: {
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
  [VoteOption.VOTE_OPTION_NO_WITH_VETO]: {
    iconClassName: 'text-icon-interactive-error opacity-60',
    textClassName: 'text-text-interactive-error opacity-60',
  },
  [VoteOption.VOTE_OPTION_UNSPECIFIED]: {
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
  [VoteOption.UNRECOGNIZED]: {
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
}
