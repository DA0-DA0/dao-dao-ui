import { constSelector, useRecoilValue } from 'recoil'

import {
  CommonNftSelectors,
  DaoVotingCw721StakedSelectors,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

import { useWallet } from '../../../../hooks/useWallet'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import {
  UseGovernanceCollectionInfoOptions,
  UseGovernanceCollectionInfoResponse,
} from '../types'

export const useGovernanceCollectionInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
}: UseGovernanceCollectionInfoOptions = {}): UseGovernanceCollectionInfoResponse => {
  const { chainId, coreAddress, votingModuleAddress } =
    useVotingModuleAdapterOptions()
  const { address: walletAddress } = useWallet({
    chainId,
  })

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

  const tokenSupplyInfo = useRecoilValue(
    CommonNftSelectors.numTokensSelector({
      chainId,
      contractAddress: collectionAddress,
      params: [],
    })
  )

  /// Optional

  // Wallet balance
  const loadingWalletBalance = useCachedLoading(
    fetchWalletBalance && walletAddress
      ? CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
          chainId,
          contractAddress: collectionAddress,
          owner: walletAddress,
        })
      : constSelector(undefined),
    undefined
  )

  // Treasury balance
  const loadingTreasuryBalance = useCachedLoading(
    fetchTreasuryBalance
      ? CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
          chainId,
          contractAddress: collectionAddress,
          owner: coreAddress,
        })
      : constSelector(undefined),
    undefined
  )

  return {
    stakingContractAddress: votingModuleAddress,
    collectionAddress,
    collectionInfo: {
      name: contractInfo.name,
      symbol: contractInfo.symbol,
      totalSupply: tokenSupplyInfo.count,
    },
    token: {
      chainId,
      type: TokenType.Cw721,
      denomOrAddress: collectionAddress,
      symbol: contractInfo.symbol,
      decimals: 0,
      imageUrl: undefined,
    },
    /// Optional
    // Wallet balance
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data?.length),
        },
    // Treasury balance
    loadingTreasuryBalance: loadingTreasuryBalance.loading
      ? { loading: true }
      : !loadingTreasuryBalance.data
      ? undefined
      : {
          loading: false,
          data: loadingTreasuryBalance.data.length,
        },
  }
}
