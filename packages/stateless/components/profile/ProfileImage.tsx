import { Edit, PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'

import { toAccessibleImageUrl } from '@dao-dao/utils'

export interface ProfileImageProps {
  imageUrl?: string
  loading?: boolean
  size: 'xs' | 'sm' | 'lg' | 'xl'
  className?: string
  fallbackIconClassName?: string
  onClick?: () => void
  onEdit?: () => void
  rounded?: boolean
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
      onEdit,
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
        'h-8 w-8 rounded-full': size === 'xs',
        'h-10 w-10 rounded-xl': size === 'sm',
        'h-16 w-16 rounded-2xl': size === 'lg',
        'h-24 w-24 rounded-full': size === 'xl',
      },
      rounded && '!rounded-full'
    )

    const showingPlaceholder = !!imageUrl?.startsWith('/placeholders/')

    return (
      <div
        className={clsx(
          // Center icon.
          'relative flex shrink-0 items-center justify-center border border-transparent',
          (!imageUrl || loadingImage) && 'border-border-interactive-disabled',
          sizingRoundingClassNames,
          // Pulse person placeholder when loading.
          loadingImage &&
            'animate-pulse border border-border-interactive-disabled',
          // Make clickable for onClick and onEdit.
          (onClick || onEdit) && 'cursor-pointer',
          // Enable group events for onEdit.
          onEdit && 'group',

          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {/* Image */}
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 left-0 bg-cover bg-center',
            onEdit && [
              'transition group-hover:brightness-[0.35]',
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

        {/* Edit icon */}
        {onEdit && (
          <div
            className={clsx(
              'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center transition-opacity group-hover:opacity-100',
              // If showing placeholder, show edit even when not hovering.
              showingPlaceholder ? 'opacity-70' : 'opacity-0',
              sizingRoundingClassNames
            )}
            onClick={onEdit}
          >
            <Edit className="!h-2/5 !w-2/5 text-icon-primary" />
          </div>
        )}
      </div>
    )
  }
)
