import { Close } from '@mui/icons-material'
import clsx from 'clsx'

import { toAccessibleImageUrl } from '@dao-dao/utils'

import { IconButton } from '../icon_buttons/IconButton'

export type ContextPillProps = {
  imageUrl?: string
  name: string
  onClose?: () => void
  size?: 'sm' | 'default'
  className?: string
}

export const ContextPill = ({
  imageUrl,
  name,
  onClose,
  size = 'default',
  className,
}: ContextPillProps) => (
  <div
    className={clsx(
      'flex min-w-0 shrink-0 animate-fade-in flex-row items-center rounded-full bg-background-secondary',
      size === 'default' ? 'gap-1.5 p-1.5' : 'gap-1 p-1',
      className
    )}
  >
    {imageUrl && (
      <div
        className={clsx(
          'shrink-0 overflow-hidden rounded-full bg-cover bg-center',
          size === 'default' ? 'h-6 w-6' : 'h-4 w-4'
        )}
        style={{
          backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
        }}
      ></div>
    )}

    <p className="link-text min-w-0 shrink-0 truncate text-xs text-text-primary md:text-sm">
      {name}
    </p>

    {onClose && (
      <IconButton
        Icon={Close}
        onClick={onClose}
        size={size === 'default' ? 'sm' : 'xs'}
        variant="none"
      />
    )}
  </div>
)
