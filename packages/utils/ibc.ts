import { NATIVE_TOKEN } from './constants'
import { concatAddressStartEnd } from './conversion'
import { getFallbackImage } from './getFallbackImage'
import ibcAssets from './ibc_assets.json'

export { ibcAssets }

// NATIVE_TOKEN depends on this function, so don't use it inside this function
// or it will create a circular dependency.
export function nativeTokenLabel(denom: string): string {
  // Search IBC asset strings (juno_denom) if denom is in IBC format.
  // Otherwise just check microdenoms.
  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ juno_denom }) => juno_denom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)

  return (
    asset?.symbol ||
    (denom.startsWith('u') ? denom.substring(1) : denom).toUpperCase()
  )
}

// NATIVE_TOKEN depends on this function, so don't use it inside this function
// or it will create a circular dependency.
export function nativeTokenLogoURI(denom: string): string | undefined {
  if (denom === 'ujuno' || denom === 'ujunox') {
    return '/juno.png'
  }

  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ juno_denom }) => juno_denom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)

  return asset?.logoURI || getFallbackImage(denom)
}

export function nativeTokenDecimals(denom: string): number | undefined {
  if (denom === NATIVE_TOKEN.denomOrAddress) {
    return NATIVE_TOKEN.decimals
  }
  // Fallback so that the testnet and mainnet know how much the other token has.
  // Before this fix, this function would return 0 for the native token on the
  // other chain because neither JUNO nor JUNOX are in the ibcAssets list.
  if (denom === 'ujuno' || denom === 'ujunox') {
    return 6
  }

  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ juno_denom }) => juno_denom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)
  return asset?.decimals
}

export const getJunoIbcUsdc = () =>
  ibcAssets.tokens.find(({ id }) => id === 'usd-coin')!

export const JUNO_USDC_DENOM = getJunoIbcUsdc().juno_denom

// Returns true if this denom is the IBC denom for USDC on Juno.
export const isJunoIbcUsdc = (ibcDenom: string): boolean =>
  ibcDenom === JUNO_USDC_DENOM

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
