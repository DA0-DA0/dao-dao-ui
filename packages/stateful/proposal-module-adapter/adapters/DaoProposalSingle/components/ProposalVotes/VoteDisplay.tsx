import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/stateless'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { useLoadingVoteOptions } from '../../hooks/useLoadingVoteOptions'

interface VoteDisplayProps {
  vote: Vote
}

export const VoteDisplay = ({ vote }: VoteDisplayProps) => {
  const { t } = useTranslation()

  const voteOptions = useLoadingVoteOptions()
  if (voteOptions.loading) {
    return <Loader fill={false} size={20} />
  }

  const voteOption = voteOptions.data.find(({ value }) => value === vote)
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
  Vote,
  {
    iconClassName: string
    textClassName: string
  }
> = {
  [Vote.Yes]: {
    iconClassName: 'text-icon-interactive-valid',
    textClassName: 'text-text-interactive-valid',
  },
  [Vote.No]: {
    iconClassName: 'text-icon-interactive-error',
    textClassName: 'text-text-interactive-error',
  },
  [Vote.Abstain]: {
    iconClassName: 'text-icon-secondary',
    textClassName: 'text-text-secondary',
  },
}
