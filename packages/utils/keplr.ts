import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types'

import { CHAIN_ID } from './constants'

declare global {
  interface Window extends KeplrWindow {}
}

// Suggest a token to the user.
export const suggestToken = async (keplr: Keplr, address: string) =>
  keplr
    .suggestToken(CHAIN_ID, address)
    .then(() => true)
    .catch(() => false)
