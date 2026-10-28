import { GenericTokenWithUsdPrice } from '@dao-dao/types'

/** Check absolute source age on use, not the time a cache entry was read. */
export const isFreshUsdPrice = (
  quote:
    | Pick<GenericTokenWithUsdPrice, 'usdPrice' | 'timestamp'>
    | null
    | undefined
): quote is { usdPrice: number; timestamp: Date } =>
  typeof quote?.usdPrice === 'number' &&
  Number.isFinite(quote.usdPrice) &&
  quote.usdPrice >= 0 &&
  quote.timestamp instanceof Date &&
  Number.isFinite(quote.timestamp.getTime()) &&
  Date.now() - quote.timestamp.getTime() <= 300_000 &&
  quote.timestamp.getTime() - Date.now() <= 30_000

export const sumUsdEstimates = (values: (number | undefined)[]) => {
  const priced = values.filter(
    (v): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0
  )
  return {
    amount:
      priced.length || !values.length
        ? priced.reduce((a, b) => a + b, 0)
        : null,
    partial: priced.length < values.length,
  }
}
