import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'

import { SidebarWallet as OriginalSidebarWallet } from '@dao-dao/stateless'
import { NATIVE_DECIMALS, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { useWalletProfile } from '../hooks'
import { SuspenseLoader } from './SuspenseLoader'

export const SidebarWallet = () => {
  const {
    connect,
    disconnect,
    isEmbeddedKeplrMobileWeb,
    connected,
    connectedWallet,
    status,
  } = useWalletManager()
  const { walletBalance } = useWalletProfile()

  return (
    <SuspenseLoader
      fallback={
        <OriginalSidebarWallet
          connectedOrConnecting
          data={{ loading: true }}
          tokenDecimals={NATIVE_DECIMALS}
          tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
        />
      }
      forceFallback={
        // Prevent flickering to connect wallet button when no longer suspended
        // but cosmodal hasn't started its first autoconnection attempt yet.
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection
      }
    >
      {status === WalletConnectionStatus.Connecting ||
      (connected && connectedWallet) ? (
        <OriginalSidebarWallet
          connectedOrConnecting
          data={
            connected && connectedWallet
              ? {
                  loading: false,
                  data: {
                    tokenBalance:
                      walletBalance === undefined
                        ? { loading: true }
                        : { loading: false, data: walletBalance },
                    walletAddress: connectedWallet.address,
                    walletName: connectedWallet.name,
                  },
                }
              : {
                  loading: true,
                }
          }
          onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
          tokenDecimals={NATIVE_DECIMALS}
          tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
        />
      ) : (
        <OriginalSidebarWallet
          connectedOrConnecting={false}
          onConnect={connect}
        />
      )}
    </SuspenseLoader>
  )
}
