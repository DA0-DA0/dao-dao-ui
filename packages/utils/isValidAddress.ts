import { fromBech32 } from '@cosmjs/encoding'

export function isValidWalletAddress(
  address: string,
  chainPrefix: string
): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{39}$/im
  if (!address?.length) {
    return false
  }
  if (!address.startsWith(chainPrefix)) {
    return false
  }
  const unprefixed = address.replace(chainPrefix, '')
  return !!unprefixed.match(bech32Regex)
}

export function isValidValidatorAddress(
  address: string,
  chainPrefix: string
): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{46}$/im
  // Some validators may be run by DAOs and have contract addresses
  // This has a length of 66 because of the valoper prefix (i.e. junovaloper)
  const bech32ContractRegex = /^[a-km-zA-HJ-NP-Z0-9]{66}$/im
  if (!address?.length) {
    return false
  }
  if (address.search('valoper') < 0) {
    return false
  }
  const unprefixed = address.replace(chainPrefix, '')
  return (
    !!unprefixed.match(bech32Regex) || !!unprefixed.match(bech32ContractRegex)
  )
}

export function isValidContractAddress(
  address: string,
  chainPrefix: string
): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{59}$/im
  if (!address?.length) {
    return false
  }
  if (!address.startsWith(chainPrefix)) {
    return false
  }
  const unprefixed = address.replace(chainPrefix, '')
  return !!unprefixed.match(bech32Regex)
}

// Validates a bech32 address.
export function isValidAddress(address: string, chainPrefix: string): boolean {
  return (
    isValidWalletAddress(address, chainPrefix) ||
    isValidContractAddress(address, chainPrefix)
  )
}

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
