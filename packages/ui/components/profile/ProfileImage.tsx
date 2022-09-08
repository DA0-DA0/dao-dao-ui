import { PersonOutline } from '@mui/icons-material'
import clsx from 'clsx'

export interface ProfileImageProps {
  imageUrl?: string
  size: 'xs' | 'sm' | 'lg'
  className?: string
  onClick?: () => void
}

export const ProfileImage = ({
  imageUrl,
  size,
  className,
  onClick,
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
      className
    )}
    onClick={onClick}
    style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
  >
    {!imageUrl && (
      <PersonOutline className="!w-1/2 !h-1/2 text-icon-interactive-disabled" />
    )}
  </div>
)
