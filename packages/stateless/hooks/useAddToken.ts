import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { MAINNET, suggestToken } from '@dao-dao/utils'

import { useChain } from './useChainContext'

export const useAddToken = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const addToken = useMemo(
    () =>
      // Can only add tokens to Keplr on mainnet.
      MAINNET
        ? async (address: string) => {
            const keplr = await (
              await import('@keplr-wallet/stores')
            ).getKeplrFromWindow()
            if (keplr && (await suggestToken(chainId, keplr, address))) {
              toast.success(t('success.addedToken'))
            } else {
              toast.error(t('error.logInToContinue'))
            }
          }
        : undefined,
    [chainId, t]
  )

  return addToken
}
