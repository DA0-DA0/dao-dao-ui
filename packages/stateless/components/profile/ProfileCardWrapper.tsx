import clsx from 'clsx'

import { ProfileCardWrapperProps } from '@dao-dao/types'

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
  tintColor,
}: ProfileCardWrapperProps) => (
  <div
    className={clsx(
      'bg-background-tertiary shadow-dp4 relative rounded-lg',
      className
    )}
  >
    {/* Absolutely positioned, against relative outer-most div (without padding). */}
    {compact && !!tintColor && (
      <CornerGradient className="h-36 opacity-50" color={tintColor} />
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
            <ProfileNameDisplayAndEditor compact={compact} profile={profile} />
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
          'border-t-border-primary flex flex-col items-stretch border-t',
          compact ? 'p-4' : 'p-6',
          childContainerClassName
        )}
      >
        {children}
      </div>
    )}
  </div>
)
