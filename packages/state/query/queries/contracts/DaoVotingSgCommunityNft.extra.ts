import { QueryClient, queryOptions } from '@tanstack/react-query'

import { indexerQueries } from '../indexer'
import { cw721BaseQueries } from './Cw721Base'
import { daoVotingSgCommunityNftQueries } from './DaoVotingSgCommunityNft'

/**
 * Check if an address owns any NFT from the collection used by a
 * dao-voting-sg-community-nft voting module.
 */
export const fetchDaoVotingSgCommunityNftWalletHasNft = async (
  queryClient: QueryClient,
  {
    chainId,
    votingModuleAddress,
    walletAddress,
  }: {
    chainId: string
    votingModuleAddress: string
    walletAddress: string
  }
): Promise<boolean> => {
  const nftContract = await queryClient.fetchQuery(
    daoVotingSgCommunityNftQueries.nftContract(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
    })
  )

  const { tokens } = await queryClient.fetchQuery(
    cw721BaseQueries.tokens({
      chainId,
      contractAddress: nftContract,
      args: {
        owner: walletAddress,
      },
    })
  )

  return tokens.length > 0
}

export const daoVotingSgCommunityNftExtraQueries = {
  /**
   * Fetch all voters for a dao-voting-sg-community-nft voting module.
   */
  allVoters: (
    queryClient: QueryClient,
    {
      chainId,
      address,
    }: {
      chainId: string
      address: string
    }
  ) =>
    indexerQueries.queryContract<
      {
        address: string
        weight: number
        votingPowerPercent: number
      }[]
    >(queryClient, {
      chainId,
      contractAddress: address,
      formula: 'daoVotingSgCommunityNft/allVotersWithVotingPower',
      noFallback: true,
    }),
  /**
   * Check if an address owns any NFT from the collection used by a
   * dao-voting-sg-community-nft voting module.
   */
  walletHasNft: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoVotingSgCommunityNftWalletHasNft>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingSgCommunityNftExtra', 'walletHasNft', options],
      queryFn: () =>
        fetchDaoVotingSgCommunityNftWalletHasNft(queryClient, options),
    }),
}
