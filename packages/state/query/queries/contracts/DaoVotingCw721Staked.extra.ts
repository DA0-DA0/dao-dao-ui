import { QueryClient, queryOptions } from '@tanstack/react-query'

import { SupportedChainIndexerMode } from '@dao-dao/types'

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
    indexerQueries.queryContract({
      chainId,
      contractAddress: address,
      formula: 'daoVotingCw721Staked/topStakers',
      ...(limit && { args: { limit } }),
      noFallback: true,
      allowedModes: [
        SupportedChainIndexerMode.Tx,
        SupportedChainIndexerMode.All,
      ],
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
    indexerQueries.queryContract({
      chainId,
      contractAddress: address,
      formula: 'daoVotingCw721Staked/staker',
      args: {
        tokenId,
      },
      noFallback: true,
      allowedModes: [
        SupportedChainIndexerMode.Tx,
        SupportedChainIndexerMode.All,
      ],
    })
  )

export const daoVotingCw721StakedExtraQueries = {
  /**
   * Fetch cw721-staked voting module top stakers.
   */
  topStakers: (
    options: Parameters<typeof fetchDaoVotingCw721StakedTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['daoVotingCw721StakedExtra', 'topStakers', options],
      queryFn: (ctx) =>
        fetchDaoVotingCw721StakedTopStakers(ctx.client, options),
    }),
  /**
   * Fetch staker for given NFT in cw721-staked voting module. Returns null if
   * not staked.
   */
  staker: (options: Parameters<typeof fetchDaoVotingCw721StakedStaker>[1]) =>
    queryOptions({
      queryKey: ['daoVotingCw721StakedExtra', 'staker', options],
      queryFn: (ctx) => fetchDaoVotingCw721StakedStaker(ctx.client, options),
    }),
}
