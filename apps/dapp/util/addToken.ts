import { getKeplrFromWindow } from '@keplr-wallet/stores'
import toast from 'react-hot-toast'

import { suggestToken } from '@dao-dao/utils'

export const addToken = async (address: string) => {
  const keplr = await getKeplrFromWindow()
  if (keplr && (await suggestToken(keplr, address))) {
    toast.success('Added token to Keplr')
  } else {
    toast.error('Failed to add token to Keplr')
  }
}
