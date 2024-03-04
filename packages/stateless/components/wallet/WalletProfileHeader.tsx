import clsx from 'clsx'

import { WalletProfileHeaderProps } from '@dao-dao/types'

import { ProfileImage, ProfileNameDisplayAndEditor } from '../profile'

export const WalletProfileHeader = ({
  editable,
  profile,
  updateProfile,
  openProfileNftUpdate,
  className,
  children,
}: WalletProfileHeaderProps) => {
  const canEditProfile = editable && !profile.loading && profile.data.nonce >= 0

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 text-center',
        className
      )}
    >
      <ProfileImage
        imageUrl={profile.loading ? undefined : profile.data.imageUrl}
        loading={profile.loading}
        onClick={canEditProfile ? openProfileNftUpdate : undefined}
        size="header"
      />

      <ProfileNameDisplayAndEditor
        header
        profile={profile}
        updateProfile={canEditProfile ? updateProfile : undefined}
      />

      {children}
    </div>
  )
}
