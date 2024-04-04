import { SecretAnyContractInfo } from '@dao-dao/types'

/**
 * Get address from a type that may be an address or a Secret network contract
 * info object.
 */
export const extractAddressFromMaybeSecretContractInfo = (
  data: string | SecretAnyContractInfo
): string => {
  const address =
    typeof data === 'string' ? data : 'addr' in data ? data.addr : undefined
  if (!address) {
    throw new Error('No address found')
  }
  return address
}
