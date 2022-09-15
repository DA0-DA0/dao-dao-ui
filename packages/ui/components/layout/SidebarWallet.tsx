import { Loader } from '../Loader'
import {
  ConnectWallet,
  ConnectWalletProps,
  ConnectedWallet,
  ConnectedWalletProps,
} from '../wallet'

export type SidebarWalletProps =
  | ({
      connected: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connected: false
    } & Omit<ConnectWalletProps, 'className'>)

export const SidebarWallet = (props: SidebarWalletProps) => (
  <div className="flex flex-col shrink-0 justify-center h-20">
    {props.connected ? (
      <ConnectedWallet
        {...{
          ...props,
          connected: undefined,
        }}
      />
    ) : (
      <ConnectWallet
        className="self-end"
        {...{
          ...props,
          connected: undefined,
        }}
      />
    )}
  </div>
)

export const SidebarWalletLoading = () => (
  <Loader className="h-20" fill={false} />
)
