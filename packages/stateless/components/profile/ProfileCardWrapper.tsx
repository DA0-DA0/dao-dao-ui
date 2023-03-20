import clsx from 'clsx'

import { averageColorSelector } from '@dao-dao/state/recoil'
import { ProfileCardWrapperProps } from '@dao-dao/types/stateless/ProfileCardWrapper'

import { useCachedLoadable } from '../../hooks'
import { CornerGradient } from '../CornerGradient'
import { ProfileImage } from './ProfileImage'
import { ProfileNameDisplayAndEditor } from './ProfileNameDisplayAndEditor'

export * from '@dao-dao/types/stateless/ProfileCardWrapper'

export const ProfileCardWrapper = ({
  children,
  walletProfileData,
  showUpdateProfileNft,
  updateProfileName,
  compact = false,
  underHeaderComponent,
  childContainerClassName,
}: ProfileCardWrapperProps) => {
  // Get average color of image URL if in compact mode.
  const averageImgColorLoadable = useCachedLoadable(
    !compact || walletProfileData.loading
      ? undefined
      : averageColorSelector(walletProfileData.profile.imageUrl)
  )
  const averageImgColor =
    averageImgColorLoadable.state === 'hasValue' &&
    averageImgColorLoadable.contents
      ? // If in #RRGGBB format, add ~20% opacity (0x33 = 51, 51/255 = 0.2).
        averageImgColorLoadable.contents +
        (averageImgColorLoadable.contents.length === 7 ? '33' : '')
      : undefined

  const canEdit = walletProfileData.profile.nonce >= 0

  return (
    <div className="relative rounded-lg border border-border-primary">
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient className="h-36 opacity-50" color={averageImgColor} />
      )}

      <div className="p-6">
        {compact ? (
          <div className="flex flex-row items-stretch gap-3">
            <ProfileImage
              imageUrl={walletProfileData.profile.imageUrl}
              loading={walletProfileData.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="sm"
            />

            <div className="flex min-w-0 flex-col gap-1">
              <ProfileNameDisplayAndEditor
                compact={compact}
                editingContainerClassName="h-5"
                updateProfileName={updateProfileName}
                walletProfileData={walletProfileData}
              />
              {underHeaderComponent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-4">
            <ProfileImage
              className="mb-6"
              imageUrl={walletProfileData.profile.imageUrl}
              loading={walletProfileData.loading}
              onEdit={canEdit ? showUpdateProfileNft : undefined}
              size="lg"
            />
            <ProfileNameDisplayAndEditor
              className="mb-5"
              compact={compact}
              editingContainerClassName="h-5"
              updateProfileName={updateProfileName}
              walletProfileData={walletProfileData}
            />
            {underHeaderComponent}
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex flex-col items-stretch border-t border-t-border-primary p-6',
          childContainerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
