import { snapshot_UNSTABLE } from 'recoil'
import { afterEach, expect, test, vi } from 'vitest'

import { makeDependencyTrackedQueryClient } from '@dao-dao/utils'

import { skipQueries } from '../../query/queries/skip'
import { queryClientAtom } from '../atoms'
import { skipChainSelector, skipRouteMessageSelector } from './skip'

const routeOptions = {
  fromChainId: 'a',
  toChainId: 'b',
  sourceDenom: 'ucoin',
  amountIn: '1',
  chainAddresses: { a: 'source' },
  toAddress: 'dest',
}
const validRoute = {
  chain_ids: ['a', 'b'],
  does_swap: false,
  txs_required: 1,
  operations: [],
}
afterEach(() => vi.unstubAllGlobals())

const setup = (
  route: unknown,
  msgs: unknown = {
    msgs: [
      {
        multi_chain_msg: {
          chain_id: 'a',
          msg_type_url: '/ibc.applications.transfer.v1.MsgTransfer',
          msg: '{}',
          path: ['a', 'b'],
        },
      },
    ],
  }
) => {
  const client = makeDependencyTrackedQueryClient()
  client.queryClient.setDefaultOptions({ queries: { retry: false } })
  const fetcher = vi.fn(async (url: string) =>
    Response.json(
      url.includes('recommend_assets')
        ? {
            recommendation_entries: [
              {
                recommendations: [
                  {
                    reason: 'DIRECT',
                    asset: { chain_id: 'b', denom: 'ucoin' },
                  },
                ],
              },
            ],
          }
        : url.endsWith('/route')
          ? route
          : msgs
    )
  )
  vi.stubGlobal('fetch', fetcher)
  return {
    snapshot: snapshot_UNSTABLE(({ set }) => set(queryClientAtom, client)),
    fetcher,
    client,
  }
}

test('Recoil and React Query share one chain list', async () => {
  const { snapshot, client, fetcher } = setup({})
  fetcher.mockImplementation(async () =>
    Response.json({
      chains: [
        {
          chain_id: 'a',
          ibc_capabilities: { cosmos_pfm: false },
          pfm_enabled: true,
        },
      ],
    })
  )
  const [raw] = await Promise.all([
    snapshot.getPromise(skipChainSelector('a')),
    client.fetchQuery(skipQueries.chainRaw({ chainId: 'a' })),
  ])
  expect(raw?.chain_id).toBe('a')
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('unknown PFM capability fails closed on an upstream outage', async () => {
  const { client, fetcher } = setup({})
  fetcher.mockImplementation(async () => Response.json({}, { status: 400 }))
  expect(
    await client.fetchQuery(skipQueries.chainPfmEnabled({ chainId: 'a' }))
  ).toBe(false)
})

test.each([
  { ...validRoute, does_swap: true },
  { ...validRoute, txs_required: 2 },
  { chain_ids: null },
])('rejects unsafe route %s', async (route) => {
  await expect(
    setup(route).snapshot.getPromise(skipRouteMessageSelector(routeOptions))
  ).rejects.toThrow()
})

test('requires intermediate accounts and supports a single transfer message', async () => {
  await expect(
    setup({
      ...validRoute,
      chain_ids: ['a', 'middle', 'b'],
    }).snapshot.getPromise(skipRouteMessageSelector(routeOptions))
  ).rejects.toThrow('Missing accounts')
  expect(
    (
      await setup(validRoute).snapshot.getPromise(
        skipRouteMessageSelector(routeOptions)
      )
    ).msg_type_url
  ).toBe('/ibc.applications.transfer.v1.MsgTransfer')
})

test.each([
  { msgs: [] },
  { msgs: [{ multi_chain_msg: { msg_type_url: '/bad' } }] },
])('rejects unsupported message envelopes', async (msgs) => {
  await expect(
    setup(validRoute, msgs).snapshot.getPromise(
      skipRouteMessageSelector(routeOptions)
    )
  ).rejects.toThrow()
})
