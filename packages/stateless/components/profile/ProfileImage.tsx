import { Edit, PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'

import { toAccessibleImageUrl } from '@dao-dao/utils'

export type ProfileImageProps = {
  imageUrl?: string
  loading?: boolean
  size: 'xs' | 'sm' | 'md' | 'lg' | 'header'
  className?: string
  fallbackIconClassName?: string
  onClick?: () => void
  rounded?: boolean
  disabled?: boolean
}

export const ProfileImage = forwardRef<HTMLDivElement, ProfileImageProps>(
  function ProfileImage(
    {
      imageUrl,
      loading,
      size,
      className,
      fallbackIconClassName,
      onClick,
      rounded,
    },
    ref
  ) {
    const [loadedImage, setLoadedImage] = useState<string>()
    useEffect(() => {
      if (!imageUrl) {
        setLoadedImage(undefined)
        return
      }

      const onLoad = () => setLoadedImage(imageUrl)

      const image = new Image()
      image.addEventListener('load', onLoad)
      image.src = toAccessibleImageUrl(imageUrl)

      // Clean up.
      return () => image.removeEventListener('load', onLoad)
    }, [imageUrl])

    const loadingImage = loading || loadedImage !== imageUrl

    // Size and rounding of container and children.
    const sizingRoundingClassNames = clsx(
      {
        'h-6 w-6 rounded-full': size === 'xs',
        'h-8 w-8 rounded-lg': size === 'sm',
        'h-10 w-10 rounded-xl': size === 'md',
        'h-16 w-16 rounded-2xl': size === 'lg',
        'h-24 w-24 rounded-full': size === 'header',
      },
      rounded && '!rounded-full'
    )

    const showingPlaceholder = !!imageUrl?.startsWith('/placeholders/')

    return (
      <div
        className={clsx(
          // Center icon.
          'relative flex shrink-0 items-center justify-center border border-transparent',
          (!imageUrl || loadingImage) && '!border-border-interactive-disabled',
          sizingRoundingClassNames,
          // Pulse person placeholder when loading.
          loadingImage && 'animate-pulse !border-border-interactive-disabled',
          // Make clickable for onClick. Enale group events.
          onClick && 'group/profileimage cursor-pointer',

          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {/* Image */}
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 left-0 bg-cover bg-center',
            onClick && [
              'group-hover/profileimage:brightness-[0.35] transition',
              // If showing placeholder, dim even when not hovering.
              showingPlaceholder ? 'brightness-[0.5]' : 'brightness-100',
            ],
            sizingRoundingClassNames
          )}
          style={
            imageUrl
              ? { backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})` }
              : undefined
          }
        ></div>

        {/* No image (hides underneath image always) */}
        <PersonOutline
          className={clsx(
            '!h-1/2 !w-1/2 text-icon-interactive-disabled',
            fallbackIconClassName
          )}
        />

        {/* Click icon */}
        {onClick && (
          <div
            className={clsx(
              'group-hover/profileimage:opacity-100 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center transition-opacity',
              // If showing placeholder, show edit even when not hovering.
              showingPlaceholder ? 'opacity-70' : 'opacity-0',
              sizingRoundingClassNames
            )}
            onClick={onClick}
          >
            {!loadingImage && (
              <Edit className="!h-2/5 !w-2/5 text-icon-primary" />
            )}
          </div>
        )}
      </div>
    )
  }
)
