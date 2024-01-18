import { selectorFamily } from 'recoil'

import { ChainId, GenericToken, GenericTokenWithUsdPrice } from '@dao-dao/types'
import { ASTROPORT_PRICES_API, objectMatchesStructure } from '@dao-dao/utils'

import { skipRecommendedAssetForGenericTokenSelector } from './skip'
import { genericTokenSelector } from './token'

type AstroportToken = {
  chainId: string
  denom: string
  symbol: string
  description: string
  decimals: number
  priceUSD: number
  totalLiquidityUSD: number
  dayVolumeUSD: number
}

export const astroportUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'astroportUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      let denom = params.denomOrAddress
      if (params.chainId !== ChainId.NeutronMainnet) {
        const asset = get(
          skipRecommendedAssetForGenericTokenSelector({
            type: params.type,
            denomOrAddress: params.denomOrAddress,
            sourceChainId: params.chainId,
            targetChainId: ChainId.NeutronMainnet,
          })
        )
        if (!asset) {
          return
        }
        denom = asset.denom
      }

      const token = get(genericTokenSelector(params))

      try {
        const tokens: AstroportToken[] = await (
          await fetch(ASTROPORT_PRICES_API)
        ).json()

        const astroportToken = tokens.find(
          (t) =>
            objectMatchesStructure(t, {
              denom: {},
            }) && t.denom === denom
        )
        if (!astroportToken) {
          return
        }

        return {
          token,
          usdPrice: astroportToken.priceUSD,
          timestamp: new Date(),
        }
      } catch {
        return
      }
    },
})
