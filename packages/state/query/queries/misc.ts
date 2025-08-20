import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  DaoDaoIndexerAllStats,
  DaoDaoIndexerChainStats,
  SupportedChainIndexerMode,
} from '@dao-dao/types'
import { chainIsIndexed, getSupportedChains, retry } from '@dao-dao/utils'

import { indexerQueries } from './indexer'

/**
 * Fetch home page stats.
 */
export const fetchHomePageStats = async (
  queryClient: QueryClient,
  {
    chainId,
  }: {
    /**
     * Chain ID to fetch stats for. If undefined, fetch stats for all chains.
     */
    chainId?: string
  }
): Promise<DaoDaoIndexerAllStats> => {
  const [tvl, all, month, week] = await Promise.all([
    // Get all or chain-specific stats and TVL.
    !chainId || chainIsIndexed(chainId)
      ? retry(3, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<number>({
              query: chainId ? 'daodao-chain-tvl' : 'daodao-all-tvl',
              parameters: chainId ? { chainId } : undefined,
            })
          )
        ).catch(() => null)
      : null,
    !chainId ||
    chainIsIndexed(
      chainId,
      SupportedChainIndexerMode.Tx,
      SupportedChainIndexerMode.All
    )
      ? retry(3, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: chainId ? { chainId } : undefined,
            })
          )
        ).catch(() => null)
      : null,
    !chainId ||
    chainIsIndexed(
      chainId,
      SupportedChainIndexerMode.Tx,
      SupportedChainIndexerMode.All
    )
      ? retry(3, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: {
                ...(chainId ? { chainId } : undefined),
                daysAgo: 30,
              },
            })
          )
        ).catch(() => null)
      : null,
    !chainId ||
    chainIsIndexed(
      chainId,
      SupportedChainIndexerMode.Tx,
      SupportedChainIndexerMode.All
    )
      ? retry(3, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: {
                ...(chainId ? { chainId } : undefined),
                daysAgo: 7,
              },
            })
          )
        ).catch(() => null)
      : null,
  ])

  return {
    all,
    month,
    week,
    tvl,
    chains: chainId ? 1 : getSupportedChains().length,
  }
}

export const miscQueries = {
  /**
   * Fetch home page stats.
   */
  homePageStats: (options: Parameters<typeof fetchHomePageStats>[1]) =>
    queryOptions({
      queryKey: ['misc', 'homePageStats', options],
      queryFn: (ctx) => fetchHomePageStats(ctx.client, options),
    }),
}
