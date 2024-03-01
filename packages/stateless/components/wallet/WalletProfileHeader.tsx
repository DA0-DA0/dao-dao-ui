import clsx from 'clsx'

import { WalletProfileHeaderProps } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'

export const WalletProfileHeader = ({
  editable,
  profileData,
  updateProfileName,
  openProfileNftUpdate,
  className,
  children,
}: WalletProfileHeaderProps) => {
  const canEditProfile =
    editable && !profileData.loading && profileData.profile.nonce >= 0

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      <ProfileImage
        imageUrl={profileData.profile.imageUrl}
        loading={profileData.loading}
        onClick={canEditProfile ? openProfileNftUpdate : undefined}
        size="header"
      />

      <ProfileNameDisplayAndEditor
        header
        updateProfileName={canEditProfile ? updateProfileName : undefined}
        walletProfileData={profileData}
      />

      {children}
    </div>
  )
}
