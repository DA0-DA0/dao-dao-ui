import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { NextPage } from 'next'

import { WalletActionsProvider } from '@dao-dao/stateful/actions'
import { Loader, MeDisconnected, Me as StatelessMe } from '@dao-dao/stateless'

import { useWalletInfo } from '../../hooks/useWalletInfo'
import { ConnectWallet } from '../ConnectWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { MeBalances } from './MeBalances'
import { MeTransactionBuilder } from './MeTransactionBuilder'

export const Me: NextPage = () => {
  const { address: walletAddress = '', connected, status } = useWallet()
  const { walletProfileData: profileData, updateProfileName } = useWalletInfo()

  return connected ? (
    <WalletActionsProvider>
      {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
      <SuspenseLoader fallback={<Loader />}>
        <StatelessMe
          MeBalances={MeBalances}
          MeTransactionBuilder={MeTransactionBuilder}
          profileData={profileData}
          rightSidebarContent={<ProfileHomeCard />}
          updateProfileName={updateProfileName}
          walletAddress={walletAddress}
        />
      </SuspenseLoader>
    </WalletActionsProvider>
  ) : (
    <MeDisconnected
      connectWalletButton={<ConnectWallet />}
      connecting={
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection ||
        status === WalletConnectionStatus.Connecting
      }
      rightSidebarContent={<ProfileDisconnectedCard />}
    />
  )
}
