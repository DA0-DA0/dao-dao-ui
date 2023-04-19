import { Settings, Wallet } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { CopyableAddress } from '../CopyableAddress'
import { IconButton } from '../icon_buttons'

export interface ConnectedWalletProps {
  walletProviderImageUrl: string
  walletName: string
  walletAddress: string
  openWalletModal: () => void
  className?: string
}

export const ConnectedWallet = ({
  walletProviderImageUrl,
  walletName,
  walletAddress,
  openWalletModal,
  className,
}: ConnectedWalletProps) => {
  const [copied, setCopied] = useState(false)
  // Debounce copy unset after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex min-w-0 flex-row items-stretch gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[2px] border-border-primary">
          <div
            className="h-6 w-6 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${walletProviderImageUrl})`,
            }}
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-1">
          <p className="primary-text text-text-body">{walletName}</p>

          <CopyableAddress
            Icon={Wallet}
            address={walletAddress}
            iconClassName="!h-4 !w-4"
            textClassName="!legend-text"
          />
        </div>
      </div>

      <IconButton
        Icon={Settings}
        className="text-icon-secondary"
        onClick={openWalletModal}
        size="sm"
        variant="ghost"
      />
    </div>
  )
}
