import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  AmountWithTimestampAndDenom,
  ChainId,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  OSMOSIS_API_BASE,
  getIbcTransferInfoBetweenChains,
} from '@dao-dao/utils'

import { ibcRpcClientForChainSelector } from './chain'
import { sourceChainAndDenomSelector } from './token'

export const osmosisSymbolForDenomSelector = selectorFamily<
  string | undefined,
  // denom
  string
>({
  key: 'osmosisSymbolForDenom',
  get: (denom) => async () => {
    try {
      const { symbol } = await (
        await fetch(OSMOSIS_API_BASE + '/search/v1/symbol?denom=' + denom)
      ).json()
      return symbol
    } catch {
      return undefined
    }
  },
})

export const osmosisUsdPriceSelector = selectorFamily<
  AmountWithTimestampAndDenom | undefined,
  // denom
  string
>({
  key: 'osmosisUsdPrice',
  get:
    (denom) =>
    async ({ get }) => {
      const symbol = get(osmosisSymbolForDenomSelector(denom))
      if (!symbol) {
        return
      }

      try {
        const { price } = await (
          await fetch(OSMOSIS_API_BASE + '/tokens/v2/price/' + symbol)
        ).json()

        return {
          denom,
          amount: price,
          timestamp: new Date(),
        }
      } catch {
        return undefined
      }
    },
})

export const osmosisDenomForTokenSelector = selectorFamily<
  string | undefined,
  WithChainId<{ denom: string }>
>({
  key: 'osmosisDenomForToken',
  get:
    ({ denom, chainId }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      const { chainId: sourceChainId, denomOrAddress: baseDenom } = get(
        sourceChainAndDenomSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        })
      )

      // If source chain is Osmosis, the denom is the base denom.
      if (sourceChainId === ChainId.OsmosisMainnet) {
        return baseDenom
      } else {
        // Otherwise get the Osmosis IBC denom.
        const osmosisIbc = get(
          ibcRpcClientForChainSelector(ChainId.OsmosisMainnet)
        )
        const { sourceChannel } = getIbcTransferInfoBetweenChains(
          ChainId.OsmosisMainnet,
          sourceChainId
        )

        let osmosisDenomIbcHash
        try {
          osmosisDenomIbcHash = (
            await osmosisIbc.applications.transfer.v1.denomHash({
              trace: `transfer/${sourceChannel}/${baseDenom}`,
            })
          ).hash
        } catch (err) {
          // If trace not found, return undefined.
          if (
            err instanceof Error &&
            err.message.includes('denomination trace not found')
          ) {
            return
          }

          throw err
        }

        // Construct Osmosis IBC denom.
        return 'ibc/' + osmosisDenomIbcHash
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
// native denom from any chain into Osmosis denom if possible.
export const historicalUsdPriceSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  WithChainId<{
    denom: string
    precision: OsmosisHistoricalPriceChartPrecision
  }>
>({
  key: 'historicalUsdPrice',
  get:
    ({ chainId, denom, precision }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Try to resolve Osmosis denom.
      const osmosisDenom = get(osmosisDenomForTokenSelector({ chainId, denom }))

      // If found a denom, resolved Osmosis denom correctly.
      if (!osmosisDenom) {
        return
      }

      const symbol = get(osmosisSymbolForDenomSelector(osmosisDenom))
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
