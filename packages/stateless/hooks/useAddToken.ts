import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { MAINNET, suggestToken } from '@dao-dao/utils'

import { useChain } from '../contexts/Chain'

export const useAddToken = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const addToken = useMemo(
    () =>
      // Can only add tokens to Keplr on mainnet.
      MAINNET
        ? async (address: string) => {
            if (await suggestToken(chainId, address)) {
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
