import { QueryClient } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  getSupportedChains: () => [
    { chainId: 'none-chain', indexer: 'none' },
    { chainId: 'other-chain' },
  ],
}))
import { miscQueries } from './misc'

const q = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })
afterEach(() => vi.unstubAllGlobals())

test('attempts counts on None chains, preserves zeros, labels partial metric sums', async () => {
  const fetcher = vi.fn(async (url: string) =>
    url.includes('none-chain') ? Response.json(0) : Response.json(null)
  )
  vi.stubGlobal('fetch', fetcher)
  const result = await q().fetchQuery(
    miscQueries.homePageStats({ mode: 'week' })
  )
  expect(result.week?.daos).toBe(0)
  expect(result.week?.coverage?.daos).toEqual({ attempted: 2, responding: 1 })
  expect(result.all).toBeNull()
  expect(result.tvl).toBeNull()
  expect(fetcher).toHaveBeenCalledTimes(8)
  expect(
    fetcher.mock.calls.every(
      ([url]) => url.includes('daysAgo=7') && url.includes('/generic/_/stats/')
    )
  ).toBe(true)
})

test('all missing/malformed/failed responses mean unavailable, not zero', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => Response.json(-1))
  )
  expect(
    (await q().fetchQuery(miscQueries.homePageStats({ mode: 'all' }))).all
  ).toBeNull()
})

test('caches metrics and requests only selected periods', async () => {
  const fetcher = vi.fn(async () => Response.json(4))
  vi.stubGlobal('fetch', fetcher)
  const client = q()
  await client.fetchQuery(
    miscQueries.homePageStats({ chainId: 'none-chain', mode: 'month' })
  )
  await client.fetchQuery(
    miscQueries.homePageStats({ chainId: 'none-chain', mode: 'month' })
  )
  expect(fetcher).toHaveBeenCalledTimes(4)
  await client.fetchQuery(
    miscQueries.homePageStats({ chainId: 'none-chain', mode: 'all' })
  )
  expect(fetcher).toHaveBeenCalledTimes(8)
})
