import clsx from 'clsx'

import {
  ConnectWallet,
  ConnectWalletProps,
  ConnectedWallet,
  ConnectedWalletProps,
} from '../wallet'

export type SidebarWalletProps = { containerClasName?: string } & (
  | ({
      connected: true
    } & Omit<ConnectedWalletProps, 'className'>)
  | ({
      connected: false
    } & Omit<ConnectWalletProps, 'className'>)
)

export const SidebarWallet = ({
  containerClasName,
  ...props
}: SidebarWalletProps) => (
  <div
    className={clsx(
      'flex shrink-0 flex-col justify-center self-stretch',
      containerClasName
    )}
  >
    {props.connected ? (
      <ConnectedWallet
        {...{
          ...props,
          connected: undefined,
        }}
      />
    ) : (
      <ConnectWallet
        center
        className="w-full"
        variant="primary"
        {...{
          ...props,
          connected: undefined,
        }}
      />
    )}
  </div>
)
