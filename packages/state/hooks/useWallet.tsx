import { Keplr } from '@keplr-wallet/types'
import WalletConnect from '@walletconnect/client'
import {
  KeplrWalletConnectV1,
  useWalletManager,
  WalletInfo,
  WalletManagerProvider,
} from 'cosmodal'
import { FC, useCallback, useEffect } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { CHAIN_ID, getKeplr, NativeChainInfo } from '@dao-dao/utils'

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
  walletConnectErrorAtom,
  walletConnectionIdAtom,
} from '../recoil/atoms/wallet'

export class WalletNotInstalledError extends Error {
  constructor() {
    super("Wallet extension isn't installed.")
    this.name = 'WalletNotInstalled'
  }
}

interface UseWalletProps {
  // Selectively enable or disable effect hooks. There's no need to run
  // them everywhere we want to fetch some wallet state (like address or
  // balance). These effects must be enabled on every page at least
  // once, and ideally should be enabled on every page exactly once.
  // Wrapping the app in `WalletProvider` takes care of all of this.
  effectsEnabled?: boolean
}

export const useWallet = ({ effectsEnabled = false }: UseWalletProps = {}) => {
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
  const [connectError, setConnectError] = useRecoilState(walletConnectErrorAtom)

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

      // Set disconnected so we don't try to connect again without manual action.
      disconnect()

      // Set error after since disconnect cleans up state.
      setConnectError(error)
    }
  }, [disconnect, getWallet, setWalletClient, setConnectError])

  // Attempt connection if should be connected.
  const walletClientDisconnected = walletClient === undefined
  useEffect(() => {
    if (!effectsEnabled) return

    if (walletConnected && walletClientDisconnected) {
      setDefaultConnectionType(walletConnected)
      connect()
    }
  }, [
    walletClientDisconnected,
    walletConnected,
    setDefaultConnectionType,
    connect,
    effectsEnabled,
  ])

  // Save wallet connected ID.
  useEffect(() => {
    if (!effectsEnabled) return

    if (walletClient && connectionType && walletConnected !== connectionType) {
      setWalletConnected(connectionType)
    } else if (!walletClient && walletConnected !== null) {
      setWalletConnected(null)
    }
  }, [
    walletClient,
    connectionType,
    setWalletConnected,
    walletConnected,
    effectsEnabled,
  ])

  // Listen for keplr keystore changes and update as needed.
  useEffect(() => {
    if (!effectsEnabled) return

    const keplrListener = () => {
      console.log('Keplr keystore changed, reloading client.')
      // Force refresh of wallet client/info selectors.
      setWalletConnectionId((id) => id + 1)
    }
    window.addEventListener('keplr_keystorechange', keplrListener)

    return () =>
      window.removeEventListener('keplr_keystorechange', keplrListener)
  }, [
    clearLastUsedWallet,
    setWalletClient,
    setWalletConnectionId,
    effectsEnabled,
  ])

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

const WalletInfoList: WalletInfo[] = [
  {
    id: 'keplr-wallet-extension',
    name: 'Keplr Wallet',
    description: 'Keplr Browser Extension',
    logoImgUrl: '/keplr-wallet-extension.png',
    getWallet: getKeplr,
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

const InnerWalletProvider: FC = ({ children }) => {
  // Wallet effects must be enabled at least once on every page.
  useWallet({ effectsEnabled: true })

  return <>{children}</>
}

export const WalletProvider: FC = ({ children }) => (
  <WalletManagerProvider
    classNames={{
      modalOverlay: '!backdrop-brightness-50 !backdrop-filter',
      modalContent:
        '!p-6 !max-w-md !bg-white !rounded-lg !border !border-focus',
      modalCloseButton:
        '!p-1 hover:!bg-secondary !rounded-full !transition !absolute !top-2 !right-2 ',
      modalHeader: '!header-text',
      wallet: '!rounded-lg !bg-card !p-4 !shadow-none',
      walletIconImg: '!rounded-full',
      walletName: '!primary-text',
      walletDescription: '!caption-text',
    }}
    walletInfoList={WalletInfoList}
  >
    <InnerWalletProvider>{children}</InnerWalletProvider>
  </WalletManagerProvider>
)
