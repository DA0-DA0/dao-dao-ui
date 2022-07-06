import { CheckCircleIcon, LogoutIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import { Copy, Wallet } from '@dao-dao/icons'

import { Button } from './Button'
import { ButtonProps } from './Button/Button'
import { Tooltip } from './Tooltip'

export interface WalletConnectProps extends Partial<ButtonProps> {
  connected: boolean
  walletAddress: string
  walletName: string | undefined
  walletBalance: number
  walletBalanceDenom: string
  onConnect: () => void
  onDisconnect?: () => void
  className?: string
}

export const WalletConnect: FC<WalletConnectProps> = ({
  connected,
  walletAddress,
  walletName,
  walletBalance,
  walletBalanceDenom,
  onConnect,
  onDisconnect,
  className,
  ...buttonProps
}) => {
  const { t } = useTranslation()

  return connected ? (
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
          <span className="capitalize caption-text">
            {walletBalance} {walletBalanceDenom.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex absolute top-1 right-2 gap-1 opacity-0 group-hover:opacity-100 transition">
        <CopyButton text={walletAddress} />
        {onDisconnect && <DisconnectButton onClick={onDisconnect} />}
      </div>
    </div>
  ) : (
    <Button
      className={clsx('py-4 hover:outline-brand hover:outline', className)}
      onClick={onConnect}
      type="button"
      {...buttonProps}
    >
      <Wallet fill="currentColor" height="20px" width="20px" />
      <p className="text-light link-text">{t('button.connectWallet')}</p>
    </Button>
  )
}

interface CopyButtonProps {
  text: string
}

const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  return (
    <Tooltip label={t('info.copyWalletAddressTooltip')}>
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

const DisconnectButton: FC<DisconnectButtonProps> = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <Tooltip label={t('info.disconnectWalletTooltip')}>
      <button onClick={onClick} type="button">
        <LogoutIcon className="w-[18px]" />
      </button>
    </Tooltip>
  )
}
