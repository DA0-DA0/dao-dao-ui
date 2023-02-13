import { constSelector, selectorFamily } from 'recoil'

import { GenericToken, TokenType, WithChainId } from '@dao-dao/types'
import {
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { Cw20BaseSelectors } from './contracts'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  WithChainId<{
    type: TokenType
    denomOrAddress: string
  }>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    async ({ get }) => {
      const tokenInfo = get(
        type === 'cw20'
          ? Cw20BaseSelectors.tokenInfoSelector({
              contractAddress: denomOrAddress,
              chainId,
              params: [],
            })
          : constSelector({
              decimals: nativeTokenDecimals(denomOrAddress) ?? 0,
              symbol: nativeTokenLabel(denomOrAddress),
            })
      )
      const imageUrl =
        get(
          type === 'cw20'
            ? Cw20BaseSelectors.logoUrlSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            : constSelector(nativeTokenLogoURI(denomOrAddress) ?? '')
        ) || getFallbackImage(denomOrAddress)

      return {
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
      }
    },
})
