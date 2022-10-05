import { Edit, PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export interface ProfileImageProps {
  imageUrl?: string
  loading?: boolean
  size: 'xs' | 'sm' | 'lg'
  className?: string
  fallbackIconClassName?: string
  onClick?: () => void
  onEdit?: () => void
}

export const ProfileImage = ({
  imageUrl,
  loading,
  size,
  className,
  fallbackIconClassName,
  onClick,
  onEdit,
}: ProfileImageProps) => {
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

  return (
    <div
      className={clsx(
        // Center icon.
        'flex overflow-hidden relative justify-center items-center',
        (!imageUrl || loadingImage) &&
          'border border-border-interactive-disabled',
        // Sizes.
        {
          'w-8 h-8 rounded-full': size === 'xs',
          'w-10 h-10 rounded-xl': size === 'sm',
          'w-16 h-16 rounded-2xl': size === 'lg',
        },
        // Pulse person placeholder when loading.
        loadingImage &&
          'border border-border-interactive-disabled animate-pulse',
        // Make clickable for onEdit.
        onEdit && 'group cursor-pointer',

        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div
        className={clsx(
          'absolute top-0 right-0 bottom-0 left-0 bg-center bg-cover',
          onEdit && 'brightness-100 group-hover:brightness-[0.35] transition'
        )}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
      ></div>

      {/* No image (hides underneath image always) */}
      <PersonOutline
        className={clsx(
          '!w-1/2 !h-1/2 text-icon-interactive-disabled',
          fallbackIconClassName
        )}
      />

      {/* Edit icon */}
      {onEdit && (
        <div
          className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onEdit}
        >
          <Edit className="!w-1/2 !h-1/2 text-icon-primary" />
        </div>
      )}
    </div>
  )
}
