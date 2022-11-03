import { Check, Close, Link, Wallet } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
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
      className={clsx('flex flex-row items-center justify-between', className)}
    >
      <div className="flex flex-row items-stretch gap-4">
        <div className="border-border-primary flex h-12 w-12 items-center justify-center rounded-full border-[2px]">
          <Wallet className="text-icon-primary !h-5 !w-5" />
        </div>

        <div className="flex flex-col justify-center gap-1">
          <p
            className={clsx(
              'primary-text text-text-body',
              data.loading && 'animate-pulse'
            )}
          >
            {data.loading ? '...' : data.data.walletName}
          </p>

          <TokenAmountDisplay
            amount={data.loading ? { loading: true } : data.data.tokenBalance}
            className="legend-text font-mono"
            decimals={tokenDecimals}
            symbol={tokenSymbol}
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <Tooltip title={t('info.copyWalletAddressTooltip')}>
          <IconButton
            Icon={copied ? Check : Link}
            className="text-icon-secondary"
            disabled={data.loading}
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
              Icon={Close}
              className="text-icon-secondary"
              disabled={data.loading}
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
