import { getKeplrFromWindow } from '@keplr-wallet/stores'
import toast from 'react-hot-toast'

import { CHAIN_ID } from '@dao-dao/utils'

export const addToken = async (address: string) => {
  if (typeof window === 'undefined') return

  try {
    const keplr = await getKeplrFromWindow()

    if (keplr) {
      await keplr.suggestToken(CHAIN_ID, address)
      toast.success('Added token to Keplr')
    }
  } catch (err) {
    console.error(err)
    toast.error(err instanceof Error ? err.message : `${err}`)
  }
}
