import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'

import {
  ConnectWalletProps,
  ConnectWallet as StatelessConnectWallet,
} from '@dao-dao/stateless'

export type StatefulConnectWalletProps = Omit<
  ConnectWalletProps,
  'loading' | 'onConnect'
>

export const ConnectWallet = (props: StatefulConnectWalletProps) => {
  const { connect, status } = useWalletManager()

  return (
    <StatelessConnectWallet
      loading={
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection ||
        status === WalletConnectionStatus.Connecting
      }
      onConnect={connect}
      variant="primary"
      {...props}
    />
  )
}
