import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types'

declare global {
  interface Window extends KeplrWindow {}
}

// Suggest a token to the user.
export const suggestToken = async (
  chainId: string,
  keplr: Keplr,
  address: string
) =>
  keplr
    .suggestToken(chainId, address)
    .then(() => true)
    .catch(() => false)
