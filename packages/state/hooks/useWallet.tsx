import { Keplr } from '@keplr-wallet/types'
import { isMobile } from '@walletconnect/browser-utils'
import WalletConnect from '@walletconnect/client'
import {
  KeplrWalletConnectV1,
  useWalletManager,
  Wallet,
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
  const { getWalletClient, setDefaultWalletId, connectedWalletId } =
    useWalletManager()
  const [connectError, setConnectError] = useRecoilState(walletConnectErrorAtom)

  // Clear all state.
  const disconnect = useCallback(() => {
    setWalletConnected(null)
    setWalletClient(undefined)
    setDefaultWalletId(undefined)
    setConnectError(undefined)
  }, [setWalletConnected, setWalletClient, setDefaultWalletId, setConnectError])

  const connect = useCallback(async () => {
    setConnectError(undefined)

    // Attempt to connect and update keystore accordingly.
    try {
      const walletClient: Keplr | KeplrWalletConnectV1 | undefined =
        await getWalletClient()
      setWalletClient(walletClient)

      if (!walletClient) {
        throw new WalletNotInstalledError()
      }
    } catch (error) {
      console.error(error)

      // Set disconnected so we don't try to connect again without manual action.
      disconnect()

      // Set error after since disconnect cleans up state.
      setConnectError(error)
    }
  }, [disconnect, getWalletClient, setWalletClient, setConnectError])

  // Attempt connection if should be connected.
  const walletClientDisconnected = walletClient === undefined
  useEffect(() => {
    if (!effectsEnabled) return

    if (walletConnected && walletClientDisconnected) {
      setDefaultWalletId(walletConnected)
      connect()
    }
  }, [
    walletClientDisconnected,
    walletConnected,
    setDefaultWalletId,
    connect,
    effectsEnabled,
  ])

  // Save wallet connected ID.
  useEffect(() => {
    if (!effectsEnabled) return

    if (
      walletClient &&
      connectedWalletId &&
      walletConnected !== connectedWalletId
    ) {
      setWalletConnected(connectedWalletId)
    } else if (!walletClient && walletConnected !== null) {
      setWalletConnected(null)
    }
  }, [
    walletClient,
    connectedWalletId,
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
  }, [setWalletClient, setWalletConnectionId, effectsEnabled])

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

const AvailableWallets: Wallet[] = [
  {
    id: 'keplr-wallet-extension',
    name: 'Keplr Wallet',
    description: 'Keplr Browser Extension',
    logoImgUrl: '/keplr-wallet-extension.png',
    getClient: getKeplr,
    isWalletConnect: false,
  },
  // WalletConnect only supports mainnet. Not testnet.
  ...(CHAIN_ID === 'juno-1'
    ? [
        {
          id: 'walletconnect-keplr',
          name: 'WalletConnect',
          description: 'Keplr Mobile',
          logoImgUrl: '/walletconnect-keplr.png',
          getClient: async (connector?: WalletConnect) => {
            if (connector?.connected)
              return new KeplrWalletConnectV1(connector, [NativeChainInfo])
            throw new Error('Mobile wallet not connected.')
          },
          isWalletConnect: true,
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
    defaultWalletId={
      // If on a mobile device, default to WalletConnect.
      isMobile()
        ? AvailableWallets.find((w) => w.isWalletConnect)?.id
        : undefined
    }
    wallets={AvailableWallets}
  >
    <InnerWalletProvider>{children}</InnerWalletProvider>
  </WalletManagerProvider>
)
