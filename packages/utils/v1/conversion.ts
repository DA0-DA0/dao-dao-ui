import { Threshold } from '@dao-dao/state/clients/cw-proposal-single'

type MajorityOrPercent =
  | { majority: true }
  | { majority: false; percent: number }

export type ProcessedThresholdQuorum = {
  threshold: {
    value: MajorityOrPercent
    display: string
  }
  quorum?: {
    value: MajorityOrPercent
    display: string
  }
}

export const processThresholdData = (
  data: Threshold
): ProcessedThresholdQuorum => {
  const thresholdSource =
    'absolute_percentage' in data
      ? data.absolute_percentage.percentage
      : data.threshold_quorum.threshold
  const quorumSource =
    'absolute_percentage' in data ? undefined : data.threshold_quorum.quorum

  // Threshold
  let threshold: ProcessedThresholdQuorum['threshold']
  if ('majority' in thresholdSource) {
    threshold = {
      value: {
        majority: true,
      },
      display: 'Majority',
    }
  } else {
    const percent = Number(thresholdSource.percent) * 100
    threshold = {
      value: { majority: false, percent },
      display: `${percent}%`,
    }
  }

  // Quorum
  let quorum: ProcessedThresholdQuorum['quorum']
  if (quorumSource) {
    if ('majority' in quorumSource) {
      quorum = {
        value: {
          majority: true,
        },
        display: 'Majority',
      }
    } else {
      const percent = Number(quorumSource.percent) * 100
      quorum = {
        value: { majority: false, percent },
        display: `${percent}%`,
      }
    }
  }

  return {
    threshold,
    ...(quorum && { quorum }),
  }
}
