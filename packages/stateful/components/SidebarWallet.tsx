import { SidebarWallet as OriginalSidebarWallet } from '@dao-dao/stateless'

import { useWallet } from '../hooks'
import { SuspenseLoader } from './SuspenseLoader'

export const SidebarWallet = () => {
  const { openView, isWalletConnected, address, username, wallet } = useWallet()

  return (
    <SuspenseLoader
      fallback={<OriginalSidebarWallet connected={false} loading />}
    >
      {isWalletConnected && address && wallet ? (
        <OriginalSidebarWallet
          connected
          openWalletModal={openView}
          walletAddress={address}
          walletName={username || wallet?.prettyName}
          walletProviderImageUrl={wallet.logo}
        />
      ) : (
        <OriginalSidebarWallet connected={false} onConnect={openView} />
      )}
    </SuspenseLoader>
  )
}
