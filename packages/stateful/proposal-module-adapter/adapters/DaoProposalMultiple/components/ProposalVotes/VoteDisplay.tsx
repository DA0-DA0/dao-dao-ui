import { useTranslation } from 'react-i18next'

import { Loader, TooltipTruncatedText } from '@dao-dao/stateless'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useLoadingVoteOptions } from '../../hooks/useLoadingVoteOptions'

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
      <TooltipTruncatedText
        style={{
          color: voteOption.color,
        }}
        text={label}
      />
    </div>
  )
}
