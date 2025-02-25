import {
  Logout,
  NotificationsOutlined,
  Tag,
  WarningAmberRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  DaoPageMode,
  EntityType,
  NavWalletConnectedProps,
  PopupTriggerCustomComponent,
} from '@dao-dao/types'
import {
  abbreviateAddress,
  getDisplayNameForChainId,
  getImageUrlForChainId,
} from '@dao-dao/utils'

import { IconButton } from '../icon_buttons'
import { useAppContextIfAvailable } from '../layout/AppContext'
import { Notifications } from '../Notifications'
import {
  ButtonPopup,
  FilterableItem,
  FilterableItemPopup,
  Popup,
} from '../popup'
import { ProfileImage } from '../profile'
import { Tooltip } from '../tooltip'
import { WalletLogo } from './WalletLogo'

export const NavWalletConnected = ({
  wallet,
  profile,
  entity,
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

  const [addressPopupVisible, setAddressPopupVisible] = useState(false)

  const imageUrl = entity.loading
    ? profile.loading
      ? undefined
      : profile.data.imageUrl
    : entity.data.imageUrl
  const loading = entity.loading || profile.loading

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
          imageUrl={imageUrl}
          loading={loading}
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
    [mode, t, wallet, imageUrl, loading]
  )

  const profileChainAddresses = useMemo(
    (): (FilterableItem & { chainId: string; address: string })[] =>
      entity.loading || profile.loading
        ? []
        : (entity.data.type === EntityType.Dao
            ? entity.data.daoInfo.accounts.map(
                ({ type, chainId, address }) => ({
                  key: chainId + ':' + address,
                  label: getDisplayNameForChainId(chainId),
                  iconUrl: getImageUrlForChainId(chainId),
                  description: t(`accountTypeLabel.${type}`),
                  rightNode: (
                    <p className="caption-text self-end md:self-center">
                      {abbreviateAddress(address, 6)}
                    </p>
                  ),
                  iconClassName: '!h-8 !w-8',
                  contentContainerClassName: '!gap-4',
                  chainId,
                  address,
                })
              )
            : Object.entries(profile.data.chains).map(
                ([chainId, { address }]) => ({
                  key: chainId,
                  label: getDisplayNameForChainId(chainId),
                  iconUrl: getImageUrlForChainId(chainId),
                  rightNode: (
                    <p className="caption-text self-end md:self-center">
                      {abbreviateAddress(address, 6)}
                    </p>
                  ),
                  iconClassName: '!h-8 !w-8',
                  contentContainerClassName: '!gap-4',
                  chainId,
                  address,
                })
              )
          ).sort((a, b) => a.label.localeCompare(b.label)),
    [t, entity, profile]
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
                className: 'relative',
                variant: 'highlight',
                size: 'sm',
                // Show badge when notifications exist.
                children: !inbox.loading && inbox.items.length > 0 && (
                  <div className="animate-fade-in bg-icon-interactive-active absolute top-[0.2rem] right-[0.2rem] h-1 w-1 rounded-full"></div>
                ),
              },
            }}
          >
            <div className="border-border-base flex flex-row items-center justify-between border-b p-4">
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
        !entity.loading &&
        entity.data.type !== EntityType.Dao &&
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
                  label: t('button.copyAddress'),
                  Icon: Tag,
                  onClick: () => setAddressPopupVisible(true),
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

      <FilterableItemPopup
        filterableItemKeys={FILTERABLE_KEYS}
        items={profileChainAddresses}
        onSelect={({ chainId, address }) => {
          navigator.clipboard.writeText(address)
          toast.success(
            t('info.copiedChainAddress', {
              chain: getDisplayNameForChainId(chainId),
            })
          )
        }}
        searchPlaceholder={t('info.searchForChain')}
        trigger={{
          type: 'manual',
          open: addressPopupVisible,
          setOpen: setAddressPopupVisible,
        }}
      />
    </div>
  )
}

const FILTERABLE_KEYS = ['label', 'chainId', 'address']
