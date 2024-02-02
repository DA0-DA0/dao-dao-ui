import { fromBech32 } from '@cosmjs/encoding'
import {
  Check,
  Logout,
  NotificationsOutlined,
  Wallet as WalletIcon,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoPageMode, NavWalletConnectedProps } from '@dao-dao/types'

import { CopyableAddress } from '../CopyableAddress'
import { IconButton } from '../icon_buttons'
import { useAppContextIfAvailable } from '../layout/AppContext'
import { Notifications } from '../Notifications'
import { Popup } from '../popup'
import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'
import { Tooltip } from '../tooltip'
import { WalletLogo } from './WalletLogo'

export const NavWalletConnected = ({
  wallet,
  walletAddress,
  walletProfileData,
  updateProfileName,
  onEditProfileImage,
  disconnect,
  className,
  compact,
  inResponsiveNav,
  ...notificationsProps
}: NavWalletConnectedProps) => {
  const { t } = useTranslation()

  // SDA error pages are not wrapped in app context, so we aren't guaranteed to
  // be in it.
  const { mode, inbox } = useAppContextIfAvailable() ?? {}

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
        'flex grow flex-row items-center justify-between',
        compact ? 'gap-3' : 'gap-2',
        className
      )}
    >
      <div className="flex min-w-0 grow flex-row items-stretch gap-3">
        {/* Image */}
        <div className="relative flex shrink-0 items-center justify-center">
          <ProfileImage
            imageUrl={walletProfileData.profile.imageUrl}
            loading={walletProfileData.loading}
            onEdit={!compact ? onEditProfileImage : undefined}
            size={compact ? 'xs' : 'sm'}
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

        {!compact && (
          <div className="flex min-w-0 grow flex-col items-stretch gap-0.5 pt-1">
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
              iconSizeClassName="!h-4 !w-4"
              onCopy={() => setCopied(true)}
              takeStartEnd={{ start: prefixLength + 5, end: 5 }}
              textClassName="!legend-text"
            />
          </div>
        )}
      </div>

      {mode === DaoPageMode.Dapp && inbox && !compact && (
        <Popup
          popupClassName="max-w-lg max-h-[48rem]"
          position={inResponsiveNav ? 'wide' : 'left'}
          trigger={{
            type: 'icon_button',
            tooltip:
              !inbox.loading && inbox.items.length > 0
                ? t('title.notificationsWithCount', {
                    count: inbox.items.length,
                  })
                : t('title.notifications'),
            props: {
              Icon: NotificationsOutlined,
              className: 'ml-2 text-icon-secondary relative',
              variant: 'ghost',
              size: 'sm',
              // Show badge when notifications exist.
              children: !inbox.loading && inbox.items.length > 0 && (
                <div className="absolute top-[0.2rem] right-[0.2rem] h-1 w-1 animate-fade-in rounded-full bg-icon-interactive-active"></div>
              ),
            },
          }}
        >
          <div className="flex flex-row items-center justify-between border-b border-border-base p-4">
            <p className="header-text">{t('title.notifications')}</p>

            <div className="flex flex-row items-center gap-1 md:gap-2">
              {notificationsProps.inbox.buttons.refresh}
              {notificationsProps.inbox.buttons.clear}
              {notificationsProps.inbox.buttons.settings}
            </div>
          </div>

          <Notifications
            {...notificationsProps}
            className="no-scrollbar overflow-y-auto"
            compact
          />
        </Popup>
      )}

      <Tooltip title={t('button.logOut')}>
        <IconButton
          Icon={Logout}
          className="text-icon-secondary"
          onClick={disconnect}
          size={compact ? 'xs' : 'sm'}
          variant="ghost"
        />
      </Tooltip>
    </div>
  )
}
