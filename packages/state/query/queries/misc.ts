import { QueryClient, queryOptions } from '@tanstack/react-query'

import { DaoDaoIndexerAllStats, DaoDaoIndexerChainStats } from '@dao-dao/types'
import { INDEXER_URL, getSupportedChains } from '@dao-dao/utils'

import { fetchPublicJson } from '../providers/http'

const metrics = ['daos', 'proposals', 'votes', 'uniqueVoters'] as const
export type StatsMode = 'all' | 'month' | 'week'

/** Narrow count-only exception: never changes generic indexer mode/catch-up gates. */
export const statsQueries = {
  metric: (options: {
    chainId: string
    metric: (typeof metrics)[number]
    mode: StatsMode
  }) =>
    queryOptions({
      queryKey: ['stats', options],
      retry: false,
      staleTime: (q) => (q.state.data === null ? 60_000 : 3_600_000),
      queryFn: async () => {
        if (
          !getSupportedChains().some((c) => c.chainId === options.chainId) ||
          !metrics.includes(options.metric)
        )
          return null
        const days =
          options.mode === 'week'
            ? 7
            : options.mode === 'month'
              ? 30
              : undefined
        const params = days ? '?daysAgo=' + days : ''
        try {
          const value = await fetchPublicJson(
            'indexer-stats',
            `${INDEXER_URL}/${encodeURIComponent(options.chainId)}/generic/_/stats/${options.metric}${params}`
          )
          return typeof value === 'number' &&
            Number.isSafeInteger(value) &&
            value >= 0
            ? value
            : null
        } catch {
          return null
        }
      },
    }),
}

export const emptyHomePageStats = (
  chainId?: string
): DaoDaoIndexerAllStats => ({
  all: null,
  month: null,
  week: null,
  tvl: null,
  chains: chainId ? 1 : getSupportedChains().length,
})

/** Only the visible period is queried. Every configured current-network chain is
 * attempted, including None. Unavailable metrics never masquerade as zero.
 */
export const fetchHomePageStats = async (
  queryClient: QueryClient,
  { chainId, mode = 'all' }: { chainId?: string; mode?: StatsMode }
): Promise<DaoDaoIndexerAllStats> => {
  const chains = getSupportedChains().filter(
    (c) => !chainId || c.chainId === chainId
  )
  const entries = await Promise.all(
    metrics.map(async (metric) => {
      const counts = await Promise.all(
        chains.map(({ chainId }) =>
          queryClient.fetchQuery(statsQueries.metric({ chainId, metric, mode }))
        )
      )
      const responding = counts.filter((n): n is number => n !== null)
      return {
        metric,
        count: responding.length ? responding.reduce((a, b) => a + b, 0) : null,
        coverage: { attempted: chains.length, responding: responding.length },
      }
    })
  )
  const stats: DaoDaoIndexerChainStats | null = entries.every(
    (e) => e.count === null
  )
    ? null
    : ({
        ...Object.fromEntries(entries.map((e) => [e.metric, e.count])),
        coverage: Object.fromEntries(
          entries.map((e) => [e.metric, e.coverage])
        ),
      } as DaoDaoIndexerChainStats)
  return { ...emptyHomePageStats(chainId), [mode]: stats }
}

export const miscQueries = {
  homePageStats: (options: Parameters<typeof fetchHomePageStats>[1]) =>
    queryOptions({
      queryKey: ['misc', 'homePageStats', options],
      retry: false,
      staleTime: 60_000,
      queryFn: (ctx) => fetchHomePageStats(ctx.client, options),
    }),
}
