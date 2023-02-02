// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ConnectWallet,
  MeTransactionBuilder,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
} from '@dao-dao/stateful'
import { ActionsProvider } from '@dao-dao/stateful/actions'
import { Loader, Me, MeDisconnected } from '@dao-dao/stateless'
import { ActionContextType } from '@dao-dao/types/actions'
import { CHAIN_BECH32_PREFIX, CHAIN_ID } from '@dao-dao/utils'

const MePage: NextPage = () => {
  const { address: walletAddress = '', connected, status } = useWallet()

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
      <SuspenseLoader fallback={<Loader />}>
        <Me
          MeTransactionBuilder={MeTransactionBuilder}
          rightSidebarContent={<ProfileHomeCard />}
        />
      </SuspenseLoader>
    </ActionsProvider>
  ) : (
    <MeDisconnected
      autoConnecting={
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection
      }
      connectWalletButton={<ConnectWallet />}
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
