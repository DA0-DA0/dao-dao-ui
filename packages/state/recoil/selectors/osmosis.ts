import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  ChainId,
  GenericToken,
  GenericTokenWithUsdPrice,
} from '@dao-dao/types'
import { MAINNET, OSMOSIS_API_BASE } from '@dao-dao/utils'

import { skipRecommendedAssetForGenericTokenSelector } from './skip'
import { genericTokenSelector } from './token'

export const osmosisUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'osmosisUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      try {
        const { price } = await (
          await fetch(OSMOSIS_API_BASE + '/tokens/v2/price/' + token.symbol)
        ).json()

        if (typeof price !== 'number') {
          return
        }

        return {
          token,
          usdPrice: price,
          timestamp: new Date(),
        }
      } catch {
        return
      }
    },
})

// 1440 = 24 hours as far back as possible?
// 60 = 1 hour for the past 10 days
// 5 = 5 minutes for the past 5 days
export type OsmosisHistoricalPriceChartPrecision =
  | 'day'
  | 'hour'
  | 'fiveminutes'
export const osmosisPrecisionToMinutes: Record<
  OsmosisHistoricalPriceChartPrecision,
  number
> = {
  day: 1440,
  hour: 60,
  fiveminutes: 5,
}
export const osmosisPrecisionToStartSecondsAgo: Record<
  OsmosisHistoricalPriceChartPrecision,
  number
> = {
  // `day` seems to go back as far as possible, so let's set it to 3 years.
  day: 3 * 365 * 24 * 60 * 60,
  // 10 days ago
  hour: 10 * 24 * 60 * 60,
  // 5 days ago
  fiveminutes: 5 * 24 * 60 * 60,
}

// Returns price every 24 hours for as far back as Osmosis allows.
export const osmosisHistoricalPriceChartSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  {
    symbol: string
    precision: OsmosisHistoricalPriceChartPrecision
  }
>({
  key: 'osmosisHistoricalPriceChart',
  get:
    ({ symbol, precision }) =>
    async () => {
      try {
        const prices: {
          time: number
          close: number
        }[] = await (
          await fetch(
            OSMOSIS_API_BASE +
              '/tokens/v2/historical/' +
              symbol +
              `/chart?tf=${osmosisPrecisionToMinutes[precision]}`
          )
        ).json()

        return prices.map(({ time, close }) => ({
          // seconds to milliseconds
          timestamp: new Date(time * 1000),
          amount: close,
        }))
      } catch {
        return undefined
      }
    },
})

// Returns price every 24 hours for as far back as Osmosis allows. Resolves
// denom from any chain into Osmosis denom if possible.
export const historicalUsdPriceSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'> & {
    precision: OsmosisHistoricalPriceChartPrecision
  }
>({
  key: 'historicalUsdPrice',
  get:
    ({ chainId, type, denomOrAddress, precision }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Try to resolve Osmosis denom.
      const asset = get(
        skipRecommendedAssetForGenericTokenSelector({
          type,
          denomOrAddress,
          sourceChainId: chainId,
          targetChainId: ChainId.OsmosisMainnet,
        })
      )

      const symbol = asset?.recommendedSymbol || asset?.symbol

      // If found a symbol, resolved Osmosis denom correctly.
      if (!symbol) {
        return
      }

      return get(
        osmosisHistoricalPriceChartSelector({
          symbol,
          precision,
        })
      )
    },
})
