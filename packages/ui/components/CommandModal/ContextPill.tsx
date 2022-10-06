import { Close } from '@mui/icons-material'
import clsx from 'clsx'

import { IconButton } from '@dao-dao/ui'

export interface ContextPillProps {
  imageUrl?: string
  name: string
  onClose?: () => void
}

export const ContextPill = ({ imageUrl, name, onClose }: ContextPillProps) => (
  <div
    className={clsx(
      'flex flex-row gap-1.5 items-center p-1 bg-component-badge-primary rounded-full animate-fadein',
      !imageUrl && 'pl-2',
      !onClose && 'pr-2'
    )}
  >
    {imageUrl && (
      <div
        className="overflow-hidden shrink-0 w-6 h-6 bg-center bg-cover rounded-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    )}

    <p className="shrink-0 text-text-primary link-text">{name}</p>

    {onClose && (
      <IconButton Icon={Close} onClick={onClose} size="sm" variant="none" />
    )}
  </div>
)
