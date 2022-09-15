import { useWallet } from '@noahsaso/cosmodal'
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

import {
  nativeBalanceSelector,
  nativeDelegatedBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '../recoil'

export interface UseWalletBalanceReturn {
  walletBalance: number | undefined
  walletStakedBalance: number | undefined
  refreshBalances: () => void
}

export const useWalletBalance = (): UseWalletBalanceReturn => {
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

  // Fetch staked wallet balance.
  const {
    state: walletStakedNativeBalanceState,
    contents: walletStakedNativeBalanceContents,
  } = useRecoilValueLoadable(
    address ? nativeDelegatedBalanceSelector(address) : constSelector(undefined)
  )
  const walletStakedBalance =
    walletStakedNativeBalanceState === 'hasValue' &&
    walletStakedNativeBalanceContents
      ? convertMicroDenomToDenomWithDecimals(
          walletStakedNativeBalanceContents.amount,
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

  return { walletBalance, walletStakedBalance, refreshBalances }
}
