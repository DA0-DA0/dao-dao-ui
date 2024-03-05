import clsx from 'clsx'

import { averageColorSelector } from '@dao-dao/state/recoil'
import { ProfileCardWrapperProps } from '@dao-dao/types'

import { useCachedLoadable } from '../../hooks'
import { CornerGradient } from '../CornerGradient'
import { ProfileImage } from './ProfileImage'
import { ProfileNameDisplayAndEditor } from './ProfileNameDisplayAndEditor'

export const ProfileCardWrapper = ({
  children,
  profile,
  compact = false,
  underHeaderComponent,
  childContainerClassName,
  className,
}: ProfileCardWrapperProps) => {
  // Get average color of image URL if in compact mode.
  const averageImgColorLoadable = useCachedLoadable(
    !compact || profile.loading
      ? undefined
      : averageColorSelector(profile.data.imageUrl)
  )
  const averageImgColor =
    averageImgColorLoadable.state === 'hasValue' &&
    averageImgColorLoadable.contents
      ? // If in #RRGGBB format, add ~20% opacity (0x33 = 51, 51/255 = 0.2).
        averageImgColorLoadable.contents +
        (averageImgColorLoadable.contents.length === 7 ? '33' : '')
      : undefined

  return (
    <div
      className={clsx(
        'relative rounded-lg bg-background-tertiary shadow-dp4',
        className
      )}
    >
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient className="h-36 opacity-50" color={averageImgColor} />
      )}

      <div className={clsx(compact ? 'p-4' : 'p-6')}>
        {compact ? (
          <div className="flex flex-row items-stretch gap-3">
            <ProfileImage
              imageUrl={profile.loading ? undefined : profile.data.imageUrl}
              loading={profile.loading}
              size="md"
            />

            <div className="flex min-w-0 grow flex-col gap-1">
              <ProfileNameDisplayAndEditor
                compact={compact}
                profile={profile}
              />
              {underHeaderComponent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-4">
            <ProfileImage
              className="mb-6"
              imageUrl={profile.loading ? undefined : profile.data.imageUrl}
              loading={profile.loading}
              size="lg"
            />
            <ProfileNameDisplayAndEditor
              className="mb-5"
              compact={compact}
              profile={profile}
            />
            {underHeaderComponent}
          </div>
        )}
      </div>

      {children && (
        <div
          className={clsx(
            'flex flex-col items-stretch border-t border-t-border-primary',
            compact ? 'p-4' : 'p-6',
            childContainerClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
