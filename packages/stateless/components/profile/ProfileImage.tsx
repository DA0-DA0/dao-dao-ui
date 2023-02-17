import { Edit, PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef, useEffect, useState } from 'react'

import { toAccessibleImageUrl } from '@dao-dao/utils'

export interface ProfileImageProps {
  imageUrl?: string
  loading?: boolean
  size: 'xs' | 'sm' | 'lg'
  className?: string
  fallbackIconClassName?: string
  onClick?: () => void
  onEdit?: () => void
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
      image.src = imageUrl

      // Clean up.
      return () => image.removeEventListener('load', onLoad)
    }, [imageUrl])

    const loadingImage = loading || loadedImage !== imageUrl

    // Size and rounding of container and children.
    const sizingRoundingClassNames = clsx({
      'h-8 w-8 rounded-full': size === 'xs',
      'h-10 w-10 rounded-xl': size === 'sm',
      'h-16 w-16 rounded-2xl': size === 'lg',
    })

    return (
      <div
        className={clsx(
          // Center icon.
          'relative flex shrink-0 items-center justify-center',
          (!imageUrl || loadingImage) &&
            'border border-border-interactive-disabled',
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
            onEdit && 'brightness-100 transition group-hover:brightness-[0.35]',
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
              'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100',
              sizingRoundingClassNames
            )}
            onClick={onEdit}
          >
            <Edit className="!h-1/2 !w-1/2 text-icon-primary" />
          </div>
        )}
      </div>
    )
  }
)
