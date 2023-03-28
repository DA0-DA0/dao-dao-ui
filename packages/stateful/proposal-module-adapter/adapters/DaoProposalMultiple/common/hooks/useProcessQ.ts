import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ProcessedQuorum, ProcessedTQ, ProcessedTQType } from '@dao-dao/types'
import { VotingStrategy } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { formatPercentOf100 } from '@dao-dao/utils'

export const useProcessQ = () => {
  const { t } = useTranslation()

  return useCallback(
    (data: VotingStrategy): ProcessedQuorum => {
      if (!('single_choice' in data)) {
        throw new Error('unrecognized voting_strategy')
      }

      // Multiple choice does not have thresholds
      //! Quorum
      let quorum: ProcessedTQ
      const quorumSource = data.single_choice.quorum

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

      return {
        quorum,
      }
    },
    [t]
  )
}
