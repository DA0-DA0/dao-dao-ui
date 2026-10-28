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

test('missing Skip decimals fall through to CW20 metadata instead of inventing zero', async () => {
  const { skipQueries } = await import('./skip')
  const { cw20BaseQueries } = await import('./contracts/Cw20Base')
  const q = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  const source = {
    chainId: 'a',
    type: TokenType.Cw20,
    denomOrAddress: 'contract',
  }
  q.setQueryData(tokenQueries.source(source).queryKey, source)
  q.setQueryData(skipQueries.asset(source).queryKey, {
    chain_id: 'a',
    denom: 'cw20:contract',
    token_contract: 'contract',
    is_cw20: true,
    decimals: null,
  } as any)
  q.setQueryData(
    cw20BaseQueries.tokenInfo({ chainId: 'a', contractAddress: 'contract' })
      .queryKey,
    { symbol: 'REAL', decimals: 6, name: 'Token', total_supply: '1' }
  )
  q.setQueryData(
    tokenQueries.cw20LogoUrl({ chainId: 'a', address: 'contract' }).queryKey,
    null
  )
  expect(await q.fetchQuery(tokenQueries.info(source))).toMatchObject({
    symbol: 'REAL',
    decimals: 6,
  })
})

test('a provider outage is cached as unavailable rather than causing a token fan-out storm', async () => {
  const q = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  q.setQueryData(tokenQueries.info(atom).queryKey, makeToken())
  const fetcher = vi.fn(async () => Response.json({}, { status: 400 }))
  vi.stubGlobal('fetch', fetcher)
  for (let i = 0; i < 8; i++)
    expect(
      (await q.fetchQuery(tokenQueries.usdPrice(atom))).usdPrice
    ).toBeUndefined()
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('missing Skip origin fields do not disable local/CW20 source fallbacks', async () => {
  const { skipQueries } = await import('./skip')
  const source = {
    chainId: 'a',
    type: TokenType.Cw20,
    denomOrAddress: 'contract',
  }
  const q = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  q.setQueryData(skipQueries.asset(source).queryKey, {
    chain_id: 'a',
    denom: 'cw20:contract',
    is_cw20: true,
    origin_denom: null,
  } as any)
  expect(await q.fetchQuery(tokenQueries.source(source))).toEqual(source)
})

test.each(['juno-1', 'secret-4'])(
  'CW20 identity and code hash survive absent/null Skip contract metadata on %s',
  async (chainId) => {
    const { contractQueries } = await import('./contract')
    for (const token_contract of [undefined, null]) {
      const q = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      })
      const denomOrAddress =
        chainId === 'secret-4' ? 'secret1contract' : 'juno1contract'
      const source = { chainId, type: TokenType.Cw20, denomOrAddress }
      const asset = {
        chain_id: chainId,
        denom: 'cw20:' + denomOrAddress,
        origin_chain_id: chainId,
        origin_denom: 'cw20:' + denomOrAddress,
        is_cw20: true,
        token_contract,
        decimals: 6,
        symbol: 'TOKEN',
      }
      const fetcher = vi.fn(async () =>
        Response.json({
          chain_to_assets_map: {
            [chainId]: {
              assets: [
                {
                  ...asset,
                  denom: denomOrAddress,
                  is_cw20: false,
                  symbol: 'IMPOSTOR',
                },
                asset,
              ],
            },
          },
        })
      )
      vi.stubGlobal('fetch', fetcher)
      q.setQueryData(
        contractQueries.secretCodeHash({ chainId, address: denomOrAddress })
          .queryKey,
        'verified-code-hash'
      )
      const token = await q.fetchQuery(tokenQueries.info(source))
      expect(token).toMatchObject({
        ...source,
        symbol: 'TOKEN',
        decimals: 6,
        snip20CodeHash: chainId === 'secret-4' ? 'verified-code-hash' : null,
      })
      expect(fetcher).toHaveBeenCalledTimes(1)
      q.clear()
    }
  }
)
