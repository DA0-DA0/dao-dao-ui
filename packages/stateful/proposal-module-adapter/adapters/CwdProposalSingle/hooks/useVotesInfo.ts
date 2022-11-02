import { ProcessedTQType } from '@dao-dao/types'

import { VotesInfo } from '../types'
import { useProposal } from './useProposal'
import { useProposalProcessedTQ } from './useProposalProcessedTQ'

export const useVotesInfo = (): VotesInfo => {
  const proposal = useProposal()

  const yesVotes = Number(proposal.votes.yes)
  const noVotes = Number(proposal.votes.no)
  const abstainVotes = Number(proposal.votes.abstain)
  const turnoutTotal = yesVotes + noVotes + abstainVotes
  const totalVotingPower = Number(proposal.total_power)

  const { threshold, quorum } = useProposalProcessedTQ()

  const turnoutPercent = (turnoutTotal / totalVotingPower) * 100
  const turnoutYesPercent = turnoutTotal ? (yesVotes / turnoutTotal) * 100 : 0
  const turnoutNoPercent = turnoutTotal ? (noVotes / turnoutTotal) * 100 : 0
  const turnoutAbstainPercent = turnoutTotal
    ? (abstainVotes / turnoutTotal) * 100
    : 0

  const totalYesPercent = (yesVotes / totalVotingPower) * 100
  const totalNoPercent = (noVotes / totalVotingPower) * 100
  const totalAbstainPercent = (abstainVotes / totalVotingPower) * 100

  const thresholdReached =
    !!threshold &&
    // All abstain fails, so we need at least 1 yes vote to reach threshold.
    yesVotes > 0 &&
    (threshold.type === ProcessedTQType.Majority
      ? // Majority
        yesVotes >
        ((quorum ? turnoutTotal : totalVotingPower) - abstainVotes) / 2
      : // Percent
        yesVotes >=
        ((quorum ? turnoutTotal : totalVotingPower) - abstainVotes) *
          (threshold.value /
            (threshold.type === ProcessedTQType.Percent ? 100 : 1)))
  const quorumReached =
    !!quorum &&
    (quorum.type === ProcessedTQType.Majority
      ? // Majority
        turnoutTotal > totalVotingPower / 2
      : // Percent
        turnoutPercent >= quorum.value)

  return {
    threshold,
    quorum,
    // Raw info
    yesVotes,
    noVotes,
    abstainVotes,
    totalVotingPower,
    turnoutTotal,
    // Turnout percents
    turnoutPercent,
    turnoutYesPercent,
    turnoutNoPercent,
    turnoutAbstainPercent,
    // Total percents
    totalYesPercent,
    totalNoPercent,
    totalAbstainPercent,
    // Meta
    thresholdReached,
    quorumReached,
  }
}
