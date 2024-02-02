import { fromBech32 } from '@cosmjs/encoding'
import { Wallet } from '@cosmos-kit/core'
import {
  Check,
  Logout,
  Notifications,
  Wallet as WalletIcon,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButtonLinkProps, WalletProfileData } from '@dao-dao/types'

import { CopyableAddress } from '../CopyableAddress'
import { IconButton } from '../icon_buttons'
import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'
import { Tooltip } from '../tooltip'
import { WalletLogo } from './WalletLogo'

export interface ConnectedWalletProps {
  wallet: Wallet
  walletAddress: string
  walletProfileData: WalletProfileData
  updateProfileName: (name: string | null) => Promise<void>
  onEditProfileImage: () => void
  disconnect: () => Promise<void>
  IconButtonLink: ComponentType<IconButtonLinkProps>
  className?: string
}

export const ConnectedWallet = ({
  wallet,
  walletAddress,
  walletProfileData,
  updateProfileName,
  onEditProfileImage,
  disconnect,
  IconButtonLink,
  className,
}: ConnectedWalletProps) => {
  const { t } = useTranslation()

  const [copied, setCopied] = useState(false)
  // Debounce copy unset after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  // Try to get wallet prefix length so we shorten the address well.
  let prefixLength = 5
  try {
    prefixLength = fromBech32(walletAddress).prefix.length
  } catch {}

  return (
    <div
      className={clsx(
        'flex grow flex-row items-center justify-between gap-2',
        className
      )}
    >
      <div className="flex min-w-0 flex-row items-stretch gap-3">
        {/* Image */}
        <div className="relative flex shrink-0 items-center justify-center">
          <ProfileImage
            imageUrl={walletProfileData.profile.imageUrl}
            loading={walletProfileData.loading}
            onEdit={onEditProfileImage}
            size="sm"
          />

          <Tooltip
            title={
              wallet.name.startsWith('web3auth_')
                ? t('info.signedInAs', {
                    name: wallet?.prettyName,
                  })
                : t('info.connectedTo', {
                    name: wallet?.prettyName,
                  })
            }
          >
            <WalletLogo
              className="!absolute -right-1 -bottom-1"
              logo={wallet.logo}
              size="xs"
            />
          </Tooltip>
        </div>

        <div className="flex min-w-0 flex-col items-stretch gap-0.5 pt-1">
          <ProfileNameDisplayAndEditor
            compact
            editingClassName="flex flex-col items-stretch"
            updateProfileName={updateProfileName}
            walletProfileData={walletProfileData}
          />

          <CopyableAddress
            Icon={copied ? Check : WalletIcon}
            address={walletAddress}
            className="!justify-start"
            hideIcon
            iconClassName="!h-4 !w-4"
            onCopy={() => setCopied(true)}
            takeStartEnd={{ start: prefixLength + 8, end: 8 }}
            textClassName="!legend-text"
          />
        </div>
      </div>

      <Tooltip title={t('button.notifications')}>
        <IconButtonLink
          Icon={Notifications}
          className="ml-2 text-icon-secondary"
          href="/inbox"
          size="sm"
          variant="ghost"
        />
      </Tooltip>

      <Tooltip title={t('button.logOut')}>
        <IconButton
          Icon={Logout}
          className="text-icon-secondary"
          onClick={disconnect}
          size="sm"
          variant="ghost"
        />
      </Tooltip>
    </div>
  )
}
