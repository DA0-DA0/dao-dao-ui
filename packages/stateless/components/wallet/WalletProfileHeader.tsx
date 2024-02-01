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
        'flex flex-col items-center gap-2 text-center',
        className
      )}
    >
      <ProfileImage
        imageUrl={profileData.profile.imageUrl}
        loading={profileData.loading}
        onEdit={canEditProfile ? openProfileNftUpdate : undefined}
        size="xl"
      />

      <ProfileNameDisplayAndEditor
        editingContainerClassName="h-8"
        nameClassName="!font-bold !text-2xl"
        updateProfileName={canEditProfile ? updateProfileName : undefined}
        walletProfileData={profileData}
      />

      {children}
    </div>
  )
}
