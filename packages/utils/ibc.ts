import { NATIVE_DENOM, NATIVE_DECIMALS } from './constants'
import ibcAssets from './ibc_assets.json'

export function nativeTokenLabel(denom: string): string {
  // Search IBC asset strings (junoDenom) if denom is in IBC format.
  // Otherwise just check microdenoms.
  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ junoDenom }) => junoDenom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)
  // If no asset, assume it's already a microdenom.
  return asset?.symbol || denom
}

export function nativeTokenLogoURI(denom: string): string | undefined {
  if (denom === 'ujuno' || denom == 'ujunox') {
    return '/juno-symbol.png'
  }

  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ junoDenom }) => junoDenom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)
  return asset?.logoURI
}

export function nativeTokenDecimals(denom: string): number | undefined {
  if (denom === NATIVE_DENOM) {
    return NATIVE_DECIMALS
  }
  const asset = denom.startsWith('ibc')
    ? ibcAssets.tokens.find(({ junoDenom }) => junoDenom === denom)
    : ibcAssets.tokens.find(({ denom: d }) => d === denom)
  return asset?.decimals
}
