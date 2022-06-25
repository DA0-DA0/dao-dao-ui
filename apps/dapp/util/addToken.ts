import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { useTranslation } from '@dao-dao/i18n'
import { suggestToken } from '@dao-dao/utils'

export const useAddToken = () => {
  const { t } = useTranslation()

  return useCallback(
    async (address: string) => {
      const keplr = await getKeplrFromWindow()
      if (keplr && (await suggestToken(keplr, address))) {
        toast.success(t('success.addedToken'))
      } else {
        toast.error(t('error.connectWalletToContinue'))
      }
    },
    [t]
  )
}
