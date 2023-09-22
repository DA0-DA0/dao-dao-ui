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
  getChainForChainName,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromChainSource,
} from '@dao-dao/utils'

import { ibcRpcClientForChainSelector } from './chain'

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

      // If already on Osmosis, return the denom.
      if (chainId === ChainId.OsmosisMainnet) {
        return denom
      }

      // Try to reverse engineer denom and get the osmosis price.
      try {
        const ibc = get(ibcRpcClientForChainSelector(chainId))
        const trace = denom.startsWith('ibc/')
          ? (
              await ibc.applications.transfer.v1.denomTrace({
                hash: denom,
              })
            ).denomTrace
          : undefined

        let sourceChainId = chainId
        let baseDenom = denom

        // If trace exists, resolve IBC denom and then get its Osmosis IBC
        // denom to find its price.
        if (trace) {
          let channels = trace.path.split('transfer/').slice(1)
          // Trim trailing slash from all but last channel.
          channels = channels.map((channel, index) =>
            index === channels.length - 1 ? channel : channel.slice(0, -1)
          )
          if (channels.length) {
            // Retrace channel paths to find source chain of denom.
            sourceChainId = channels.reduce(
              (currentChainId, channel) =>
                getChainForChainName(
                  getIbcTransferInfoFromChainSource(currentChainId, channel)
                    .destinationChain.chain_name
                ).chain_id,
              chainId
            )

            baseDenom = trace.baseDenom
          }
        }

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
          const { hash: osmosisDenomIbcHash } =
            await osmosisIbc.applications.transfer.v1.denomHash({
              trace: `transfer/${sourceChannel}/${baseDenom}`,
            })

          // Construct Osmosis IBC denom.
          return 'ibc/' + osmosisDenomIbcHash
        }
      } catch (err) {
        // If not error, rethrow. This may be a promise, which is how
        // recoil waits for the `get` to resolve.
        if (!(err instanceof Error)) {
          throw err
        }

        // On failure, do nothing.
      }
    },
})

// Returns price every 24 hours for as far back as Osmosis allows.
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
        return undefined
      }

      const symbol = get(osmosisSymbolForDenomSelector(osmosisDenom))
      if (!symbol) {
        return
      }

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
