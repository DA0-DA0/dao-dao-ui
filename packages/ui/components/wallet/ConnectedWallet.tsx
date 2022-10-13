import { CheckCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link, Tag, X } from '@dao-dao/icons'
import { LoadingData } from '@dao-dao/tstypes'

import { IconButton } from '../IconButton'
import { TokenAmountDisplay } from '../TokenAmountDisplay'
import { Tooltip } from '../Tooltip'

export interface ConnectedWalletProps {
  data: LoadingData<{
    walletName: string
    walletAddress: string
    tokenBalance: LoadingData<number>
  }>
  tokenDecimals: number
  tokenSymbol: string
  onDisconnect?: () => void
  className?: string
}

export const ConnectedWallet = ({
  data,
  tokenDecimals,
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
          <p
            className={clsx(
              'text-text-body primary-text',
              data.loading && 'animate-pulse'
            )}
          >
            {data.loading ? '...' : data.data.walletName}
          </p>

          <TokenAmountDisplay
            amount={data.loading ? { loading: true } : data.data.tokenBalance}
            className="font-mono legend-text"
            maxDecimals={tokenDecimals}
            symbol={tokenSymbol}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Tooltip title={t('info.copyWalletAddressTooltip')}>
          <IconButton
            Icon={copied ? CheckCircleIcon : Link}
            className="text-icon-secondary"
            disabled={data.loading}
            iconClassName="w-5 h-5"
            onClick={() => {
              if (data.loading) {
                return
              }

              navigator.clipboard.writeText(data.data.walletAddress)
              setTimeout(() => setCopied(false), 2000)
              setCopied(true)
            }}
            size="sm"
            variant="ghost"
          />
        </Tooltip>

        {onDisconnect && (
          <Tooltip title={t('info.disconnectWalletTooltip')}>
            <IconButton
              Icon={X}
              className="text-icon-secondary"
              disabled={data.loading}
              iconClassName="w-5 h-5"
              onClick={onDisconnect}
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}
