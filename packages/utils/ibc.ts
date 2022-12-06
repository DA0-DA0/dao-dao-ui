import { NATIVE_DECIMALS, NATIVE_DENOM } from './constants'
import { getFallbackImage } from './getFallbackImage'
import ibcAssets from './ibc_assets.json'

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

export function nativeTokenLogoURI(denom: string): string | undefined {
  if (denom === 'ujuno' || denom === 'ujunox') {
    return '/juno-symbol.png'
  }

  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ juno_denom }) => juno_denom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)

  return asset?.logoURI || getFallbackImage(denom)
}

export function nativeTokenDecimals(denom: string): number | undefined {
  if (denom === NATIVE_DENOM) {
    return NATIVE_DECIMALS
  }
  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ juno_denom }) => juno_denom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)
  return asset?.decimals
}

// Returns true if this denom is the IBC denom for USDC on Juno.
export const isJunoIbcUsdc = (ibcDenom: string): boolean =>
  ibcAssets.tokens.find(({ id }) => id === 'usd-coin')?.juno_denom === ibcDenom
