import { asset_lists } from '@chain-registry/assets'

import { GenericToken, TokenType } from '@dao-dao/types'

import { getChainForChainId } from './chain'
import { CHAIN_ID } from './constants'
import { concatAddressStartEnd } from './conversion'
import { getFallbackImage } from './getFallbackImage'

// Cache once loaded.
let ibcAssets:
  | (GenericToken & {
      id: string
      description?: string
    })[]
  | undefined
export const getIbcAssets = () => {
  if (!ibcAssets) {
    ibcAssets =
      asset_lists
        .find(
          ({ chain_name }) =>
            chain_name === getChainForChainId(CHAIN_ID).chain_name
        )
        ?.assets.map(
          ({
            base,
            symbol,
            logo_URIs: { png, svg, jpeg } = {},
            name,
            display,
            denom_units,
          }) => ({
            chainId: CHAIN_ID,
            id: display,
            type: TokenType.Native,
            denomOrAddress: base,
            symbol,
            decimals:
              denom_units.find(({ denom }) => denom === display)?.exponent ??
              denom_units.find(({ exponent }) => exponent > 0)?.exponent ??
              denom_units[0]?.exponent ??
              0,
            imageUrl: svg || png || jpeg || getFallbackImage(base),
            description: symbol === name ? undefined : name,
          })
        )
        .sort((a, b) => a.symbol.localeCompare(b.symbol)) ?? []
  }
  return ibcAssets
}

export const getNativeIbcUsdc = () =>
  getIbcAssets().find(({ id }) => id === 'usdc')
// Returns true if this denom is the IBC denom for USDC on the current chain.
export const isNativeIbcUsdc = (ibcDenom: string): boolean =>
  ibcDenom === getNativeIbcUsdc()?.denomOrAddress

// Processes symbol and converts into readable format (cut out middle and add
// ellipses) if long IBC string. Used in `TokenCard` and `TokenDepositModal`.
export const transformIbcSymbol = (
  symbol: string
): { isIbc: boolean; tokenSymbol: string; originalTokenSymbol: string } => {
  const isIbc = symbol.toLowerCase().startsWith('ibc')
  // Truncate IBC denominations to prevent overflow.
  const tokenSymbol = isIbc ? concatAddressStartEnd(symbol, 7, 3) : symbol

  return {
    isIbc,
    tokenSymbol,
    originalTokenSymbol: symbol,
  }
}
