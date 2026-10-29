import { expect, test } from 'vitest'

import {
  fixtureIbcDenom,
  pricingFixtureResponse,
} from '../../tests/helpers/snapperFreePricing'
import { QueryCommunityPoolResponse } from '../../types/protobuf/codegen/cosmos/distribution/v1beta1/query'

test('browser pool fixtures preserve native/IBC/unsupported raw balances on the protobuf wire', () => {
  const response = pricingFixtureResponse(
    new URL('https://rpc.example.com'),
    {
      id: 1,
      method: 'abci_query',
      params: { path: '/cosmos.distribution.v1beta1.Query/CommunityPool' },
    },
    'fresh'
  )
  const value = (response?.body as any).result.response.value
  expect(
    QueryCommunityPoolResponse.decode(Buffer.from(value, 'base64')).pool
  ).toEqual([
    { denom: 'uatom', amount: '1000000' },
    { denom: fixtureIbcDenom, amount: '2000000' },
    { denom: 'usmoke', amount: '3000000' },
  ])
})

test('browser fixture quotes have controlled source times and cannot accidentally recover through Kraken', () => {
  const now = Date.now()
  const url = new URL(
    'https://api.exchange.coinbase.com/products/ATOM-USD/ticker'
  )
  expect(pricingFixtureResponse(url, null, 'fresh', now)?.body).toEqual({
    price: '2',
    time: new Date(now).toISOString(),
  })
  expect(pricingFixtureResponse(url, null, 'stale', now)?.body).toEqual({
    price: '2',
    time: new Date(now - 360000).toISOString(),
  })
  expect(pricingFixtureResponse(url, null, 'outage', now)?.status).toBe(400)
  const kraken = pricingFixtureResponse(
    new URL('https://api.kraken.com/0/public/Trades?pair=OSMOUSD'),
    null,
    'stale',
    now
  )
  expect((kraken?.body as any).result.OSMOUSD[0][2]).toBe((now - 360000) / 1000)
})

test('browser fixtures never fulfill write requests or invent unknown query results', () => {
  for (const method of ['broadcast_tx_sync', 'abci_query'])
    expect(
      pricingFixtureResponse(
        new URL('https://rpc.example.com'),
        { id: 1, method, params: { path: '/unknown' } },
        'fresh'
      )
    ).toBeUndefined()
})
