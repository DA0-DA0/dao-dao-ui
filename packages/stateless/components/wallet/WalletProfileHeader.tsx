import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { WalletProfileHeaderProps } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'
import { WarningCard } from '../WarningCard'

export const WalletProfileHeader = ({
  editable,
  profile,
  otherProfilesExist,
  openMergeProfilesModal,
  updateProfile,
  openProfileNftUpdate,
  className,
  children,
}: WalletProfileHeaderProps) => {
  const { t } = useTranslation()
  const canEditProfile =
    editable &&
    !profile.loading &&
    profile.data.nonce >= 0 &&
    !otherProfilesExist

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      {editable &&
        !profile.loading &&
        profile.data.nonce > -1 &&
        otherProfilesExist && (
          <WarningCard
            className="max-w-xs mb-4 text-left"
            content={
              // If current profile has never been used, make it more clear that
              // they just have to add the current chain wallet to another
              // profile. Otherwise, show a more general merge message. Most of
              // the time, it should just be the simple "add" case.
              profile.data.nonce === 0 ||
              (!profile.data.name && !profile.data.nft)
                ? t('info.addWalletToProfileToEdit')
                : t('info.noEditUntilProfileMerge')
            }
            onClick={openMergeProfilesModal}
            size="sm"
          />
        )}

      <ProfileImage
        imageUrl={profile.loading ? undefined : profile.data.imageUrl}
        loading={profile.loading}
        onClick={canEditProfile ? openProfileNftUpdate : undefined}
        size="header"
      />

      <ProfileNameDisplayAndEditor
        header
        hideNoNameTooltip
        profile={profile}
        updateProfile={canEditProfile ? updateProfile : undefined}
      />

      {children}
    </div>
  )
}
