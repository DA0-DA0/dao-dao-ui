import { Block, Circle } from '@mui/icons-material'
import { useMemo } from 'react'

import { LoadingData, ProposalVoteOption } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/ui/MultipleChoiceOptionEditor'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingVoteOptions = (): LoadingData<
  ProposalVoteOption<MultipleChoiceVote>[]
> => {
  const proposal = useLoadingProposal()

  // Memoize this so that the references to value don't change. When not
  // memoized, this causes the selected button to appear deselected on
  // re-renders when casting votes.
  const choices = proposal.loading ? undefined : proposal.data.choices
  const voteOptions = useMemo(
    (): ProposalVoteOption<MultipleChoiceVote>[] =>
      choices?.map((option, index) => {
        // The last choice will always be "None of the Above",
        const isNoneOption = index === choices.length - 1

        return {
          // For 'None of the Above' we use a different icon.
          Icon: isNoneOption ? Block : Circle,
          label: option.title,
          value: { option_id: index },
          color: isNoneOption
            ? 'var(--icon-tertiary)'
            : MULTIPLE_CHOICE_OPTION_COLORS[
                index % MULTIPLE_CHOICE_OPTION_COLORS.length
              ],
        }
      }) ?? [],
    [choices]
  )

  return proposal.loading
    ? { loading: true }
    : {
        loading: false,
        data: voteOptions,
      }
}
