import { useRecoilValue } from 'recoil'

import {
  Cw721BaseSelectors,
  DaoVotingCw721StakedSelectors,
} from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chain_id: chainId } = useChain()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { nft_address: collectionAddress } = useRecoilValue(
    DaoVotingCw721StakedSelectors.configSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const contractInfo = useRecoilValue(
    Cw721BaseSelectors.contractInfoSelector({
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
