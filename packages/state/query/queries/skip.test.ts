import { QueryClient } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'

import { skipQueries } from './skip'

const client = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })
afterEach(() => vi.unstubAllGlobals())

test('chain list is shared; modern false overrides legacy true', async () => {
  const fetcher = vi.fn(async (_url: string, _init?: RequestInit) =>
    Response.json({
      chains: [
        {
          chain_id: 'a',
          pfm_enabled: true,
          ibc_capabilities: { cosmos_pfm: false },
        },
        { chain_id: 'b' },
      ],
    })
  )
  vi.stubGlobal('fetch', fetcher)
  const q = client()
  const chains = await Promise.all(
    ['a', 'b'].map((chainId) => q.fetchQuery(skipQueries.chainRaw({ chainId })))
  )
  expect(chains.map((c) => c?.chain_id)).toEqual(['a', 'b'])
  expect(
    await q.fetchQuery(skipQueries.chainPfmEnabled({ chainId: 'a' }))
  ).toBe(false)
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('filters exact identity from a single per-chain list with plural chain_ids', async () => {
  const fetcher = vi.fn(async (_url: string, _init?: RequestInit) =>
    Response.json({
      chain_to_assets_map: {
        a: {
          assets: [
            { chain_id: 'a', denom: 'same', is_cw20: false, decimals: null },
            {
              chain_id: 'a',
              denom: 'cw20:same',
              token_contract: 'same',
              is_cw20: true,
              decimals: 6,
            },
          ],
        },
      },
    })
  )
  vi.stubGlobal('fetch', fetcher)
  const q = client()
  const [native, cw20] = await Promise.all(
    [TokenType.Native, TokenType.Cw20].map((type) =>
      q.fetchQuery(
        skipQueries.asset({ chainId: 'a', type, denomOrAddress: 'same' })
      )
    )
  )
  expect(native.is_cw20).toBe(false)
  expect(native.decimals).toBeNull()
  expect(cw20.is_cw20).toBe(true)
  expect(fetcher).toHaveBeenCalledTimes(1)
  expect(fetcher.mock.calls[0][0]).toContain(
    'chain_ids=a&include_cw20_assets=true'
  )
})

test('caches unavailable lists briefly even for sequential missing-token requests', async () => {
  const fetcher = vi.fn(async (_url: string, _init?: RequestInit) =>
    Response.json({}, { status: 400 })
  )
  vi.stubGlobal('fetch', fetcher)
  const q = client()
  for (const denomOrAddress of ['one', 'two']) {
    await expect(
      q.fetchQuery(
        skipQueries.asset({
          chainId: 'a',
          type: TokenType.Native,
          denomOrAddress,
        })
      )
    ).rejects.toThrow()
  }
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('recommendation priority and destination are preserved', async () => {
  const fetcher = vi.fn(async (_url: string, _init?: RequestInit) =>
    Response.json({
      recommendation_entries: [
        {
          recommendations: [
            { reason: 'DIRECT', asset: { chain_id: 'b', denom: 'direct' } },
            {
              reason: 'BASE_TOKEN',
              asset: { chain_id: 'wrong', denom: 'wrong' },
            },
            { reason: 'BASE_TOKEN', asset: { chain_id: 'b', denom: 'base' } },
          ],
        },
      ],
    })
  )
  vi.stubGlobal('fetch', fetcher)
  expect(
    (
      await client().fetchQuery(
        skipQueries.recommendedAsset({
          fromChainId: 'a',
          denom: 'x',
          toChainId: 'b',
        })
      )
    ).denom
  ).toBe('base')
  expect(fetcher.mock.calls[0][0]).toContain('/v2/fungible/recommend_assets')
  expect(JSON.parse(fetcher.mock.calls[0][1]!.body as string)).toEqual({
    requests: [
      {
        source_asset_chain_id: 'a',
        source_asset_denom: 'x',
        dest_chain_id: 'b',
      },
    ],
  })
})

test('entry errors reject while a valid empty recommendation list remains empty', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url: string, _init?: RequestInit) =>
      Response.json({ recommendation_entries: [{ error: { message: 'bad' } }] })
    )
  )
  await expect(
    client().fetchQuery(
      skipQueries.recommendations({
        fromChainId: 'a',
        denom: 'x',
        toChainId: 'b',
      })
    )
  ).rejects.toThrow()
  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url: string, _init?: RequestInit) =>
      Response.json({ recommendation_entries: [{ recommendations: [] }] })
    )
  )
  expect(
    await client().fetchQuery(
      skipQueries.recommendations({
        fromChainId: 'a',
        denom: 'x',
        toChainId: 'b',
      })
    )
  ).toEqual([])
})
