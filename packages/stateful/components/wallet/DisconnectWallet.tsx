import clsx from 'clsx'
import { useState } from 'react'

import { DisconnectWallet as StatelessDisconnectWallet } from '@dao-dao/stateless'
import { StatefulDisconnectWalletProps } from '@dao-dao/types'

import { useWallet } from '../../hooks'

export const DisconnectWallet = ({
  className,
  variant = 'secondary',
  afterDisconnect,
  ...props
}: StatefulDisconnectWalletProps) => {
  const { disconnect } = useWallet()

  const [disconnecting, setDisconnecting] = useState(false)

  return (
    <StatelessDisconnectWallet
      className={clsx('shrink-0', className)}
      loading={disconnecting}
      onDisconnect={async () => {
        setDisconnecting(true)
        try {
          await disconnect()
          afterDisconnect?.()
        } finally {
          setDisconnecting(false)
        }
      }}
      variant={variant}
      {...props}
    />
  )
}
