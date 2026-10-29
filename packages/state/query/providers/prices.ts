import { GenericTokenSource, TokenType } from '@dao-dao/types'

export type MarketQuote = {
  usdPrice: number
  provider: 'coinbase' | 'kraken'
  market: string
  updatedAt: number
  fetchedAt: number
}
export type PriceMarket = {
  chainId: string
  denom: string
  decimals: number
  coinbase?: string
  kraken?: string
}

/** Canonical native assets only. See docs/data-providers.md for provenance and limits. */
const markets: PriceMarket[] = [
  {
    chainId: 'osmosis-1',
    denom: 'uosmo',
    decimals: 6,
    coinbase: 'OSMO-USD',
    kraken: 'OSMOUSD',
  },
  { chainId: 'cosmoshub-4', denom: 'uatom', decimals: 6, coinbase: 'ATOM-USD' },
  { chainId: 'celestia', denom: 'utia', decimals: 6, coinbase: 'TIA-USD' },
  { chainId: 'injective-1', denom: 'inj', decimals: 18, coinbase: 'INJ-USD' },
  { chainId: 'pacific-1', denom: 'usei', decimals: 6, coinbase: 'SEI-USD' },
  { chainId: 'akashnet-2', denom: 'uakt', decimals: 6, coinbase: 'AKT-USD' },
  { chainId: 'axelar-dojo-1', denom: 'uaxl', decimals: 6, coinbase: 'AXL-USD' },
  { chainId: 'noble-1', denom: 'uusdc', decimals: 6, kraken: 'USDCUSD' },
]
export const findPriceMarket = (source: GenericTokenSource) =>
  source.type === TokenType.Native
    ? markets.find(
        (m) => m.chainId === source.chainId && m.denom === source.denomOrAddress
      )
    : undefined
export const isAllowedMarket = (
  provider: 'coinbase' | 'kraken',
  market: string
) => markets.some((m) => m[provider] === market)
export const freshQuote = (
  quote: MarketQuote | null | undefined,
  now = Date.now()
) =>
  quote &&
  Number.isFinite(quote.updatedAt) &&
  now - quote.updatedAt <= 300_000 &&
  quote.updatedAt - now <= 30_000
    ? quote
    : null

const numericPrice = (value: unknown) =>
  typeof value === 'string' &&
  /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value) &&
  Number.isFinite(Number(value))
    ? Number(value)
    : null
const record = (value: unknown): Record<string, any> | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, any>)
    : null

export const parseCoinbaseQuote = (
  value: unknown,
  market: string,
  now = Date.now()
): MarketQuote | null => {
  const data = record(value)
  const usdPrice = numericPrice(data?.price)
  const updatedAt = typeof data?.time === 'string' ? Date.parse(data.time) : NaN
  return usdPrice === null
    ? null
    : freshQuote(
        { usdPrice, updatedAt, fetchedAt: now, provider: 'coinbase', market },
        now
      )
}

export const parseKrakenQuote = (
  value: unknown,
  market: string,
  now = Date.now()
): MarketQuote | null => {
  const data = record(value)
  if (!Array.isArray(data?.error) || data.error.length) return null
  const trades = record(data.result)?.[market]
  if (!Array.isArray(trades) || !trades.length) return null
  const trade = trades[trades.length - 1]
  if (!Array.isArray(trade) || typeof trade[2] !== 'number') return null
  const usdPrice = numericPrice(trade[0])
  return usdPrice === null
    ? null
    : freshQuote(
        {
          usdPrice,
          updatedAt: trade[2] * 1000,
          fetchedAt: now,
          provider: 'kraken',
          market,
        },
        now
      )
}
