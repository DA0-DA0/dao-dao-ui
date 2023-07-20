import { selectorFamily } from 'recoil'

import { AmountWithTimestampAndDenom } from '@dao-dao/types'
import { OSMOSIS_API_BASE } from '@dao-dao/utils'

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
