import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakedBalanceVotingSelectors,
} from '@dao-dao/state'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useGovernanceTokenInfoIfExists = () => {
  const { t } = useTranslation()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const governanceTokenAddress = useRecoilValue(
    Cw20StakedBalanceVotingSelectors.tokenContractSelector({
      contractAddress: votingModuleAddress,
    })
  )
  if (!governanceTokenAddress) {
    throw new Error(t('error.loadingData'))
  }

  const governanceTokenInfo = useRecoilValue(
    Cw20BaseSelectors.tokenInfoSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )
  if (!governanceTokenInfo) {
    throw new Error(t('error.loadingData'))
  }

  return governanceTokenInfo
}
