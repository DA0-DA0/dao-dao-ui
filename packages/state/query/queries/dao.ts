import {
  FetchQueryOptions,
  QueryClient,
  queryOptions,
  skipToken,
} from '@tanstack/react-query'

import { AmountWithTimestamp, DaoSource } from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  getSupportedChainConfig,
  isConfiguredChainName,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { indexerQueries } from './indexer'

/**
 * Fetch a DAO's TVL.
 */
export const fetchDaoTvl = async (
  queryClient: QueryClient,
  { chainId, coreAddress }: DaoSource
): Promise<AmountWithTimestamp> => {
  // Native chain x/gov module.
  if (isConfiguredChainName(chainId, coreAddress)) {
    coreAddress =
      // Use real gov DAO's address if exists.
      getSupportedChainConfig(chainId)?.govContractAddress ||
      COMMUNITY_POOL_ADDRESS_PLACEHOLDER
  }

  const timestamp = new Date()

  const { total: amount } = (await queryClient.fetchQuery(
    indexerQueries.snapper<{ total: number }>({
      query: 'daodao-tvl',
      parameters: {
        chainId,
        address: coreAddress,
      },
    })
  )) || {
    total: NaN,
  }

  return {
    amount,
    timestamp,
  }
}

/**
 * Fetch chain DAO voting power-shaped response.
 */
export const fetchChainVotingPower = async (
  queryClient: QueryClient,
  options: Parameters<typeof chainQueries.nativeStakedBalance>[0]
): Promise<VotingPowerAtHeightResponse> => ({
  power: (
    await queryClient.fetchQuery(chainQueries.nativeStakedBalance(options))
  ).amount,
})

/**
 * Fetch chain DAO total power-shaped response.
 */
export const fetchChainTotalPower = async (
  queryClient: QueryClient,
  options: Parameters<typeof chainQueries.totalNativeStakedBalance>[0]
): Promise<TotalPowerAtHeightResponse> => ({
  power: await queryClient.fetchQuery(
    chainQueries.totalNativeStakedBalance(options)
  ),
})

export const daoQueries = {
  /**
   * Fetch featured DAOs.
   */
  listFeatured: () =>
    indexerQueries.snapper<DaoSource[]>({
      query: 'daodao-featured-daos',
    }),
  /**
   * Fetch a DAO's TVL.
   */
  tvl: (queryClient: QueryClient, options: Parameters<typeof fetchDaoTvl>[1]) =>
    queryOptions({
      queryKey: ['dao', 'tvl', options],
      queryFn: () => fetchDaoTvl(queryClient, options),
    }),
  /**
   * Fetch chain DAO voting power-shaped response.
   */
  chainVotingPower: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchChainVotingPower>[1]
  ): FetchQueryOptions<VotingPowerAtHeightResponse> => ({
    queryKey: ['dao', 'chainVotingPower', options],
    queryFn: options
      ? () => fetchChainVotingPower(queryClient, options)
      : skipToken,
  }),
  /**
   * Fetch chain DAO total power-shaped response.
   */
  chainTotalPower: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchChainTotalPower>[1]
  ): FetchQueryOptions<TotalPowerAtHeightResponse> => ({
    queryKey: ['dao', 'chainTotalPower', options],
    queryFn: () => fetchChainTotalPower(queryClient, options),
  }),
}
