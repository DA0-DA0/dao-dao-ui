// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useRecoilValue } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ConnectWallet,
  MeBalances,
  MeTransactionBuilder,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
  walletProfileDataSelector,
} from '@dao-dao/stateful'
import { WalletActionsProvider } from '@dao-dao/stateful/actions'
import { Loader, Me, MeDisconnected } from '@dao-dao/stateless'

const MePage: NextPage = () => {
  const {
    address: walletAddress = '',
    connected,
    status,
    chainInfo,
  } = useWallet()
  const profileData = useRecoilValue(
    walletProfileDataSelector({
      address: walletAddress,
      chainId: chainInfo?.chainId,
    })
  )

  return connected ? (
    <WalletActionsProvider>
      {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
      <SuspenseLoader fallback={<Loader />} forceFallback={profileData.loading}>
        <Me
          // MeIdentity={MeIdentity}
          MeBalances={MeBalances}
          MeTransactionBuilder={MeTransactionBuilder}
          profileData={profileData}
          rightSidebarContent={<ProfileHomeCard />}
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

export default MePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
