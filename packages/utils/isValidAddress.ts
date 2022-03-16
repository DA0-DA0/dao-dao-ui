export function isValidWalletAddress(
  address: string,
  CHAIN_PREFIX: string
): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{39}$/im
  if (!address?.length) {
    return false
  }
  if (!address.startsWith(CHAIN_PREFIX)) {
    return false
  }
  const unprefixed = address.replace(CHAIN_PREFIX, '')
  return !!unprefixed.match(bech32Regex)
}

export function isValidValidatorAddress(address: string, CHAIN_PREFIX: string): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{46}$/im
  if (!address?.length) {
    return false
  }
  if (address.search('valoper') < 0) {
    return false
  }
  const unprefixed = address.replace(CHAIN_PREFIX, '')
  return !!unprefixed.match(bech32Regex)
}

export function isValidContractAddress(address: string, CHAIN_PREFIX: string): boolean {
  const bech32Regex = /^[a-km-zA-HJ-NP-Z0-9]{59}$/im
  if (!address?.length) {
    return false
  }
  if (!address.startsWith(CHAIN_PREFIX)) {
    return false
  }
  const unprefixed = address.replace(CHAIN_PREFIX, '')
  return !!unprefixed.match(bech32Regex)
}

// Validates a bech32 address.
export function isValidAddress(address: string, CHAIN_PREFIX: string): boolean {
  return (
    isValidWalletAddress(address, CHAIN_PREFIX) ||
    isValidContractAddress(address, CHAIN_PREFIX)
  )
}
