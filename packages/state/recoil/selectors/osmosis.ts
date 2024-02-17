import { selectorFamily } from 'recoil'

import { GenericToken, GenericTokenWithUsdPrice } from '@dao-dao/types'
import { OSMOSIS_API_BASE } from '@dao-dao/utils'

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
