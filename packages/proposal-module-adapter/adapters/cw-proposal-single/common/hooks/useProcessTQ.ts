import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Threshold } from '@dao-dao/state/clients/cw-proposal-single'
import {
  ProcessedTQ,
  ProcessedTQType,
  ProcessedThresholdQuorum,
  formatPercentOf100,
} from '@dao-dao/utils'

export const useProcessTQ = () => {
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
            display: t('info.majority'),
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
            display: t('info.majority'),
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
