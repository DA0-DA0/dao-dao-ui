import { selectorFamily } from 'recoil'

import {
  ChainId,
  GenericToken,
  GenericTokenWithUsdPrice,
  TokenType,
} from '@dao-dao/types'
import { WHITE_WHALE_PRICES_API } from '@dao-dao/utils'

import { osmosisUsdPriceSelector } from './osmosis'
import { skipRecommendedAssetForGenericTokenSelector } from './skip'
import { genericTokenSelector } from './token'

type WhiteWhalePool = {
  pool_id: string
  chain_name: string
  displayName: string
  displayLogo1: string
  displayLogo2: string
  volume_24h: number
  volume_7d: number
  TVL: string
  Price: string
  APR: number
}

export const whiteWhaleUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'whiteWhaleUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      // Get WHALE USD price from Osmosis.
      const whaleUsdPrice = get(
        osmosisUsdPriceSelector({
          type: TokenType.Native,
          chainId: ChainId.MigalooMainnet,
          denomOrAddress: 'uwhale',
        })
      )
      if (whaleUsdPrice?.usdPrice === undefined) {
        return
      }

      const asset = get(
        skipRecommendedAssetForGenericTokenSelector({
          type: params.type,
          denomOrAddress: params.denomOrAddress,
          sourceChainId: params.chainId,
          targetChainId: ChainId.MigalooMainnet,
        })
      )
      const symbol = asset?.recommendedSymbol || asset?.symbol
      if (!symbol) {
        return
      }

      const token = get(genericTokenSelector(params))

      try {
        const pools: WhiteWhalePool[] = await (
          await fetch(WHITE_WHALE_PRICES_API)
        ).json()

        // Find SYMBOL-WHALE pool.
        const pool = pools.find((pool) => pool.pool_id === `${symbol}-WHALE`)
        if (!pool) {
          return
        }

        // Amount of WHALE for 1 token.
        const priceInWhale = Number(pool.Price)
        const usdPrice = priceInWhale * whaleUsdPrice.usdPrice

        return {
          token,
          usdPrice,
          timestamp: new Date(),
        }
      } catch {
        return
      }
    },
})
