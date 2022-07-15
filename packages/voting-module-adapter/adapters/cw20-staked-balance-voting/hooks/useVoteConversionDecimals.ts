import { useTranslation } from 'react-i18next'

import { useGovernanceTokenInfo } from '@dao-dao/state'

export const useVoteConversionDecimals = (coreAddress: string) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  if (!governanceTokenInfo) {
    throw new Error(t('error.loadingData'))
  }

  return governanceTokenInfo.decimals
}
