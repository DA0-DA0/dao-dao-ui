import { selector, selectorFamily } from 'recoil'

import {
  AmountWithTimestampAndDenom,
  WyndPools,
  WyndPrices,
} from '@dao-dao/types'
import {
  AssetInfo,
  SwapOperation,
} from '@dao-dao/types/contracts/WyndexMultiHop'
import { WYND_API_BASE } from '@dao-dao/utils'

import { refreshTokenUsdcPriceAtom } from '../atoms'

export const wyndPoolsSelector = selector<WyndPools | undefined>({
  key: 'wyndPools',
  get: async () => {
    try {
      const wyndPools = await fetch(WYND_API_BASE + '/pools')
      return (await wyndPools.json()) as WyndPools
    } catch {
      return undefined
    }
  },
})

export const wyndPricesSelector = selector<WyndPrices | undefined>({
  key: 'wyndPrices',
  get: async ({ get }) => {
    get(refreshTokenUsdcPriceAtom(''))
    try {
      const wyndPools = await fetch(WYND_API_BASE + '/assets/prices')
      return (await wyndPools.json()) as WyndPrices
    } catch {
      return undefined
    }
  },
})

// Price of 1 macro token of the specified denom or address.
export const wyndUsdPriceSelector = selectorFamily<
  AmountWithTimestampAndDenom | undefined,
  // denomOrAddress
  string
>({
  key: 'wyndPrice',
  get:
    (denomOrAddress) =>
    ({ get }) => {
      const timestamp = new Date()

      const wyndPrices = get(wyndPricesSelector)
      const price = wyndPrices?.find(
        ({ asset }) => asset === denomOrAddress
      )?.priceInUsd

      if (!price) {
        return
      }

      return {
        denom: denomOrAddress,
        amount: price,
        timestamp,
      }
    },
})

// Get swap operations for a given ask and offer asset pair. Returned from offer
// to ask.
export const wyndSwapOperationsSelector = selectorFamily<
  SwapOperation[] | undefined,
  {
    offerAsset: AssetInfo
    askAsset: AssetInfo
  }
>({
  key: 'wyndSwapOperations',
  get:
    ({ askAsset, offerAsset }) =>
    async () => {
      try {
        const wyndSwapOperations = await fetch(WYND_API_BASE + '/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            offerAsset,
            askAsset,
          }),
        })
        return (await wyndSwapOperations.json()) as SwapOperation[]
      } catch {
        return undefined
      }
    },
})
