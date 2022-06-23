import { useCallback } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Threshold } from '@dao-dao/state/clients/cw-proposal-single'

import { formatPercentOf100 } from './format'

export enum ProcessedTQType {
  Majority,
  Absolute,
  Percent,
}

type ProcessedTQ = { display: string } & (
  | { type: ProcessedTQType.Majority }
  | { type: ProcessedTQType.Absolute | ProcessedTQType.Percent; value: number }
)

export type ProcessedThresholdQuorum = {
  threshold: ProcessedTQ
  quorum?: ProcessedTQ
}

export const useProcessThresholdData = () => {
  const { t } = useTranslation()

  return useCallback(
    (data: Threshold): ProcessedThresholdQuorum => {
      //! Threshold
      let threshold: ProcessedTQ

      if ('absolute_count' in data) {
        threshold = {
          type: ProcessedTQType.Absolute,
          value: Number(data.absolute_count.threshold),
          display: data.absolute_count.threshold,
        }
      } else {
        const thresholdSource =
          'absolute_percentage' in data
            ? data.absolute_percentage.percentage
            : data.threshold_quorum.threshold

        if ('majority' in thresholdSource) {
          threshold = {
            type: ProcessedTQType.Majority,
            display: t('majority'),
          }
        } else {
          const percent = Number(thresholdSource.percent) * 100
          threshold = {
            type: ProcessedTQType.Percent,
            value: percent,
            display: formatPercentOf100(percent),
          }
        }
      }

      //! Quorum
      let quorum: ProcessedTQ | undefined

      const quorumSource =
        'threshold_quorum' in data ? data.threshold_quorum.quorum : undefined
      if (quorumSource) {
        if ('majority' in quorumSource) {
          quorum = {
            type: ProcessedTQType.Majority,
            display: t('majority'),
          }
        } else {
          const percent = Number(quorumSource.percent) * 100
          quorum = {
            type: ProcessedTQType.Percent,
            value: percent,
            display: formatPercentOf100(percent),
          }
        }
      }

      return {
        threshold,
        ...(quorum && { quorum }),
      }
    },
    [t]
  )
}
