// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ConnectWallet,
  MeBalances,
  MeTransactionBuilder,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
  useWalletProfile,
} from '@dao-dao/stateful'
import { ActionsProvider } from '@dao-dao/stateful/actions'
import { Loader, Me, MeDisconnected } from '@dao-dao/stateless'
import { ActionContextType } from '@dao-dao/types/actions'
import { CHAIN_BECH32_PREFIX, CHAIN_ID } from '@dao-dao/utils'

const MePage: NextPage = () => {
  const {
    address: walletAddress = '',
    publicKey,
    connected,
    status,
  } = useWallet()
  const { profile } = useWalletProfile({
    walletAddress,
    hexPublicKey: publicKey?.hex,
  })

  return connected ? (
    <ActionsProvider
      // If walletAddress changes, refresh actions.
      key={walletAddress}
      options={{
        chainId: CHAIN_ID,
        bech32Prefix: CHAIN_BECH32_PREFIX,
        address: walletAddress,
        context: {
          type: ActionContextType.Wallet,
        },
      }}
    >
      {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
      <SuspenseLoader fallback={<Loader />} forceFallback={profile.loading}>
        <Me
          // MeIdentity={MeIdentity}
          MeBalances={MeBalances}
          MeTransactionBuilder={MeTransactionBuilder}
          loadingProfile={profile}
          rightSidebarContent={<ProfileHomeCard />}
          walletAddress={walletAddress}
        />
      </SuspenseLoader>
    </ActionsProvider>
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
