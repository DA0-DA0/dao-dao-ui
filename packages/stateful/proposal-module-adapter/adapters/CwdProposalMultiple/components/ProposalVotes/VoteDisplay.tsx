import { useTranslation } from 'react-i18next'

import {
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/CwdProposalMultiple'

import { useVoteOptions } from '../../hooks/useVoteOptions'

interface VoteDisplayProps {
  vote: MultipleChoiceVote
  proposal?: MultipleChoiceProposal
}

export const VoteDisplay = ({ vote, proposal }: VoteDisplayProps) => {
  const { t } = useTranslation()
  const voteOptions = useVoteOptions(proposal!)
  const voteOption = voteOptions.find(
    ({ value }) => value.option_id === vote.option_id
  )

  if (!voteOption) {
    throw new Error(t('error.loadingData'))
  }

  const { label } = voteOption

  return (
    <div className="inline-flex w-full flex-row items-center gap-3 font-sans text-xs font-medium">
      <p
        className={
          voteOption.style
            ? 'text-icon-interactive-valid'
            : 'text-icon-secondary'
        }
      >
        {label}
      </p>
    </div>
  )
}
