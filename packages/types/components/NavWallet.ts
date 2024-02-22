import { ConnectWalletProps } from './ConnectWallet'
import { NavWalletConnectedProps } from './NavWalletConnected'

export type NavWalletProps = (
  | ({
      connected: true
    } & Omit<NavWalletConnectedProps, 'className'>)
  | ({
      connected: false
    } & Pick<ConnectWalletProps, 'onConnect' | 'loading'>)
) &
  Pick<NavWalletConnectedProps, 'mode'>

export type StatefulNavWalletProps = Pick<NavWalletProps, 'mode'>
