import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EntityType, WalletProfileHeaderProps } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'
import { StatusCard } from '../StatusCard'

export const WalletProfileHeader = ({
  editable,
  profile,
  entity,
  mergeProfileType,
  openMergeProfilesModal,
  updateProfile,
  openProfileNftUpdate,
  className,
  children,
}: WalletProfileHeaderProps) => {
  const { t } = useTranslation()
  const canEditProfile =
    editable &&
    profile &&
    !profile.loading &&
    // Can edit profile if no UUID set (first time profile is created) or if
    // mergeProfileType is not set (no need to merge).
    (!profile.data.uuid || !mergeProfileType)

  const imageUrl =
    !entity || entity.loading
      ? !profile || profile.loading
        ? undefined
        : profile.data.imageUrl
      : entity.data.imageUrl
  const loading = entity?.loading || profile?.loading

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      {editable &&
        entity &&
        !entity.loading &&
        entity.data.type !== EntityType.Dao &&
        profile &&
        !profile.loading &&
        !!profile.data.uuid &&
        mergeProfileType && (
          <StatusCard
            className="max-w-xs mb-4 text-left"
            content={
              mergeProfileType === 'add'
                ? t('info.addWalletToProfileToEdit')
                : t('info.noEditUntilProfileMerge')
            }
            onClick={openMergeProfilesModal}
            size="sm"
            style="warning"
          />
        )}

      <ProfileImage
        imageUrl={imageUrl}
        loading={loading}
        onClick={canEditProfile ? openProfileNftUpdate : undefined}
        size="header"
      />

      {profile && (
        <ProfileNameDisplayAndEditor
          header
          hideNoNameTooltip
          nameOverride={
            (entity &&
              !entity.loading &&
              entity.data.type === EntityType.Dao &&
              entity.data.name) ||
            undefined
          }
          profile={profile}
          updateProfile={canEditProfile ? updateProfile : undefined}
        />
      )}

      {children}
    </div>
  )
}
