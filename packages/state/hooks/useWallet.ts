import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { Keplr } from '@keplr-wallet/types'
import WalletConnect from '@walletconnect/client'
import { KeplrWalletConnectV1, useWalletManager, WalletInfo } from 'cosmodal'
import { useCallback, useEffect, useState } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { CHAIN_ID, NativeChainInfo } from '@dao-dao/utils'

import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientSelector,
  walletAccountNameSelector,
  walletAddressSelector,
  walletNativeBalanceSelector,
} from '../recoil'
import {
  walletClientAtom,
  walletConnectedAtom,
  walletConnectionIdAtom,
} from '../recoil/atoms/wallet'

export class WalletNotInstalledError extends Error {
  constructor() {
    super("Wallet extension isn't installed.")
    this.name = 'WalletNotInstalled'
  }
}

export const useWallet = () => {
  const [walletConnected, setWalletConnected] =
    useRecoilState(walletConnectedAtom)
  const [walletClient, setWalletClient] = useRecoilState(walletClientAtom)
  const setWalletConnectionId = useSetRecoilState(walletConnectionIdAtom)
  const {
    getWallet,
    setDefaultConnectionType,
    connectionType,
    clearLastUsedWallet,
  } = useWalletManager()
  const [connectError, setConnectError] = useState<any>()

  // Clear all state.
  const disconnect = useCallback(() => {
    setWalletConnected(null)
    setWalletClient(undefined)
    setDefaultConnectionType(undefined)
    clearLastUsedWallet()
    setConnectError(undefined)
  }, [
    setWalletConnected,
    setWalletClient,
    setDefaultConnectionType,
    clearLastUsedWallet,
    setConnectError,
  ])

  const connect = useCallback(async () => {
    setConnectError(undefined)

    // Attempt to connect and update keystore accordingly.
    try {
      const wallet: Keplr | KeplrWalletConnectV1 | undefined = await getWallet()
      setWalletClient(wallet)

      if (!wallet) {
        throw new WalletNotInstalledError()
      }
    } catch (error) {
      console.error(error)
      setConnectError(error)

      // Set disconnected so we don't try to connect again without manual action.
      disconnect()
    }
  }, [disconnect, getWallet, setWalletClient, setConnectError])

  // Attempt connection if should be connected.
  const walletClientDisconnected = walletClient === undefined
  useEffect(() => {
    if (walletConnected && walletClientDisconnected) {
      setDefaultConnectionType(walletConnected)
      connect()
    }
  }, [
    walletClientDisconnected,
    walletConnected,
    setDefaultConnectionType,
    connect,
  ])

  // Save wallet connected ID.
  useEffect(() => {
    if (walletClient && connectionType && walletConnected !== connectionType) {
      setWalletConnected(connectionType)
    } else if (!walletClient && walletConnected !== null) {
      setWalletConnected(null)
    }
  }, [walletClient, connectionType, setWalletConnected, walletConnected])

  // Listen for keplr keystore changes and update as needed.
  useEffect(() => {
    const keplrListener = () => {
      console.log('Keplr keystore changed, reloading client.')
      // Force refresh of wallet client/info selectors.
      setWalletConnectionId((id) => id + 1)
    }
    window.addEventListener('keplr_keystorechange', keplrListener)

    return () =>
      window.removeEventListener('keplr_keystorechange', keplrListener)
  }, [clearLastUsedWallet, setWalletClient, setWalletConnectionId])

  // Wallet address
  const { state: walletAddressState, contents: walletAddressContents } =
    useRecoilValueLoadable(walletAddressSelector)
  const address =
    walletAddressState === 'hasValue' ? walletAddressContents : undefined
  // Wallet account name
  const { state: walletAccountNameState, contents: walletAccountNameContents } =
    useRecoilValueLoadable(walletAccountNameSelector)
  const name =
    walletAccountNameState === 'hasValue'
      ? walletAccountNameContents
      : undefined
  // Wallet balance
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useRecoilValueLoadable(walletNativeBalanceSelector)
  const nativeBalance =
    walletNativeBalanceState == 'hasValue'
      ? walletNativeBalanceContents
      : undefined
  // Wallet signing client
  const { state: signingClientState, contents: signingClientContents } =
    useRecoilValueLoadable(signingCosmWasmClientSelector)
  const signingClient =
    signingClientState === 'hasValue' ? signingClientContents : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  return {
    connect,
    disconnect,
    refreshBalances,
    address,
    name,
    nativeBalance,
    connected: !!address,
    loading: walletAddressState === 'loading',
    connectError,
    signingClient,
  }
}

export const WalletInfoList: WalletInfo[] = [
  {
    id: 'keplr-wallet-extension',
    name: 'Keplr Wallet',
    description: 'Keplr Browser Extension',
    logoImgUrl: '/keplr-wallet-extension.png',
    getWallet: getKeplrFromWindow,
  },
  // WalletConnect only supports mainnet. Not testnet.
  ...(CHAIN_ID === 'juno-1'
    ? [
        {
          id: 'walletconnect-keplr',
          name: 'WalletConnect',
          description: 'Keplr Mobile',
          logoImgUrl: '/walletconnect-keplr.png',
          getWallet: async (connector?: WalletConnect) => {
            if (connector?.connected)
              return new KeplrWalletConnectV1(connector, [NativeChainInfo])
            throw new Error('Mobile wallet not connected.')
          },
        },
      ]
    : []),
]
