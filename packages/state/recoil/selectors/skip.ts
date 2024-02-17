import {
  Asset,
  AssetRecommendation,
  MultiChainMsg,
  Asset as SkipAsset,
  Chain as SkipChain,
  RouteResponse as SkipRoute,
} from '@skip-router/core'
import { selector, selectorFamily, waitForAll } from 'recoil'

import { GenericToken, TokenType } from '@dao-dao/types'

import { skipClient } from '../../skip'
import { querySnapperSelector } from './indexer'

export const skipChainsSelector = selector<SkipChain[]>({
  key: 'skipChains',
  get: async () => await skipClient.chains(),
})

export const skipChainSelector = selectorFamily<SkipChain | undefined, string>({
  key: 'skipChain',
  get:
    (chainId) =>
    ({ get }) =>
      get(skipChainsSelector).find((chain) => chain.chainID === chainId),
})

/**
 * Get the info for an asset on a specific chain.
 */
export const skipAssetSelector = selectorFamily<
  SkipAsset | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'skipAsset',
  get:
    ({ chainId, type, denomOrAddress }) =>
    ({ get }) =>
      get(
        querySnapperSelector({
          query: 'skip-asset',
          parameters: {
            chainId,
            denom: denomOrAddress,
            cw20: (type === TokenType.Cw20).toString(),
          },
        })
      ),
})

export const skipChainPfmEnabledSelector = selectorFamily<boolean, string>({
  key: 'skipChainPfmEnabled',
  get:
    (chainId) =>
    ({ get }) => {
      const chain = get(skipChainSelector(chainId))
      return chain?.pfmEnabled || false
    },
})

export const skipAllChainsPfmEnabledSelector = selectorFamily<
  boolean,
  string[]
>({
  key: 'skipAllChainsPfmEnabled',
  get:
    (chainIds) =>
    ({ get }) => {
      const chainsPfmEnabled = get(
        waitForAll(
          chainIds.map((chainId) => skipChainPfmEnabledSelector(chainId))
        )
      )

      return chainsPfmEnabled.every(Boolean)
    },
})

export const skipRecommendedAssetsSelector = selectorFamily<
  AssetRecommendation[],
  {
    fromChainId: string
    denom: string
    toChainId: string
  }
>({
  key: 'skipRecommendedAssets',
  get:
    ({ fromChainId, denom, toChainId }) =>
    async () => {
      try {
        return await skipClient.recommendAssets({
          sourceAssetChainID: fromChainId,
          sourceAssetDenom: denom,
          destChainID: toChainId,
        })
      } catch (err) {
        if (
          err instanceof Error &&
          (err.message.toLowerCase().includes('not found') ||
            err.message.includes('no recommendation found'))
        ) {
          return []
        }

        // Rethrow other errors.
        throw err
      }
    },
})

export const skipRecommendedAssetSelector = selectorFamily<
  AssetRecommendation | undefined,
  {
    fromChainId: string
    denom: string
    toChainId: string
  }
>({
  key: 'skipRecommendedAsset',
  get:
    ({ fromChainId, denom, toChainId }) =>
    ({ get }) => {
      const recommendations = get(
        skipRecommendedAssetsSelector({
          fromChainId,
          denom,
          toChainId,
        })
      )

      const recommendation =
        recommendations.find(({ reason }) => reason === 'BASE_TOKEN') ||
        recommendations.find(({ reason }) => reason === 'MOST_LIQUID') ||
        recommendations.find(({ reason }) => reason === 'DIRECT') ||
        recommendations[0]

      return recommendation
    },
})

// Given a source and destination chain ID, retrieve the single message that can
// be executed to move funds between the two chains using the chain addresses as
// the source or intermediate addresses.
export const skipRouteSelector = selectorFamily<
  SkipRoute,
  {
    fromChainId: string
    toChainId: string
    sourceDenom: string
    // micro-denom value
    amountIn: number | string
  }
>({
  key: 'skipRoute',
  get:
    ({ fromChainId, toChainId, sourceDenom, amountIn }) =>
    async ({ get }) => {
      const asset = get(
        skipRecommendedAssetSelector({
          fromChainId,
          denom: sourceDenom,
          toChainId,
        })
      )?.asset

      if (!asset) {
        throw new Error('No recommended asset found.')
      }

      const route = await skipClient.route({
        sourceAssetChainID: fromChainId,
        sourceAssetDenom: sourceDenom,
        destAssetChainID: toChainId,
        destAssetDenom: asset.denom,
        amountIn: BigInt(amountIn).toString(),
      })

      if (route.doesSwap) {
        throw new Error('Route requires a swap.')
      }

      return route
    },
})

// Given a source and destination chain ID, retrieve the single message that can
// be executed to move funds between the two chains using the chain addresses as
// the source or intermediate addresses.
export const skipRouteMessageSelector = selectorFamily<
  MultiChainMsg,
  {
    // Map chain ID to address on that chain that can serve as the source or
    // intermediate address for transfers.
    chainAddresses: Record<string, string | undefined>
    fromChainId: string
    toChainId: string
    sourceDenom: string
    toAddress: string
    // micro-denom value
    amountIn: number | string
  }
>({
  key: 'skipRouteMessage',
  get:
    ({
      chainAddresses,
      fromChainId,
      toChainId,
      sourceDenom,
      toAddress,
      amountIn,
    }) =>
    async ({ get }) => {
      const route = get(
        skipRouteSelector({
          fromChainId,
          toChainId,
          sourceDenom,
          amountIn,
        })
      )

      const addressList = [
        ...route.chainIDs
          .slice(0, -1)
          .map((chainId) => chainAddresses[chainId]),
        toAddress,
      ]
      if (!addressList.every(Boolean)) {
        throw new Error(
          `Missing accounts for chain(s): ${addressList
            .flatMap((address, index) => (address ? [] : route.chainIDs[index]))
            .join(', ')}.`
        )
      }

      const msgs = await skipClient.messages({
        ...route,
        addressList: addressList as string[],
        slippageTolerancePercent: '0',
      })

      if (msgs.length !== 1) {
        throw new Error('Route requires multiple messages.')
      }

      const msg = msgs[0]
      if (!('multiChainMsg' in msg)) {
        throw new Error('Route requires invalid message type.')
      }

      return msg.multiChainMsg
    },
})

/**
 * Get the recommended asset for a token on a given chain.
 */
export const skipRecommendedAssetForGenericTokenSelector = selectorFamily<
  Asset | undefined,
  Pick<GenericToken, 'type' | 'denomOrAddress'> & {
    sourceChainId: string
    targetChainId: string
  }
>({
  key: 'chainSymbolForToken',
  get:
    ({ type, denomOrAddress, sourceChainId, targetChainId }) =>
    ({ get }) =>
      get(
        skipRecommendedAssetSelector({
          fromChainId: sourceChainId,
          denom: (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress,
          toChainId: targetChainId,
        })
      )?.asset,
})
