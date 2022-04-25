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
    // TODO: Handle majority.
    if ('majority' in data.absolute_percentage.percentage) {
      throw new Error('Majority not implemented.')
    }

    const threshold = Number(data.absolute_percentage.percentage.percent) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
    }
  } else if ('threshold_quorum' in data) {
    // TODO: Handle majority.
    if (
      'majority' in data.threshold_quorum.threshold ||
      'majority' in data.threshold_quorum.quorum
    ) {
      throw new Error('Majority not implemented.')
    }

    const quorum = Number(data.threshold_quorum.quorum.percent) * 100
    const threshold = Number(data.threshold_quorum.threshold.percent) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
      quorum: { percent: quorum, display: `${quorum}%` },
    }
  }

  // Unreachable.
  return {}
}
