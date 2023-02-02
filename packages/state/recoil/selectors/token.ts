import { constSelector, selectorFamily } from 'recoil'

import { GenericToken, TokenType, WithChainId } from '@dao-dao/types'
import {
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { Cw20BaseSelectors } from './contracts'

export const eitherTokenInfoSelector = selectorFamily<
  GenericToken,
  WithChainId<{
    type: TokenType
    denomOrAddress: string
  }>
>({
  key: 'eitherTokenInfo',
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
      const imageInfo = get(
        type === 'cw20'
          ? Cw20BaseSelectors.marketingInfoSelector({
              contractAddress: denomOrAddress,
              chainId,
              params: [],
            })
          : constSelector({
              // Match structure of marketingInfoSelector.
              logo: {
                url: nativeTokenLogoURI(denomOrAddress) ?? '',
              },
            })
      ).logo
      const imageUrl =
        (imageInfo && imageInfo !== 'embedded' ? imageInfo.url : '') ||
        undefined

      return {
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
      }
    },
})
