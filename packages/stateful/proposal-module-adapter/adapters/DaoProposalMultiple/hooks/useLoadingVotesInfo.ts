import { LoadingData, ProcessedTQType } from '@dao-dao/types'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useProcessQ } from '../common/hooks/useProcessQ'
import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/ui/MultipleChoiceOptionEditor'
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

  const voteWeights = proposal.votes.vote_weights

  const turnoutTotal = voteWeights.reduce(
    (acc, weight) => acc + Number(weight),
    0
  )

  const totalVotingPower = Number(proposal.total_power)
  const turnoutPercent = (turnoutTotal / totalVotingPower) * 100
  const isTie =
    voteWeights.every((c) => c === voteWeights[0]) && voteWeights[0] !== '0'

  // Calculate the vote percentage for each vote, out of all votes cast.
  const processedChoices = voteWeights
    .map((weight, index) => {
      const percentage = turnoutTotal
        ? (Number(weight) / turnoutTotal) * 100
        : 0
      const {
        option_type: optionType,
        vote_count: voteCount,
        ...choice
      } = proposal.choices[index]

      return {
        optionType,
        voteCount,
        ...choice,
        turnoutVotePercentage: percentage,
        // Retrieve vote color before sorting choices.
        color:
          optionType === MultipleChoiceOptionType.None
            ? 'var(--icon-tertiary)'
            : MULTIPLE_CHOICE_OPTION_COLORS[
                index % MULTIPLE_CHOICE_OPTION_COLORS.length
              ],
      }
    })
    .sort((a, b) => a.turnoutVotePercentage - b.turnoutVotePercentage)

  const quorumReached =
    quorum.type === ProcessedTQType.Majority
      ? // Majority
        turnoutTotal > totalVotingPower / 2
      : // Percent
        turnoutPercent >= quorum.value

  const winningChoice = processedChoices.reduce((prev, current) =>
    Number(prev.voteCount) > Number(current.voteCount) ? prev : current
  )

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
      winningChoice: turnoutTotal === 0 || isTie ? undefined : winningChoice,
    },
  }
}
