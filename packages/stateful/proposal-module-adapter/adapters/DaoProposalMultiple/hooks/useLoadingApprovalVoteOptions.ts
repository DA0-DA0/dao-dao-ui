import { Block, Circle } from '@mui/icons-material'
import { useMemo } from 'react'

import { LoadingData, ProposalVoteOption } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/MultipleChoiceOptionEditor'
import { useLoadingApprovalProposal } from './useLoadingApprovalProposal'

export const useLoadingPreProposeApprovalVoteOptions = (): LoadingData<
  ProposalVoteOption<MultipleChoiceVote>[]
> => {
  const proposal = useLoadingApprovalProposal()

  // Memoize this so that the references to value don't change. When not
  // memoized, this causes the selected button to appear deselected on
  // re-renders when casting votes.
  const choices = proposal.loading
    ? undefined
    : proposal.data.msg.choices.options
  const voteOptions = useMemo(
    (): ProposalVoteOption<MultipleChoiceVote>[] =>
      choices
        ? [
            ...choices.map((option, index) => ({
              Icon: Circle,
              label: option.title,
              value: { option_id: index },
              color:
                MULTIPLE_CHOICE_OPTION_COLORS[
                  index % MULTIPLE_CHOICE_OPTION_COLORS.length
                ],
            })),
            // Approval proposals don't encode the None option themselves, so we
            // add it here.
            {
              Icon: Block,
              label: 'None of the Above',
              value: { option_id: choices.length },
              color: 'var(--icon-tertiary)',
            },
          ]
        : [],
    [choices]
  )

  return proposal.loading
    ? { loading: true }
    : {
        loading: false,
        data: voteOptions,
      }
}
