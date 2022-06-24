import {
  ConnectedWallet,
  IWalletManagerContext,
  WalletConnectionStatus,
  WalletManagerProvider,
  WalletType,
  useWalletManager,
} from '@noahsaso/cosmodal'
import { isMobile } from '@walletconnect/browser-utils'
import { FC, createContext, useCallback, useContext, useEffect } from 'react'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import { Loader } from '@dao-dao/ui'
import {
  CHAIN_ID,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  WC_ICON_PATH,
} from '@dao-dao/utils'

import {
  nativeBalanceSelector,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../recoil'

const WalletContext = createContext<
  | (Pick<
      IWalletManagerContext,
      'connect' | 'disconnect' | 'error' | 'isEmbeddedKeplrMobileWeb'
    > &
      Partial<
        Pick<
          ConnectedWallet,
          'name' | 'address' | 'signingCosmWasmClient' | 'signingStargateClient'
        >
      > & {
        connected: boolean
        refreshBalances: () => void
        nativeBalance: number | undefined
      })
  | null
>(null)

const InnerWalletProvider: FC = ({ children }) => {
  const setSigningCosmWasmClient = useSetRecoilState(signingCosmWasmClientAtom)
  const {
    connect,
    disconnect,
    connectedWallet: {
      name,
      address,
      signingCosmWasmClient,
      signingStargateClient,
    } = {},
    status,
    error,
    isEmbeddedKeplrMobileWeb,
  } = useWalletManager()

  // Save client in recoil atom so it can be used by selectors.
  useEffect(() => {
    setSigningCosmWasmClient(signingCosmWasmClient)
  }, [setSigningCosmWasmClient, signingCosmWasmClient])

  // Fetch native wallet balance.
  const {
    state: walletNativeBalanceState,
    contents: walletNativeBalanceContents,
  } = useRecoilValueLoadable(
    address ? nativeBalanceSelector(address) : constSelector(undefined)
  )
  const nativeBalance =
    walletNativeBalanceState === 'hasValue' && walletNativeBalanceContents
      ? Number(walletNativeBalanceContents.amount)
      : undefined

  const setRefreshWalletBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(address ?? '')
  )
  const refreshBalances = useCallback(
    () => setRefreshWalletBalancesId((id) => id + 1),
    [setRefreshWalletBalancesId]
  )

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        error,
        isEmbeddedKeplrMobileWeb,
        name,
        address,
        signingCosmWasmClient,
        signingStargateClient,
        connected: status === WalletConnectionStatus.Connected,
        refreshBalances,
        nativeBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
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
      modalSubheader: '!title-text',
      wallet: '!rounded-lg !bg-card !p-4 !shadow-none',
      walletImage: '!rounded-full',
      walletName: '!primary-text',
      walletDescription: '!caption-text',
      textContent: '!primary-text',
    }}
    defaultChainId={CHAIN_ID}
    enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
    localStorageKey="connectedWalletId"
    preselectedWalletType={
      // If on a mobile device, default to WalletConnect.
      isMobile() ? WalletType.WalletConnectKeplr : undefined
    }
    renderLoader={() => <Loader size={64} />}
    walletConnectClientMeta={{
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      icons: [
        (typeof window === 'undefined' ? SITE_URL : window.location.origin) +
          WC_ICON_PATH,
      ],
    }}
  >
    <InnerWalletProvider>{children}</InnerWalletProvider>
  </WalletManagerProvider>
)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('You forgot to wrap your app with WalletProvider.')
  }
  return context
}
