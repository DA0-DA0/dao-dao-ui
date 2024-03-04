import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import {
  nativeBalanceSelector,
  refreshNativeTokenStakingInfoAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

import { useWallet } from './useWallet'

export type UseWalletInfoOptions = {
  chainId?: string
}

export type UseWalletInfoReturn = {
  isWalletConnected: boolean
  walletBalance: number | undefined
  refreshBalances: () => void
}

export const useWalletBalances = ({
  chainId,
}: UseWalletInfoOptions = {}): UseWalletInfoReturn => {
  const {
    chain: walletChain,
    address,
    isWalletConnected,
  } = useWallet({
    chainId,
  })
  chainId ||= walletChain.chain_id

  const nativeToken = getNativeTokenForChainId(chainId)

  // Fetch wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useCachedLoadable(
    address
      ? nativeBalanceSelector({
          address,
          chainId,
        })
      : undefined
  )
  const walletBalance =
    walletNativeBalanceState === 'hasValue' &&
    walletNativeBalanceContents &&
    nativeToken
      ? convertMicroDenomToDenomWithDecimals(
          walletNativeBalanceContents.amount,
          nativeToken.decimals
        )
      : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const setRefreshStakingId = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(address ?? '')
  )
  const refreshBalances = useCallback(() => {
    setRefreshWalletBalancesId((id) => id + 1)
    setRefreshStakingId((id) => id + 1)
  }, [setRefreshStakingId, setRefreshWalletBalancesId])

  return {
    isWalletConnected,
    walletBalance,
    refreshBalances,
  }
}
