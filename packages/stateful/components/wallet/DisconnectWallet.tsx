import clsx from 'clsx'

import {
  DisconnectWalletProps,
  DisconnectWallet as StatelessDisconnectWallet,
} from '@dao-dao/stateless'

import { useWallet } from '../../hooks'

export type StatefulDisconnectWalletProps = Omit<
  DisconnectWalletProps,
  'onDisconnect'
>

export const DisconnectWallet = ({
  className,
  variant = 'secondary',
  ...props
}: StatefulDisconnectWalletProps) => {
  const { disconnect } = useWallet()

  return (
    <StatelessDisconnectWallet
      className={clsx('shrink-0', className)}
      onDisconnect={disconnect}
      variant={variant}
      {...props}
    />
  )
}
