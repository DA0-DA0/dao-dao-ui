import { useWallet } from '@noahsaso/cosmodal'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Action, ActionContextType } from '@dao-dao/tstypes/actions'

import { getActions } from '../actions'

export const useWalletActions = (): Action[] => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()

  return useMemo(
    () =>
      getActions({
        t,
        address: walletAddress ?? '',
        context: {
          type: ActionContextType.Wallet,
        },
      })
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [t, walletAddress]
  )
}
