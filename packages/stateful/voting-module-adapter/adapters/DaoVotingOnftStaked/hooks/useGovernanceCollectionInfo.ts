import {
  useQueryClient,
  useSuspenseQueries,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { daoVotingOnftStakedQueries, omniflixQueries } from '@dao-dao/state'
import { TokenType } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../../../hooks'
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

  const queryClient = useQueryClient()
  const {
    data: { onft_collection_id },
  } = useSuspenseQuery(
    daoVotingOnftStakedQueries.config(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
    })
  )

  const [
    {
      data: { name, symbol, previewUri },
    },
    { data: totalSupply },
  ] = useSuspenseQueries({
    queries: [
      omniflixQueries.onftCollectionInfo({
        chainId,
        id: onft_collection_id,
      }),
      omniflixQueries.onftCollectionSupply({
        chainId,
        id: onft_collection_id,
      }),
    ],
  })

  /// Optional

  // Wallet balance
  const loadingWalletBalance = useQueryLoadingDataWithError(
    omniflixQueries.onftCollectionSupply(
      fetchWalletBalance && walletAddress
        ? {
            chainId,
            id: onft_collection_id,
            owner: walletAddress,
          }
        : undefined
    )
  )

  // Treasury balance
  const loadingTreasuryBalance = useQueryLoadingDataWithError(
    omniflixQueries.onftCollectionSupply(
      fetchTreasuryBalance
        ? {
            chainId,
            id: onft_collection_id,
            owner: coreAddress,
          }
        : undefined
    )
  )

  return {
    stakingContractAddress: votingModuleAddress,
    collectionAddress: onft_collection_id,
    collectionInfo: {
      name,
      symbol,
      totalSupply,
    },
    token: {
      chainId,
      type: TokenType.Onft,
      denomOrAddress: onft_collection_id,
      symbol,
      decimals: 0,
      imageUrl: previewUri,
      source: {
        chainId,
        type: TokenType.Onft,
        denomOrAddress: onft_collection_id,
      },
    },
    /// Optional
    // Wallet balance
    loadingWalletBalance:
      !fetchWalletBalance || loadingWalletBalance.errored
        ? undefined
        : loadingWalletBalance.loading
        ? { loading: true }
        : {
            loading: false,
            data: loadingWalletBalance.data,
          },
    // Treasury balance
    loadingTreasuryBalance:
      !fetchTreasuryBalance || loadingTreasuryBalance.errored
        ? undefined
        : loadingTreasuryBalance.loading
        ? { loading: true }
        : {
            loading: false,
            data: loadingTreasuryBalance.data,
          },
  }
}
