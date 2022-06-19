import { getKeplrFromWindow } from '@keplr-wallet/stores'
import toast from 'react-hot-toast'

import { t } from '@dao-dao/i18n'
import { suggestToken } from '@dao-dao/utils'

export const addToken = async (address: string) => {
  const keplr = await getKeplrFromWindow()
  if (keplr && (await suggestToken(keplr, address))) {
    toast.success(t('success.addedToken'))
  } else {
    toast.error(t('Need wallet to continue'))
  }
}
