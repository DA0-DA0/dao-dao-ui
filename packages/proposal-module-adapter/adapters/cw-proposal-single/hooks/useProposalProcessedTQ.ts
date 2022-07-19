import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import {
  ProcessedTQ,
  ProcessedTQType,
  ProcessedThresholdQuorum,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useProposalProcessedTQ = (): ProcessedThresholdQuorum => {
  const { t } = useTranslation()
  const { proposalModuleAddress, proposalNumber } =
    useProposalModuleAdapterOptions()

  const proposal = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )?.proposal

  if (!proposal) {
    throw new Error(t('error.loadingData'))
  }

  const processed: ProcessedThresholdQuorum = useMemo(() => {
    //! Threshold
    let threshold: ProcessedTQ

    if ('absolute_count' in proposal.threshold) {
      threshold = {
        type: ProcessedTQType.Absolute,
        value: Number(proposal.threshold.absolute_count.threshold),
        display: proposal.threshold.absolute_count.threshold,
      }
    } else {
      const thresholdSource =
        'absolute_percentage' in proposal.threshold
          ? proposal.threshold.absolute_percentage.percentage
          : proposal.threshold.threshold_quorum.threshold

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
      'threshold_quorum' in proposal.threshold
        ? proposal.threshold.threshold_quorum.quorum
        : undefined
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
  }, [proposal.threshold, t])

  return processed
}
