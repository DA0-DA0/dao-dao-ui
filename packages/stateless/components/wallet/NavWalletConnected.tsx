import {
  Logout,
  NotificationsOutlined,
  Person,
  WarningAmberRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoPageMode,
  NavWalletConnectedProps,
  PopupTriggerCustomComponent,
} from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
import { useAppContextIfAvailable } from '../layout/AppContext'
import { Notifications } from '../Notifications'
import { ButtonPopup, Popup } from '../popup'
import { ProfileImage } from '../profile'
import { Tooltip } from '../tooltip'
import { WalletLogo } from './WalletLogo'

export const NavWalletConnected = ({
  wallet,
  profile,
  mergeProfileType,
  onMergeProfiles,
  disconnect,
  className,
  mode,
  ButtonLink,
  ...notificationsProps
}: NavWalletConnectedProps) => {
  const { t } = useTranslation()

  // SDA error pages are not wrapped in app context, so we aren't guaranteed to
  // be in it.
  const { mode: appMode, inbox } = useAppContextIfAvailable() ?? {}

  const [copied, setCopied] = useState(false)
  // Debounce copy unset after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const ProfileImagePopup: PopupTriggerCustomComponent = useCallback(
    ({ onClick }) => (
      <div
        className={clsx(
          'relative flex shrink-0 items-center justify-center',
          mode !== 'dock' &&
            'cursor-pointer opacity-100 transition-opacity hover:opacity-70 active:opacity-60'
        )}
        onClick={mode === 'dock' ? undefined : onClick}
      >
        <ProfileImage
          imageUrl={profile.loading ? undefined : profile.data.imageUrl}
          loading={profile.loading}
          size={mode === 'dock' ? 'xs' : 'md'}
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
            size={mode === 'dock' ? 'xs' : 'sm'}
          />
        </Tooltip>
      </div>
    ),
    [mode, t, wallet, profile]
  )

  return (
    <div
      className={clsx(
        'flex grow flex-row items-center justify-between gap-3.5',
        className
      )}
    >
      {/* Notification popup */}
      {mode !== 'dock' &&
        appMode === DaoPageMode.Dapp &&
        inbox &&
        notificationsProps.inbox && (
          <Popup
            popupClassName="min-w-72 max-w-lg max-h-[48rem]"
            position={mode === 'sidebar' ? 'wide' : 'left'}
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
                className: 'text-icon-secondary relative',
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
              inbox={notificationsProps.inbox}
            />
          </Popup>
        )}

      {mode !== 'dock' &&
        !profile.loading &&
        profile.data.nonce > -1 &&
        mergeProfileType && (
          <Tooltip
            title={
              mergeProfileType === 'add'
                ? t('info.addWalletToProfile')
                : t('info.mergeProfilesTooltip')
            }
          >
            <IconButton
              Icon={WarningAmberRounded}
              iconClassName="text-icon-interactive-warning"
              onClick={onMergeProfiles}
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        )}

      {/* Icon overflows a bit on the bottom, so add extra room with pb-1. */}
      <div className="flex min-w-0 grow flex-row items-stretch gap-3 pb-1">
        {/* Image */}
        <ButtonPopup
          ButtonLink={ButtonLink}
          position="left"
          sections={[
            {
              buttons: [
                {
                  label: t('button.yourProfile'),
                  Icon: Person,
                  href: '/me',
                },
                {
                  label: t('button.logOut'),
                  Icon: Logout,
                  onClick: disconnect,
                },
              ],
            },
          ]}
          topOffset={8}
          trigger={{
            type: 'custom',
            Renderer: ProfileImagePopup,
          }}
        />
      </div>
    </div>
  )
}
