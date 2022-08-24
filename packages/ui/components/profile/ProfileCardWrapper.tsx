import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDate } from '@dao-dao/utils'

import { CornerGradient } from '../CornerGradient'
import { MembershipPill } from './MembershipPill'
import { ProfileImage } from './ProfileImage'

export type ProfileCardWrapperProps = {
  children: ReactNode | ReactNode[]
  imgUrl: string
  walletName: string
  isMember: boolean
  daoName: string
  childContainerClassName?: string
} & (
  | {
      established: Date
      compact?: false
    }
  | {
      established?: never
      compact: true
    }
)

export const ProfileCardWrapper = ({
  children,
  imgUrl,
  walletName,
  established,
  isMember,
  daoName,
  compact,
  childContainerClassName,
}: ProfileCardWrapperProps) => {
  const { t } = useTranslation()

  const [averageImgColor, setAverageImgColor] = useState<string>()
  // Get average color of image URL.
  useEffect(() => {
    const absoluteUrl = new URL(imgUrl, document.baseURI).href
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
  }, [imgUrl])

  return (
    <div className="relative rounded-lg border border-border-primary">
      {/* Absolutely positioned, against relative outer-most div (without padding). */}
      {compact && !!averageImgColor && (
        <CornerGradient
          className="-scale-y-100"
          color={averageImgColor}
          gradientShape="86.22% 102.08% at 0% 114.93%"
        />
      )}

      <div className="p-6">
        {compact ? (
          <div className="flex flex-row gap-3 items-stretch">
            <ProfileImage imgUrl={imgUrl} size="sm" />

            <div className="flex flex-col gap-1">
              <div className="text-text-body title-text">{walletName}</div>
              <MembershipPill daoName={daoName} ghost isMember={isMember} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-4">
            <ProfileImage imgUrl={imgUrl} size="lg" />
            <div className="mt-6 text-text-body title-text">{walletName}</div>
            <div className="mt-2 mb-5 font-mono caption-text">
              {t('profile.est')}
              {formatDate(established)}
            </div>
            <MembershipPill daoName={daoName} isMember={isMember} />
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
