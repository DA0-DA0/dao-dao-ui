import { fromBech32 } from '@cosmjs/encoding'

export function isValidWalletAddress(
  address: string,
  chainPrefix: string
): boolean {
  if (!address?.length) {
    return false
  }
  const regex = new RegExp(`^${chainPrefix}[a-km-zA-HJ-NP-Z0-9]{39}$`, 'im')
  return !!address.match(regex)
}

export const isValidValidatorAddress = (
  address: string,
  chainPrefix: string
) => {
  if (!address?.length) {
    return false
  }
  // Some validators may be run by DAOs and have contract addresses. This has a
  // length of 66 because of the valoper prefix (i.e. junovaloper).
  const regex = new RegExp(
    `^${chainPrefix}valoper([a-km-zA-HJ-NP-Z0-9]{46}|[a-km-zA-HJ-NP-Z0-9]{66})$`,
    'im'
  )
  return !!address.match(regex)
}

export const isValidContractAddress = (
  address: string,
  chainPrefix: string
) => {
  if (!address?.length) {
    return false
  }
  const regex = new RegExp(`^${chainPrefix}[a-km-zA-HJ-NP-Z0-9]{59}$`, 'im')
  return !!address.match(regex)
}

export const isValidTokenFactoryDenom = (
  denom: string,
  chainPrefix: string
) => {
  if (!denom?.length) {
    return false
  }
  const regex = new RegExp(
    `^factory/${chainPrefix}[a-km-zA-HJ-NP-Z0-9]{39}/.+`,
    'im'
  )
  return !!denom.match(regex)
}

// Validates a bech32 address.
export const isValidAddress = (address: string, chainPrefix: string) =>
  isValidWalletAddress(address, chainPrefix) ||
  isValidContractAddress(address, chainPrefix)

// Validates any bech32 prefix, optionally requiring a specific prefix.
export const isValidBech32Address = (
  address: string,
  // If passed, the prefix must match this value.
  prefix?: string
): boolean => {
  try {
    const decoded = fromBech32(address)

    if (prefix && decoded.prefix !== prefix) {
      return false
    }

    return true
  } catch (err) {
    return false
  }
}
