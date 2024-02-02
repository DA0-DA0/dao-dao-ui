import { ConnectWalletProps } from './ConnectWallet'
import { NavWalletConnectedProps } from './NavWalletConnected'

export type NavWalletProps = {
  /**
   * Optional class name for the container.
   */
  containerClassName?: string
} & (
  | ({
      connected: true
    } & Omit<NavWalletConnectedProps, 'className'>)
  | ({
      connected: false
    } & Pick<ConnectWalletProps, 'onConnect' | 'loading'>)
) &
  Pick<NavWalletConnectedProps, 'compact' | 'inResponsiveNav'>

export type StatefulNavWalletProps = Pick<
  NavWalletProps,
  'containerClassName' | 'compact' | 'inResponsiveNav'
>
