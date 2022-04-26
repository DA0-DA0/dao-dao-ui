import { FC, useState } from 'react'

import { Wallet, Copy } from '@dao-dao/icons'
import { CheckCircleIcon, LogoutIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

import { Button } from './Button'
import { Tooltip } from './Tooltip'

export interface WalletConnectProps {
  walletAddress: string
  walletName: string | undefined
  walletBalance: number
  walletBalanceDenom: string
  handleConnect: () => void
  className?: string
}

export const WalletConnect: FC<WalletConnectProps> = ({
  walletAddress,
  walletName,
  walletBalance,
  walletBalanceDenom,
  handleConnect,
  className,
}) =>
  walletAddress ? (
    <div
      className={clsx(
        'group relative py-2 px-4 bg-primary rounded-lg hover:outline-brand hover:outline',
        className
      )}
    >
      <div className="flex gap-4 items-center w-full h-full justify-left">
        <Wallet fill="currentColor" height="20px" width="20px" />
        <div className="link-text">
          <span>{walletName}</span>
          <br />
          <span className="caption-text capitalize">
            {walletBalance} {walletBalanceDenom}
          </span>
        </div>
      </div>
      <div className="flex absolute top-1 right-2 gap-1 opacity-0 group-hover:opacity-100 transition">
        <CopyButton text={walletAddress} />
        <DisconnectButton onClick={handleConnect} />
      </div>
    </div>
  ) : (
    <Button
      className={clsx('py-4 hover:outline-brand hover:outline', className)}
      onClick={handleConnect}
    >
      <Wallet fill="currentColor" height="20px" width="20px" />
      <p className="text-light link-text">Connect wallet</p>
    </Button>
  )

interface CopyButtonProps {
  text: string
}

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false)
  return (
    <Tooltip label="Copy wallet address">
      <button
        onClick={() => {
          navigator.clipboard.writeText(text)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
        }}
        type="button"
      >
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <Copy color="currentColor" height="18px" width="18px" />
        )}
      </button>
    </Tooltip>
  )
}

interface DisconnectButtonProps {
  onClick: () => void
}

const DisconnectButton: FC<DisconnectButtonProps> = ({ onClick }) => (
  <Tooltip label="Disconnect wallet">
    <button onClick={onClick} type="button">
      <LogoutIcon className="w-[18px]" />
    </button>
  </Tooltip>
)
