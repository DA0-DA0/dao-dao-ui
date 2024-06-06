import { QueryClient, queryOptions } from '@tanstack/react-query'

import { AmountWithTimestamp, DaoSource } from '@dao-dao/types'
import {
  COMMUNITY_POOL_ADDRESS_PLACEHOLDER,
  getSupportedChainConfig,
  isConfiguredChainName,
} from '@dao-dao/utils'

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
}
