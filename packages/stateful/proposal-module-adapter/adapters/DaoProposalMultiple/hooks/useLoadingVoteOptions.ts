import { Block, Circle } from '@mui/icons-material'

import { LoadingData, ProposalVoteOption } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/ui/MultipleChoiceOptionEditor'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingVoteOptions = (): LoadingData<
  ProposalVoteOption<MultipleChoiceVote>[]
> => {
  const proposal = useLoadingProposal()

  return proposal.loading
    ? { loading: true }
    : {
        loading: false,
        data: proposal.data.choices.map((option, index) => {
          // The last choice will always be "None of the Above",
          const isNoneOption = index === proposal.data.choices.length - 1

          return {
            // For 'None of the Above' we use a different icon.
            Icon: isNoneOption ? Block : Circle,
            label: option.title,
            value: { option_id: index },
            color: isNoneOption
              ? undefined
              : MULTIPLE_CHOICE_OPTION_COLORS[
                  index % MULTIPLE_CHOICE_OPTION_COLORS.length
                ],
          }
        }),
      }
}
