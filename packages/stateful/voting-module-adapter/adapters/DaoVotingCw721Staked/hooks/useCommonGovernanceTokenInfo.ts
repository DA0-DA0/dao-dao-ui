import { useRecoilValue } from 'recoil'

import {
  CommonNftSelectors,
  DaoVotingCw721StakedSelectors,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const { nft_address: collectionAddress } = useRecoilValue(
    DaoVotingCw721StakedSelectors.configSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const contractInfo = useRecoilValue(
    CommonNftSelectors.contractInfoSelector({
      chainId,
      contractAddress: collectionAddress,
      params: [],
    })
  )

  return {
    chainId,
    type: TokenType.Cw721,
    denomOrAddress: collectionAddress,
    symbol: contractInfo.symbol,
    decimals: 0,
    imageUrl: undefined,
  }
}
