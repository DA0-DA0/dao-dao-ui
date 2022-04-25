import { Threshold } from '@dao-dao/state/clients/cw-proposal-single'

export const convertThresholdDataToTQ = (
  data: Threshold
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
  if ('absolute_percentage' in data) {
    const threshold = Number(data.absolute_percentage.percentage) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
    }
  } else if ('threshold_quorum' in data) {
    const quorum = Number(data.threshold_quorum.quorum) * 100
    const threshold = Number(data.threshold_quorum.threshold) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
      quorum: { percent: quorum, display: `${quorum}%` },
    }
  }

  // Unreachable.
  return {}
}
