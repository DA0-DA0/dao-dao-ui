// import { useWalletManager } from '@noahsaso/cosmodal'
import { isMobile } from '@walletconnect/browser-utils'
import clsx from 'clsx'
import { FC } from 'react'

import { useWalletBalance } from '@dao-dao/state'
import {
  MobileWalletConnect,
  NoMobileWallet,
  WalletConnect,
  WalletConnectProps,
} from '@dao-dao/ui'
import { CHAIN_ID, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

export interface ConnectWalletButtonProps extends Partial<WalletConnectProps> {
  mobile?: boolean
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  mobile,
  className,
  ...props
}) => {
  // const {
  //   connect,
  //   disconnect,
  //   isEmbeddedKeplrMobileWeb,
  //   connected,
  //   connectedWallet: { name, address } = {},
  // } = useWalletManager()
  const connect = () => {}
  const disconnect = () => {}
  const isEmbeddedKeplrMobileWeb = false
  const connected = false
  const name = undefined
  const address = undefined
  const { walletBalance = 0 } = useWalletBalance()

  if (mobile && isMobile() && CHAIN_ID !== 'juno-1') {
    return <NoMobileWallet />
  }

  return mobile ? (
    <MobileWalletConnect
      className={clsx('w-full', className)}
      connected={connected}
      onConnect={connect}
      onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalance}
      walletBalanceDenom={nativeTokenLabel(NATIVE_DENOM)}
      walletName={name}
      {...props}
    />
  ) : (
    <WalletConnect
      className={clsx('w-full', className)}
      connected={connected}
      onConnect={connect}
      onDisconnect={isEmbeddedKeplrMobileWeb ? undefined : disconnect}
      walletAddress={address ?? ''}
      walletBalance={walletBalance}
      walletBalanceDenom={nativeTokenLabel(NATIVE_DENOM)}
      walletName={name}
      {...props}
    />
  )
}
