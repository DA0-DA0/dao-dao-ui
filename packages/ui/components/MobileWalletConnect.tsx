import { LogoutIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC } from 'react'

import { Wallet } from '@dao-dao/icons'

import { WalletConnectProps } from './WalletConnect'

export const MobileWalletConnect: FC<WalletConnectProps> = ({
  walletAddress,
  walletName,
  walletBalance,
  walletBalanceDenom,
  onConnect,
  onDisconnect,
  className,
  ...buttonProps
}) =>
  walletAddress ? (
    <button
      className={clsx(
        'flex justify-between items-center py-2 px-3 my-1 bg-btn-secondary rounded-lg hover:outline-brand hover:outline',
        className
      )}
      onClick={walletAddress ? onDisconnect : onConnect}
      type="button"
      {...buttonProps}
    >
      <div className="flex gap-1 items-center w-full h-full justify-left">
        <Wallet fill="currentColor" height="18px" width="18px" />
        <p className="link-text">{walletName}</p>
      </div>
      <LogoutIcon className="w-4" />
    </button>
  ) : (
    <button
      className={clsx(
        'flex gap-1 items-center py-2 px-3 my-1 bg-btn-secondary rounded-lg hover:outline-brand hover:outline',
        className
      )}
      onClick={onConnect}
      size="sm"
      type="button"
      {...buttonProps}
    >
      <Wallet fill="currentColor" height="18px" width="18px" />
      <p className="link-text">Connect wallet</p>
    </button>
  )
