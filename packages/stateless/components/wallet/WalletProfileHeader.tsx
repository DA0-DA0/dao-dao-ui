import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { WalletProfileHeaderProps } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'
import { WarningCard } from '../WarningCard'

export const WalletProfileHeader = ({
  editable,
  profile,
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
    profile.data.nonce >= 0 &&
    !mergeProfileType

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      {editable &&
        profile &&
        !profile.loading &&
        profile.data.nonce > -1 &&
        mergeProfileType && (
          <WarningCard
            className="max-w-xs mb-4 text-left"
            content={
              mergeProfileType === 'add'
                ? t('info.addWalletToProfileToEdit')
                : t('info.noEditUntilProfileMerge')
            }
            onClick={openMergeProfilesModal}
            size="sm"
          />
        )}

      <ProfileImage
        imageUrl={
          !profile || profile.loading ? undefined : profile.data.imageUrl
        }
        loading={profile?.loading}
        onClick={canEditProfile ? openProfileNftUpdate : undefined}
        size="header"
      />

      {profile && (
        <ProfileNameDisplayAndEditor
          header
          hideNoNameTooltip
          profile={profile}
          updateProfile={canEditProfile ? updateProfile : undefined}
        />
      )}

      {children}
    </div>
  )
}
