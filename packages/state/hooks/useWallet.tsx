import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { isMobile } from '@walletconnect/browser-utils'
import WalletConnect from '@walletconnect/client'
import {
  KeplrWalletConnectV1,
  useWalletManager,
  Wallet,
  WalletClient,
  WalletManagerProvider,
} from 'cosmodal'
import { FC, useCallback, useEffect } from 'react'
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { Loader } from '@dao-dao/ui/components/Loader'
import {
  CHAIN_ID,
  KeplrNotInstalledError,
  NativeChainInfo,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
  suggestChain,
} from '@dao-dao/utils'

import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientSelector,
  walletAccountNameSelector,
  walletAddressSelector,
  walletNativeBalanceSelector,
} from '../recoil'
import {
  walletClientAtom,
  connectedWalletIdAtom,
  walletConnectionIdAtom,
} from '../recoil/atoms/wallet'

export const useWallet = () => {
  const {
    connect,
    disconnect: disconnectCosmodal,
    connectionError,
    isMobileWeb,
  } = useWalletManager()
  const saveConnectedWalletId = useSetRecoilState(connectedWalletIdAtom)

  // Manually clear saved connected wallet ID to prevent interference with
  // autoconnect. See InnerWalletProvider's useEffect comment.
  const disconnect = useCallback(() => {
    disconnectCosmodal()
    saveConnectedWalletId(null)
  }, [disconnectCosmodal, saveConnectedWalletId])

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
    // Wallet is connected before the address is loaded, but in
    // practicality, we only care about the wallet being connected
    // once the address is loaded.
    connected: !!address,
    loading: walletAddressState === 'loading',
    connectionError,
    signingClient,
    isMobileWeb,
  }
}

const AvailableWallets: Wallet[] = [
  {
    id: 'keplr-wallet-extension',
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    logoImgUrl: '/keplr-wallet-extension.png',
    getClient: getKeplrFromWindow,
    isWalletConnect: false,
    onSelect: async () => {
      const hasKeplr = !!(await getKeplrFromWindow())
      if (!hasKeplr) {
        throw new KeplrNotInstalledError()
      }
    },
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
  // SYNC WALLET MANAGER STATE WITH RECOIL FOR USE IN SELECTORS

  const saveConnectedWalletId = useSetRecoilState(connectedWalletIdAtom)
  const setWalletClient = useSetRecoilState(walletClientAtom)
  const setWalletConnectionId = useSetRecoilState(walletConnectionIdAtom)
  const { connectedWallet } = useWalletManager()

  // Save wallet client in recoil atom so it can be used by selectors,
  // and store wallet ID for future autoconnect.
  useEffect(() => {
    setWalletClient(connectedWallet?.client)
    // Only save wallet ID if wallet is connected, since connectedWallet
    // is initially null on page load, which interferes with autoconnect.
    // Clear this manually in the disconnect function of useWallet.
    if (connectedWallet?.wallet.id) {
      saveConnectedWalletId(connectedWallet.wallet.id)
    }
  }, [connectedWallet, saveConnectedWalletId, setWalletClient])

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
  }, [setWalletConnectionId])

  return <>{children}</>
}

const enableKeplr = async (wallet: Wallet, walletClient: WalletClient) => {
  if (!wallet.isWalletConnect) {
    await suggestChain(walletClient)
  }
  await walletClient.enable(CHAIN_ID)
}

export const WalletProvider: FC = ({ children }) => {
  const savedConectedWalletId = useRecoilValue(connectedWalletIdAtom)

  return (
    <WalletManagerProvider
      attemptAutoConnect={!!savedConectedWalletId}
      classNames={{
        modalOverlay: '!backdrop-brightness-50 !backdrop-filter',
        modalContent:
          '!p-6 !max-w-md !bg-white !rounded-lg !border !border-focus',
        modalCloseButton:
          '!p-1 hover:!bg-secondary !rounded-full !transition !absolute !top-2 !right-2 ',
        modalHeader: '!header-text',
        modalSubheader: '!title-text',
        wallet: '!rounded-lg !bg-card !p-4 !shadow-none',
        walletIconImg: '!rounded-full',
        walletName: '!primary-text',
        walletDescription: '!caption-text',
        textContent: '!primary-text',
      }}
      clientMeta={{
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        icons: [SITE_IMAGE],
      }}
      enableKeplr={enableKeplr}
      preselectedWalletId={
        savedConectedWalletId ?? isMobile()
          ? // If on a mobile device, default to WalletConnect.
            AvailableWallets.find((w) => w.isWalletConnect)?.id
          : undefined
      }
      renderEnablingKeplrModalContent={() => (
        <div className="mt-4">
          <Loader size={64} />
        </div>
      )}
      wallets={AvailableWallets}
    >
      <InnerWalletProvider>{children}</InnerWalletProvider>
    </WalletManagerProvider>
  )
}
