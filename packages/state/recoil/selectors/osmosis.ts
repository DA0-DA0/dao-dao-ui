import { selectorFamily } from 'recoil'

import {
  AmountWithTimestamp,
  AmountWithTimestampAndDenom,
  ChainId,
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

// Returns price every 24 hours for as far back as Osmosis allows.
export const osmosisHistoricalPriceChartSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  string
>({
  key: 'osmosisHistoricalPriceChart',
  get: (symbol) => async () => {
    try {
      const prices: {
        time: number
        close: number
      }[] = await (
        await fetch(
          OSMOSIS_API_BASE +
            '/tokens/v2/historical/' +
            symbol +
            '/chart?tf=1440'
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
  WithChainId<{ denom: string }>
>({
  key: 'historicalUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Try to resolve Osmosis denom.
      const osmosisDenom = get(osmosisDenomForTokenSelector(params))

      // If found a denom, resolved Osmosis denom correctly.
      if (!osmosisDenom) {
        return
      }

      const symbol = get(osmosisSymbolForDenomSelector(osmosisDenom))
      if (!symbol) {
        return
      }

      return get(osmosisHistoricalPriceChartSelector(symbol))
    },
})
