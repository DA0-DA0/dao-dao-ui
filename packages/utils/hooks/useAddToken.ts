import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CHAIN_ID } from '../constants'
import { suggestToken } from '../keplr'

export const useAddToken = () => {
  const { t } = useTranslation()

  const addToken = useMemo(
    () =>
      // Can only add tokens on mainnet.
      CHAIN_ID === ChainInfoID.Juno1
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
