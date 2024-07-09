import { QueryClient, queryOptions } from '@tanstack/react-query'

import { indexerQueries } from '../indexer'

/**
 * Fetch cw721-staked voting module top stakers.
 */
export const fetchDaoVotingCw721StakedTopStakers = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    limit,
  }: {
    chainId: string
    address: string
    limit?: number
  }
): Promise<
  {
    address: string
    count: number
    votingPowerPercent: number
  }[]
> =>
  (await queryClient.fetchQuery(
    indexerQueries.queryContract(queryClient, {
      chainId,
      contractAddress: address,
      formula: 'daoVotingCw721Staked/topStakers',
      ...(limit && { args: { limit } }),
      noFallback: true,
    })
  )) || []

/**
 * Fetch staker for given NFT in cw721-staked voting module. Returns null if not
 * staked.
 */
export const fetchDaoVotingCw721StakedStaker = (
  queryClient: QueryClient,
  {
    chainId,
    address,
    tokenId,
  }: {
    chainId: string
    address: string
    tokenId: string
  }
): Promise<string | null> =>
  queryClient.fetchQuery(
    indexerQueries.queryContract(queryClient, {
      chainId,
      contractAddress: address,
      formula: 'daoVotingCw721Staked/staker',
      args: {
        tokenId,
      },
      noFallback: true,
    })
  )

export const daoVotingCw721StakedExtraQueries = {
  /**
   * Fetch cw721-staked voting module top stakers.
   */
  topStakers: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoVotingCw721StakedTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingCw721StakedExtra', 'topStakers', options],
      queryFn: () => fetchDaoVotingCw721StakedTopStakers(queryClient, options),
    }),
  /**
   * Fetch staker for given NFT in cw721-staked voting module. Returns null if
   * not staked.
   */
  staker: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoVotingCw721StakedStaker>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingCw721StakedExtra', 'staker', options],
      queryFn: () => fetchDaoVotingCw721StakedStaker(queryClient, options),
    }),
}
