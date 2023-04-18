import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import { useSetRecoilState } from 'recoil'

import { walletModalVisibleAtom } from '@dao-dao/state/recoil'
import { SidebarWallet as OriginalSidebarWallet } from '@dao-dao/stateless'

import { SuspenseLoader } from './SuspenseLoader'

export const SidebarWallet = () => {
  const { connect, connected, connectedWallet, status } = useWalletManager()

  const setWalletModalVisible = useSetRecoilState(walletModalVisibleAtom)
  const openWalletModal = () => setWalletModalVisible(true)

  return (
    <SuspenseLoader
      fallback={<OriginalSidebarWallet connected={false} loading />}
      forceFallback={
        // Prevent flickering to connect wallet button when no longer suspended
        // but cosmodal hasn't started its first autoconnection attempt yet.
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection
      }
    >
      {connected && connectedWallet ? (
        <OriginalSidebarWallet
          connected
          openWalletModal={openWalletModal}
          walletAddress={connectedWallet.address}
          walletName={connectedWallet.name}
          walletProviderImageUrl={connectedWallet.wallet.imageUrl}
        />
      ) : (
        <OriginalSidebarWallet connected={false} onConnect={connect} />
      )}
    </SuspenseLoader>
  )
}
