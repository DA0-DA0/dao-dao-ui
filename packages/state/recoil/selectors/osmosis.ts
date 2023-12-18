import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  ChainId,
  GenericToken,
  GenericTokenWithUsdPrice,
  TokenType,
} from '@dao-dao/types'
import { MAINNET, OSMOSIS_API_BASE } from '@dao-dao/utils'

import { skipRecommendedAssetSelector } from './skip'
import { genericTokenSelector } from './token'

export const osmosisUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'osmosisUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const symbol = get(osmosisSymbolForTokenSelector(params))
      if (!symbol) {
        return
      }

      const token = get(genericTokenSelector(params))

      try {
        const { price } = await (
          await fetch(OSMOSIS_API_BASE + '/tokens/v2/price/' + symbol)
        ).json()

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

export const osmosisSymbolForTokenSelector = selectorFamily<
  string | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'osmosisSymbolForToken',
  get:
    ({ chainId, type, denomOrAddress }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return
      }

      try {
        const skipRecommendedAsset = get(
          skipRecommendedAssetSelector({
            fromChainId: chainId,
            denom: (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress,
            toChainId: ChainId.OsmosisMainnet,
          })
        )

        if (!skipRecommendedAsset) {
          return
        }

        return skipRecommendedAsset.asset.symbol
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes('base token') &&
          err.message.includes('not found')
        ) {
          return
        }

        // Throw other errors. This is also necessary to throw the promise
        // returned by the `get` function when the data is still loading (recoil
        // internal process).
        throw err
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
      const symbol = get(
        osmosisSymbolForTokenSelector({ chainId, type, denomOrAddress })
      )

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
