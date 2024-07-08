import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ChainId } from '@dao-dao/types'

import {
  cw721BaseQueries,
  daoVotingCw721StakedExtraQueries,
  daoVotingOnftStakedExtraQueries,
} from './contracts'
import { omniflixQueries } from './omniflix'

/**
 * Fetch owner of NFT, or staked if NFT is staked with the given staking
 * contract (probably a DAO voting module.)
 */
export const fetchNftOwnerOrStaker = async (
  queryClient: QueryClient,
  {
    chainId,
    collection,
    tokenId,
    stakingContractAddress,
  }: {
    chainId: string
    collection: string
    tokenId: string
    /**
     * If defined, will resolve the NFT's staker if it is currently staked with
     * this staking contract address.
     */
    stakingContractAddress?: string
  }
): Promise<{
  address: string
  /**
   * If true, the address is staking with the given staking contract. If false,
   * the address is the owner of the NFT.
   */
  staked: boolean
}> => {
  const isOmniFlix =
    chainId === ChainId.OmniflixHubMainnet ||
    chainId === ChainId.OmniflixHubTestnet

  const owner = isOmniFlix
    ? (
        await queryClient.fetchQuery(
          omniflixQueries.onft({
            chainId,
            collectionId: collection,
            tokenId,
          })
        )
      ).owner
    : (
        await queryClient.fetchQuery(
          cw721BaseQueries.ownerOf({
            chainId,
            contractAddress: collection,
            args: {
              tokenId,
            },
          })
        )
      ).owner

  const staker =
    stakingContractAddress && owner === stakingContractAddress
      ? await queryClient.fetchQuery(
          isOmniFlix
            ? daoVotingOnftStakedExtraQueries.staker(queryClient, {
                chainId,
                address: stakingContractAddress,
                tokenId,
              })
            : daoVotingCw721StakedExtraQueries.staker(queryClient, {
                chainId,
                address: stakingContractAddress,
                tokenId,
              })
        )
      : null

  return {
    address: staker || owner,
    staked: !!staker,
  }
}

export const nftQueries = {
  /**
   * Fetch owner of NFT, or staked if NFT is staked with the given staking
   * contract (probably a DAO voting module.)
   */
  ownerOrStaker: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchNftOwnerOrStaker>[1]
  ) =>
    queryOptions({
      queryKey: ['nft', 'ownerOrStaker', options],
      queryFn: () => fetchNftOwnerOrStaker(queryClient, options),
    }),
}
