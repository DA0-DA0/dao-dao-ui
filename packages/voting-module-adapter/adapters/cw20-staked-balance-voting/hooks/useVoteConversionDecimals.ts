import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo } from '@dao-dao/state'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useVoteConversionDecimals = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  if (!governanceTokenInfo) {
    throw new Error(t('error.loadingData'))
  }

  return governanceTokenInfo.decimals
}
