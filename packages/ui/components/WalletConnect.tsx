import { CheckCircleIcon, LogoutIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Copy, Wallet } from '@dao-dao/icons'

import { Button } from './Button'
import { ButtonProps } from './Button/Button'
import { Tooltip } from './Tooltip'

export interface WalletConnectProps extends Partial<ButtonProps> {
  connected: boolean
  walletAddress?: string
  walletName?: string
  walletBalance?: number
  walletBalanceDenom: string
  onConnect: () => void
  onDisconnect?: () => void
  className?: string
}

export const WalletConnect = ({
  connected,
  walletAddress,
  walletName,
  walletBalance,
  walletBalanceDenom,
  onConnect,
  onDisconnect,
  className,
  ...buttonProps
}: WalletConnectProps) => {
  const { t } = useTranslation()

  return connected ? (
    <div
      className={clsx(
        'group relative rounded-lg bg-background-primary py-2 px-4 hover:outline hover:outline-border-interactive-active',
        className
      )}
    >
      <div className="justify-left flex h-full w-full items-center gap-4">
        <Wallet height="20px" width="20px" />
        <div className="link-text">
          <span>{walletName}</span>
          <br />
          <span className="caption-text capitalize">
            {walletBalance ?? '...'} {walletBalanceDenom.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
        <CopyButton text={walletAddress ?? ''} />
        {onDisconnect && <DisconnectButton onClick={onDisconnect} />}
      </div>
    </div>
  ) : (
    <Button
      className={clsx(
        'py-4 hover:outline hover:outline-border-interactive-active',
        className
      )}
      onClick={onConnect}
      size="lg"
      type="button"
      {...buttonProps}
    >
      <Wallet height="20px" width="20px" />
      <p className="link-text">{t('button.connectWallet')}</p>
    </Button>
  )
}

interface CopyButtonProps {
  text: string
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  return (
    <Tooltip title={t('info.copyWalletAddressTooltip')}>
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
          <Copy height="18px" width="18px" />
        )}
      </button>
    </Tooltip>
  )
}

interface DisconnectButtonProps {
  onClick: () => void
}

const DisconnectButton = ({ onClick }: DisconnectButtonProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('info.disconnectWalletTooltip')}>
      <button onClick={onClick} type="button">
        <LogoutIcon className="w-[18px]" />
      </button>
    </Tooltip>
  )
}
