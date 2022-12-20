import { Close } from '@mui/icons-material'
import clsx from 'clsx'

import { toAccessibleImageUrl } from '@dao-dao/utils'

import { IconButton } from '../icon_buttons/IconButton'

export interface ContextPillProps {
  imageUrl?: string
  name: string
  onClose?: () => void
}

export const ContextPill = ({ imageUrl, name, onClose }: ContextPillProps) => (
  <div
    className={clsx(
      'animate-fadein flex shrink-0 flex-row items-center gap-1.5 rounded-full bg-component-badge-primary p-1',
      !imageUrl && 'pl-2',
      !onClose && 'pr-2'
    )}
  >
    {imageUrl && (
      <div
        className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${toAccessibleImageUrl(imageUrl)})`,
        }}
      ></div>
    )}

    <p className="link-text max-w-[16ch] shrink-0 truncate text-text-primary">
      {name}
    </p>

    {onClose && (
      <IconButton Icon={Close} onClick={onClose} size="sm" variant="none" />
    )}
  </div>
)
