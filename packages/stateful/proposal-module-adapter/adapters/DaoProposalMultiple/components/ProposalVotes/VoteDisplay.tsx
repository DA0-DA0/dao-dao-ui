import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/stateless'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useLoadingVoteOptions } from '../../hooks/useLoadingVoteOptions'
import { MULTIPLE_CHOICE_OPTION_COLORS } from '../ui/MultipleChoiceOptionEditor'

interface VoteDisplayProps {
  vote: MultipleChoiceVote
}

export const VoteDisplay = ({ vote }: VoteDisplayProps) => {
  const { t } = useTranslation()
  const voteOptions = useLoadingVoteOptions()

  if (voteOptions.loading) {
    return <Loader fill={false} size={20} />
  }

  const voteOption = voteOptions.data.find(
    ({ value }) => value.option_id === vote.option_id
  )
  if (!voteOption) {
    throw new Error(t('error.loadingData'))
  }

  const { label } = voteOption

  return (
    <div className="inline-flex w-full flex-row items-center font-sans text-xs font-medium">
      <p
        className={clsx(!voteOption.color && 'text-icon-secondary')}
        style={{
          color:
            MULTIPLE_CHOICE_OPTION_COLORS[
              vote.option_id % MULTIPLE_CHOICE_OPTION_COLORS.length
            ],
        }}
      >
        {label}
      </p>
    </div>
  )
}
