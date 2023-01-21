import { constSelector, selectorFamily } from 'recoil'

import { EitherTokenInfo, WithChainId } from '@dao-dao/types'
import {
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { Cw20BaseSelectors } from './contracts'

// Standardize format for common CW20 and native token info.
export const eitherTokenInfoSelector = selectorFamily<
  EitherTokenInfo,
  WithChainId<{
    type: 'cw20' | 'native'
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
        denomOrAddress,
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol,
        imageUrl,
      }
    },
})
