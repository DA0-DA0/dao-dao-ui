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
  getFallbackImage,
} from '@dao-dao/utils'

import {
  nativeBalanceSelector,
  nativeDelegatedBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '../recoil'
import { keplrProfileImageSelector } from '../recoil/selectors/keplr'

export interface UseWalletProfileReturn {
  walletAddress: string | undefined
  walletName: string | undefined
  walletImageUrl: string
  walletBalance: number | undefined
  walletStakedBalance: number | undefined
  refreshBalances: () => void
}

export const useWalletProfile = (): UseWalletProfileReturn => {
  const { name, address, publicKey } = useWallet()

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

  // Get image from Keplr.
  const keplrProfileImage = useRecoilValueLoadable(
    publicKey
      ? keplrProfileImageSelector(publicKey.hex)
      : constSelector(undefined)
  )
  const walletImageUrl =
    (keplrProfileImage.state === 'hasValue' && keplrProfileImage.contents) ||
    getFallbackImage(address)

  // Get name from profile API.
  // TODO: Change
  const walletName = name

  return {
    walletAddress: address,
    walletName,
    walletImageUrl,
    walletBalance,
    walletStakedBalance,
    refreshBalances,
  }
}
