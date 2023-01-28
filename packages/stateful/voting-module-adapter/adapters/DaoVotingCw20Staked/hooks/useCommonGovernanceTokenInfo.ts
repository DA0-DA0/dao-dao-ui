import { useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  DaoVotingCw20StakedSelectors,
} from '@dao-dao/state/recoil'
import { CommonGovernanceTokenInfo } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): CommonGovernanceTokenInfo => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const governanceTokenAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.tokenContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const governanceTokenInfo = useRecoilValue(
    Cw20BaseSelectors.tokenInfoSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )

  return {
    denomOrAddress: governanceTokenAddress,
    symbol: governanceTokenInfo.symbol,
    decimals: governanceTokenInfo.decimals,
  }
}
