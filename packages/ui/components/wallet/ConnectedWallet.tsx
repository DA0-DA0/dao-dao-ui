import { CheckCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link, Tag, X } from '@dao-dao/icons'

import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'

export interface ConnectedWalletProps {
  walletName: string
  walletAddress: string
  tokenBalance?: number
  tokenSymbol: string
  onDisconnect?: () => void
  className?: string
}

export const ConnectedWallet = ({
  walletName,
  walletAddress,
  tokenBalance,
  tokenSymbol,
  onDisconnect,
  className,
}: ConnectedWalletProps) => {
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  // Debounce copy unset after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div
      className={clsx('flex flex-row justify-between items-center', className)}
    >
      <div className="flex flex-row gap-4 items-stretch">
        <div className="flex justify-center items-center w-12 h-12 rounded-full border-[2px] border-border-primary">
          <Tag className="w-4 h-4 text-icon-primary" />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <p className="text-text-body primary-text">{walletName}</p>
          <p className="font-mono legend-text">
            {tokenBalance !== undefined ? (
              <>
                {tokenBalance.toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </>
            ) : (
              '...'
            )}{' '}
            ${tokenSymbol}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Tooltip label={t('info.copyWalletAddressTooltip')}>
          <IconButton
            Icon={copied ? CheckCircleIcon : Link}
            className="text-icon-secondary"
            iconClassName="w-5 h-5"
            onClick={() => {
              navigator.clipboard.writeText(walletAddress)
              setTimeout(() => setCopied(false), 2000)
              setCopied(true)
            }}
            size="sm"
            variant="ghost"
          />
        </Tooltip>

        <Tooltip label={t('info.disconnectWalletTooltip')}>
          <IconButton
            Icon={X}
            className="text-icon-secondary"
            iconClassName="w-5 h-5"
            onClick={onDisconnect}
            size="sm"
            variant="ghost"
          />
        </Tooltip>
      </div>
    </div>
  )
}
