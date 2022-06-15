import { getKeplrFromWindow } from '@keplr-wallet/stores'
import toast from 'react-hot-toast'

import i18n from '@dao-dao/i18n'
import { suggestToken } from '@dao-dao/utils'

export const addToken = async (address: string) => {
  const keplr = await getKeplrFromWindow()
  if (keplr && (await suggestToken(keplr, address))) {
    toast.success(i18n.t('success.addedToken'))
  } else {
    toast.error(i18n.t('Need wallet to continue'))
  }
}
