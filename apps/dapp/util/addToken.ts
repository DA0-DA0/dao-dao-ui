import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { useTranslation } from '@dao-dao/i18n'
import { CHAIN_ID, suggestToken } from '@dao-dao/utils'

export const useAddToken = () => {
  const { t } = useTranslation()

  const addToken = useMemo(
    () =>
      // Can only add tokens on mainnet.
      // TODO: Change back to ChainInfoID.Juno1 when using @noahsaso/cosmodal again
      CHAIN_ID === 'juno-1'
        ? async (address: string) => {
            const keplr = await getKeplrFromWindow()
            if (keplr && (await suggestToken(keplr, address))) {
              toast.success(t('success.addedToken'))
            } else {
              toast.error(t('error.connectWalletToContinue'))
            }
          }
        : undefined,
    [t]
  )

  return addToken
}
