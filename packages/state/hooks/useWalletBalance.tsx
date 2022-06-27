import { useWallet } from '@noahsaso/cosmodal/dist/components/WalletManagerContext'
import { useCallback } from 'react'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import {
  NATIVE_DECIMALS,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { nativeBalanceSelector, refreshWalletBalancesIdAtom } from '../recoil'

export const useWalletBalance = () => {
  const { address } = useWallet()

  // Fetch wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useRecoilValueLoadable(
    address ? nativeBalanceSelector(address) : constSelector(undefined)
  )
  const walletBalance =
    walletNativeBalanceState === 'hasValue' && walletNativeBalanceContents
      ? convertMicroDenomToDenomWithDecimals(
          walletNativeBalanceContents.amount,
          NATIVE_DECIMALS
        )
      : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  return { walletBalance, refreshBalances }
}
