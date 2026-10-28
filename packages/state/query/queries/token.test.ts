import { QueryClient } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { GenericToken, TokenType } from '@dao-dao/types'

vi.mock('@dao-dao/utils', async (original) => ({
  ...(await original<typeof import('@dao-dao/utils')>()),
  MAINNET: true,
}))

import { tokenQueries } from './token'

const atom = {
  chainId: 'cosmoshub-4',
  type: TokenType.Native,
  denomOrAddress: 'uatom',
}
const makeToken = (source = atom, decimals = 6): GenericToken => ({
  ...source,
  source: atom,
  symbol: 'ATOM',
  decimals,
})
afterEach(() => vi.unstubAllGlobals())

test('canonical IBC/native copies share one quote with source time, not fetch time', async () => {
  const q = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  const ibc = {
    chainId: 'osmosis-1',
    type: TokenType.Native,
    denomOrAddress: 'ibc/ATOM',
  }
  q.setQueryData(tokenQueries.info(atom).queryKey, makeToken())
  q.setQueryData(tokenQueries.info(ibc).queryKey, makeToken(ibc))
  const time = new Date(Date.now() - 10000).toISOString()
  const fetcher = vi.fn(async () => Response.json({ price: '3.25', time }))
  vi.stubGlobal('fetch', fetcher)
  const results = await Promise.all(
    [atom, ibc].map((s) => q.fetchQuery(tokenQueries.usdPrice(s)))
  )
  expect(results.map((r) => r.usdPrice)).toEqual([3.25, 3.25])
  expect(results[0].timestamp?.getTime()).toBe(Date.parse(time))
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('decimals mismatch and CW20 impostors have no price or network request', async () => {
  const q = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  const cw20 = { ...atom, type: TokenType.Cw20 }
  q.setQueryData(tokenQueries.info(atom).queryKey, makeToken(atom, 18))
  q.setQueryData(tokenQueries.info(cw20).queryKey, {
    ...makeToken(cw20),
    source: cw20,
  })
  const fetcher = vi.fn()
  vi.stubGlobal('fetch', fetcher)
  for (const source of [atom, cw20])
    expect(
      (await q.fetchQuery(tokenQueries.usdPrice(source))).usdPrice
    ).toBeUndefined()
  expect(fetcher).not.toHaveBeenCalled()
})
