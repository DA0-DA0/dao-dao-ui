import { LoadingData, ProcessedTQType } from '@dao-dao/types'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useProcessQ } from '../common/hooks/useProcessQ'
import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/ui/MultipleChoiceOption'
import { VotesInfo } from '../types'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingVotesInfo = (): LoadingData<VotesInfo> => {
  const loadingProposal = useLoadingProposal()
  const processQ = useProcessQ()

  if (loadingProposal.loading) {
    return { loading: true }
  }

  const proposal = loadingProposal.data
  const { quorum } = processQ(proposal.voting_strategy)

  const vote_weights = [...proposal.votes.vote_weights]

  const turnoutTotal = vote_weights.reduce((acc, weight) => {
    return acc + Number(weight)
  }, 0)

  const totalVotingPower = Number(proposal.total_power)
  const turnoutPercent = (turnoutTotal / totalVotingPower) * 100
  const isTie =
    vote_weights.every((c) => c === vote_weights[0]) && vote_weights[0] !== '0'

  // Calculate the vote percentage for each vote, out of all votes cast.
  const processedChoices = vote_weights
    .map((weight, index) => {
      const percentage = turnoutTotal
        ? (Number(weight) / turnoutTotal) * 100
        : 0
      const choice = proposal.choices[index]
      return {
        ...choice,
        turnoutVotePercentage: percentage,
        // Retrieve vote color before sorting choices.
        color:
          choice.option_type === MultipleChoiceOptionType.None
            ? 'var(--icon-tertiary)'
            : MULTIPLE_CHOICE_OPTION_COLORS[
                index % MULTIPLE_CHOICE_OPTION_COLORS.length
              ],
      }
    })
    .sort((a, b) => a.turnoutVotePercentage - b.turnoutVotePercentage)

  const quorumReached =
    !!quorum &&
    (quorum.type === ProcessedTQType.Majority
      ? // Majority
        turnoutTotal > totalVotingPower / 2
      : // Percent
        turnoutPercent >= quorum.value)

  return {
    loading: false,
    data: {
      quorum,
      isTie,
      processedChoices,
      totalVotingPower,
      turnoutTotal,
      turnoutPercent,
      quorumReached,
    },
  }
}
