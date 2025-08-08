import { QueryClient, queryOptions } from '@tanstack/react-query'

import { DaoDaoIndexerAllStats, DaoDaoIndexerChainStats } from '@dao-dao/types'
import {
  FAST_AVERAGE_COLOR_API_TEMPLATE,
  chainIsIndexed,
  getSupportedChains,
  retry,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

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
    !chainId || chainIsIndexed(chainId)
      ? retry(3, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: chainId ? { chainId } : undefined,
            })
          )
        ).catch(() => null)
      : null,
    !chainId || chainIsIndexed(chainId)
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
    !chainId || chainIsIndexed(chainId)
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

/**
 * Fetch average color of an image.
 */
export const fetchAverageColor = async (url: string) => {
  // Don't attempt to get average color for local images (development server).
  if (!url || url.startsWith('http://localhost')) {
    throw new Error('Invalid image URL')
  }
  if (url.endsWith('svg')) {
    throw new Error('SVG images are not supported')
  }

  const response = await fetch(
    FAST_AVERAGE_COLOR_API_TEMPLATE.replace('URL', toAccessibleImageUrl(url))
  )

  // Trim newline at the end.
  const color = (await response.text()).trim()

  // Validate color format.
  if (!color.startsWith('#')) {
    throw new Error('Invalid color format')
  }

  return color
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
  /**
   * Fetch average color of an image.
   */
  averageColor: (url: string) =>
    queryOptions({
      queryKey: ['misc', 'averageColor', url],
      queryFn: () => fetchAverageColor(url),
    }),
}
