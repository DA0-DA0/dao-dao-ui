import { useRecoilValue } from 'recoil'

import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { proposalTallySelector } from 'selectors/proposals'

import {
  contractConfigSelector,
  ContractConfigWrapper,
} from './contractConfigWrapper'

export const useThresholdQuorum = (
  contractAddress: string,
  proposalId: number,
  multisig: boolean
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
  const config = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const thresholdConfig = proposalTally?.threshold

  const configWrapper = new ContractConfigWrapper(config)
  const tokenDecimals = configWrapper.gov_token_decimals

  if (!config || !thresholdConfig || !proposalTally) {
    return {}
  }

  if ('absolute_count' in thresholdConfig) {
    const count = Number(thresholdConfig.absolute_count.weight)
    const threshold = multisig
      ? count
      : convertMicroDenomToDenomWithDecimals(count, tokenDecimals)

    return {
      threshold: {
        absolute: threshold,
        percent: (threshold / Number(proposalTally.total_weight)) * 100,
        display: `${threshold} vote${count != 1 ? 's' : ''}`,
      },
    }
  } else if ('absolute_percentage' in thresholdConfig) {
    const threshold =
      Number(thresholdConfig.absolute_percentage.percentage) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
    }
  } else if ('threshold_quorum' in thresholdConfig) {
    const quorum = Number(thresholdConfig.threshold_quorum.quorum) * 100
    const threshold = Number(thresholdConfig.threshold_quorum.threshold) * 100

    return {
      threshold: { percent: threshold, display: `${threshold}%` },
      quorum: { percent: quorum, display: `${quorum}%` },
    }
  }

  return {}
}
