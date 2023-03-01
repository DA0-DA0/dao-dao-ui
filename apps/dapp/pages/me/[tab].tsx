// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ConnectWallet,
  MeBalances,
  MeTransactionBuilder,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
  useWalletInfo,
} from '@dao-dao/stateful'
import { WalletActionsProvider } from '@dao-dao/stateful/actions'
import { Loader, Me, MeDisconnected } from '@dao-dao/stateless'
import { MeTabId } from '@dao-dao/types'

const MePage: NextPage = () => {
  const { address: walletAddress = '', connected, status } = useWallet()
  const { walletProfileData: profileData, updateProfileName } = useWalletInfo()

  return connected ? (
    <WalletActionsProvider>
      {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
      <SuspenseLoader fallback={<Loader />}>
        <Me
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

export default MePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})

export const getStaticPaths: GetStaticPaths = () => ({
  paths: Object.values(MeTabId).map((tab) => ({
    params: {
      tab,
    },
  })),
  fallback: false,
})
