import { getKeplrFromWindow } from '@keplr-wallet/stores'

import { CHAIN_ID } from '@dao-dao/utils'

import { errorNotify, successNotify } from './toast'

export const addToken = async (address: string) => {
  if (typeof window === 'undefined') return

  try {
    const keplr = await getKeplrFromWindow()

    if (keplr) {
      await keplr.suggestToken(CHAIN_ID, address)
      successNotify('Added token to Keplr')
    }
  } catch (err) {
    console.error(err)
    errorNotify(err instanceof Error ? err.message : `${err}`)
  }
}
