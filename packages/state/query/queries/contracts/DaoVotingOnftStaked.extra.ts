import { QueryClient, queryOptions } from '@tanstack/react-query'

import { indexerQueries } from '../indexer'

/**
 * Fetch ONFT-staked voting module top stakers.
 */
export const fetchDaoVotingOnftStakedTopStakers = async (
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
      formula: 'daoVotingOnftStaked/topStakers',
      ...(limit && { args: { limit } }),
      noFallback: true,
    })
  )) || []

/**
 * Fetch staker for given ONFT in ONFT-staked voting module. Returns null if not
 * staked.
 */
export const fetchDaoVotingOnftStakedStaker = (
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
      formula: 'daoVotingOnftStaked/staker',
      args: {
        tokenId,
      },
      noFallback: true,
    })
  )

export const daoVotingOnftStakedExtraQueries = {
  /**
   * Fetch top stakers.
   */
  topStakers: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoVotingOnftStakedTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingOnftStakedExtra', 'topStakers', options],
      queryFn: () => fetchDaoVotingOnftStakedTopStakers(queryClient, options),
    }),

  /**
   * Fetch staker for given ONFT in ONFT-staked voting module. Returns null if
   * not staked.
   */
  staker: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchDaoVotingOnftStakedStaker>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingOnftStakedExtra', 'staker', options],
      queryFn: () => fetchDaoVotingOnftStakedStaker(queryClient, options),
    }),
}
