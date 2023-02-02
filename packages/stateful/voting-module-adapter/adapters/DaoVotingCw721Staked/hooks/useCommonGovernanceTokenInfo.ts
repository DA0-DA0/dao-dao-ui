import { useRecoilValue } from 'recoil'

import {
  Cw721BaseSelectors,
  DaoVotingCw721StakedSelectors,
} from '@dao-dao/state/recoil'
import { CommonGovernanceTokenInfo } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): CommonGovernanceTokenInfo => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { nft_address: collectionAddress } = useRecoilValue(
    DaoVotingCw721StakedSelectors.configSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const contractInfo = useRecoilValue(
    Cw721BaseSelectors.contractInfoSelector({
      contractAddress: collectionAddress,
      params: [],
    })
  )

  return {
    denomOrAddress: collectionAddress,
    symbol: contractInfo.symbol,
    decimals: 0,
  }
}
