import { QueryClient, queryOptions } from '@tanstack/react-query'

import { indexerQueries } from '../indexer'

/**
 * Fetch ONFT collection info.
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
}
