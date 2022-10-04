import { useWalletManager } from '@noahsaso/cosmodal'

import { useWalletProfile } from '@dao-dao/state'
import {
  SidebarWallet as OriginalSidebarWallet,
  SidebarWalletLoading,
} from '@dao-dao/ui'
import { NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { SuspenseLoader } from './SuspenseLoader'

export const SidebarWallet = () => {
  const {
    connect,
    disconnect,
    isEmbeddedKeplrMobileWeb,
    connected,
    connectedWallet,
  } = useWalletManager()
  const { walletBalance } = useWalletProfile()

  return (
    <SuspenseLoader fallback={<SidebarWalletLoading />}>
      {connected && connectedWallet ? (
        <OriginalSidebarWallet
          connected
          onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
          tokenBalance={walletBalance}
          tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
          walletAddress={connectedWallet.address}
          walletName={connectedWallet.name}
        />
      ) : (
        <OriginalSidebarWallet connected={false} onConnect={connect} />
      )}
    </SuspenseLoader>
  )
}
