import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'

import {
  ConnectWallet,
  ProfileDisconnectedCardProps,
  ProfileDisconnectedCard as StatelessProfileDisconnectedCard,
} from '@dao-dao/stateless'

export type StatefulProfileDisconnectedCardProps = Omit<
  ProfileDisconnectedCardProps,
  'connectWallet'
>

export const ProfileDisconnectedCard = (
  props: StatefulProfileDisconnectedCardProps
) => {
  const { connect, status } = useWalletManager()

  return (
    <StatelessProfileDisconnectedCard
      connectWallet={
        <ConnectWallet
          loading={
            status === WalletConnectionStatus.Initializing ||
            status === WalletConnectionStatus.AttemptingAutoConnection ||
            status === WalletConnectionStatus.Connecting
          }
          onConnect={connect}
          variant="primary"
        />
      }
      {...props}
    />
  )
}
