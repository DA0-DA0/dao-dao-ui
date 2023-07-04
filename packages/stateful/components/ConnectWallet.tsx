import {
  ConnectWalletProps,
  ConnectWallet as StatelessConnectWallet,
} from '@dao-dao/stateless'

import { useWallet } from '../hooks/useWallet'

export type StatefulConnectWalletProps = Omit<
  ConnectWalletProps,
  'loading' | 'onConnect'
>

export const ConnectWallet = (props: StatefulConnectWalletProps) => {
  const { connect, isWalletConnecting } = useWallet()

  return (
    <StatelessConnectWallet
      loading={isWalletConnecting}
      onConnect={connect}
      variant="primary"
      {...props}
    />
  )
}
