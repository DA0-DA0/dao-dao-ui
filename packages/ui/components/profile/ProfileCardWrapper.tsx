import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileCardWrapperProps } from '@dao-dao/tstypes/ui/ProfileCardWrapper'
import { formatDate } from '@dao-dao/utils'

import { CopyToClipboard } from '../CopyToClipboard'
import { CornerGradient } from '../CornerGradient'
import { ProfileImage } from './ProfileImage'

export * from '@dao-dao/tstypes/ui/ProfileCardWrapper'

export const ProfileCardWrapper = ({
  children,
  walletAddress,
  walletProfile,
  showUpdateProfile,
  established,
  compact,
  underHeaderComponent,
  childContainerClassName,
}: ProfileCardWrapperProps) => {
  const { t } = useTranslation()

  const [averageImgColor, setAverageImgColor] = useState<string>()
  // Get average color of image URL.
  useEffect(() => {
    // Only need this in compact mode.
    if (!compact || walletProfile.loading) {
      return
    }

    const absoluteUrl = new URL(walletProfile.data.imageUrl, document.baseURI)
      .href
    fetch(`https://fac.withoutdoing.com/${absoluteUrl}`)
      .then((response) => response.text())
      // Only set color if appears to be valid color string.
      .then((value) => {
        const color = value.trim()
        if (!color.startsWith('#')) {
          return
        }

        setAverageImgColor(
          color +
            // If in #RRGGBB format, add ~20% opacity.
            (color.length === 7 ? '33' : '')
        )
      })
  }, [compact, walletProfile])

  return (
    <div className="relative rounded-lg border border-border-primary">
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient color={averageImgColor} />
      )}

      <div className="p-6">
        {compact ? (
          <div className="flex flex-row gap-3 items-stretch">
            <ProfileImage
              imageUrl={
                walletProfile.loading ? undefined : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={showUpdateProfile}
              size="sm"
            />

            <div className="flex flex-col gap-1">
              {walletProfile.loading || walletProfile.data.name ? (
                <div
                  className={clsx(
                    'text-text-body title-text',
                    walletProfile.loading && 'animate-pulse'
                  )}
                >
                  {walletProfile.loading ? '...' : walletProfile.data.name}
                </div>
              ) : (
                <CopyToClipboard
                  className="text-text-body title-text"
                  value={walletAddress}
                />
              )}
              {underHeaderComponent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-4">
            <ProfileImage
              imageUrl={
                walletProfile.loading ? '' : walletProfile.data.imageUrl
              }
              loading={walletProfile.loading}
              onEdit={showUpdateProfile}
              size="lg"
            />
            {walletProfile.loading || walletProfile.data.name ? (
              <div
                className={clsx(
                  'mt-6 mb-5 text-text-body title-text',
                  walletProfile.loading && 'animate-pulse'
                )}
              >
                {walletProfile.loading ? '...' : walletProfile.data.name}
              </div>
            ) : (
              <CopyToClipboard
                className="mt-6 mb-5 text-text-body title-text"
                value={walletAddress}
              />
            )}
            {established && (
              <div className="-mt-3 mb-5 font-mono caption-text">
                {t('info.establishedAbbr')} {formatDate(established)}
              </div>
            )}
            {underHeaderComponent}
          </div>
        )}
      </div>

      <div
        className={clsx(
          'flex flex-col items-stretch p-6 border-t border-t-border-primary',
          childContainerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
