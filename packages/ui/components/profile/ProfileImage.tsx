import { Edit, PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'

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
}: ProfileImageProps) => (
  <div
    className={clsx(
      imageUrl
        ? 'bg-center bg-cover'
        : // If no imageUrl, center icon and add border.
          'flex justify-center items-center border border-border-interactive-disabled',
      // Sizes.
      {
        'w-8 h-8 rounded-full': size === 'xs',
        'w-10 h-10 rounded-xl': size === 'sm',
        'w-16 h-16 rounded-2xl': size === 'lg',
      },
      // Pulse person placeholder when loading.
      loading && 'animate-pulse',
      // Make clickable for onEdit.
      onEdit && 'group overflow-hidden relative cursor-pointer',

      className
    )}
    onClick={onClick}
    style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
  >
    {!imageUrl && (
      <PersonOutline
        className={clsx(
          '!w-1/2 !h-1/2 text-icon-interactive-disabled',
          fallbackIconClassName
        )}
      />
    )}
    {onEdit && (
      <div
        className="flex absolute top-0 left-0 justify-center items-center w-full h-full bg-color-black opacity-0 group-hover:opacity-80 transition-opacity"
        onClick={onEdit}
      >
        <Edit className="!w-1/2 !h-1/2 text-icon-primary" />
      </div>
    )}
  </div>
)
