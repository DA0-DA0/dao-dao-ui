import { expect, test } from 'vitest'

import { TokenType } from '@dao-dao/types'

import {
  findPriceMarket,
  parseCoinbaseQuote,
  parseKrakenQuote,
  freshQuote,
} from './prices'

const now = Date.parse('2026-10-28T18:00:00Z')
const time = new Date(now).toISOString()

test('matches canonical chain/type/denom only, with explicit decimals', () => {
  expect(
    findPriceMarket({
      chainId: 'cosmoshub-4',
      type: TokenType.Native,
      denomOrAddress: 'uatom',
    })
  ).toMatchObject({ coinbase: 'ATOM-USD', decimals: 6 })
  expect(
    findPriceMarket({
      chainId: 'injective-1',
      type: TokenType.Native,
      denomOrAddress: 'inj',
    })?.decimals
  ).toBe(18)
  expect(
    findPriceMarket({
      chainId: 'impostor',
      type: TokenType.Native,
      denomOrAddress: 'uatom',
    })
  ).toBeUndefined()
  expect(
    findPriceMarket({
      chainId: 'cosmoshub-4',
      type: TokenType.Cw20,
      denomOrAddress: 'uatom',
    })
  ).toBeUndefined()
})

test.each([null, '', ' ', true, 'Infinity', '-1', {}, '1e400'])(
  'rejects malformed or negative price %s',
  (price) => {
    expect(parseCoinbaseQuote({ price, time }, 'ATOM-USD', now)).toBeNull()
  }
)

test('keeps a genuine zero and source timestamp, expires on reuse', () => {
  const quote = parseCoinbaseQuote({ price: '0', time }, 'ATOM-USD', now)
  expect(quote).toMatchObject({ usdPrice: 0, updatedAt: now, fetchedAt: now })
  expect(freshQuote(quote, now + 300001)).toBeNull()
})

test.each([
  'invalid',
  new Date(now - 300001).toISOString(),
  new Date(now + 30001).toISOString(),
])('rejects invalid/stale/future time %s', (time) => {
  expect(
    parseCoinbaseQuote({ price: '3.25', time }, 'ATOM-USD', now)
  ).toBeNull()
})

test('validates Kraken envelope, exact pair and trade timestamp seconds', () => {
  const data = {
    error: [],
    result: { USDCUSD: [['0.99', '1', now / 1000, 'b', 'l', '']], last: '999' },
  }
  expect(parseKrakenQuote(data, 'USDCUSD', now)).toMatchObject({
    usdPrice: 0.99,
    updatedAt: now,
  })
  expect(parseKrakenQuote(data, 'OSMOUSD', now)).toBeNull()
  expect(
    parseKrakenQuote(
      { ...data, error: ['EAPI:Rate limit exceeded'] },
      'USDCUSD',
      now
    )
  ).toBeNull()
})
