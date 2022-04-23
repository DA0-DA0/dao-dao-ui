import { Proposal } from '@dao-dao/state/clients/cw-proposal-single'

export const useThresholdQuorum = (
  proposal?: Proposal
): {
  threshold?: {
    absolute?: number
    percent: number
    display: string
  }
  quorum?: {
    percent: number
    display: string
  }
} => {
  if (!proposal) return {}

  if ('absolute_percentage' in proposal.threshold) {
    const threshold =
      Number(proposal.threshold.absolute_percentage.percentage) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
    }
  } else if ('threshold_quorum' in proposal.threshold) {
    const quorum = Number(proposal.threshold.threshold_quorum.quorum) * 100
    const threshold =
      Number(proposal.threshold.threshold_quorum.threshold) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
      quorum: { percent: quorum, display: `${quorum}%` },
    }
  }

  // Unreachable.
  return {}
}
