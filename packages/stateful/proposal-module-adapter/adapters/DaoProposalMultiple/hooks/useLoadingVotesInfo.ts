import { LoadingData, ProcessedTQType } from '@dao-dao/types'

import { useProcessQ } from '../common/hooks/useProcessQ'
import { VotesInfo } from '../types'
import { useLoadingProposal } from './useLoadingProposal'
import { useLoadingVoteOptions } from './useLoadingVoteOptions'

export const useLoadingVotesInfo = (): LoadingData<VotesInfo> => {
  const loadingProposal = useLoadingProposal()
  const loadingVoteOptions = useLoadingVoteOptions()
  const processQ = useProcessQ()

  if (loadingProposal.loading || loadingVoteOptions.loading) {
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

  // Calculate the vote percentage for each vote, out of all votes cast.
  const processedChoices = loadingVoteOptions.data
    .map(({ color }, index) => {
      const weight = voteWeights[index]
      const percentage = turnoutTotal
        ? (Number(weight) / turnoutTotal) * 100
        : 0
      const { option_type: optionType, ...choice } = proposal.choices[index]

      return {
        optionType,
        ...choice,
        turnoutVotePercentage: percentage,
        color,
      }
    })
    // Sort with the highest vote percentage first.
    .sort((a, b) => b.turnoutVotePercentage - a.turnoutVotePercentage)

  const quorumReached =
    quorum.type === ProcessedTQType.Majority
      ? // Majority
        turnoutTotal > totalVotingPower / 2
      : // Percent
        turnoutPercent >= quorum.value

  // The first choice has the highest turnout. If there is a tie, this will not
  // be the actual winner.
  const winningChoice = turnoutTotal === 0 ? undefined : processedChoices[0]

  // Tie if the first two highest vote percentages are equal.
  const isTie =
    !winningChoice ||
    processedChoices[1].turnoutVotePercentage ===
      winningChoice.turnoutVotePercentage

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
      winningChoice: isTie ? undefined : winningChoice,
    },
  }
}
