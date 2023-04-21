import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'

export type WarningProps = {
  content: string
  className?: string
  iconClassName?: string
  textClassName?: string
  size?: 'sm' | 'default'
}

export const Warning = ({
  content,
  className,
  iconClassName,
  textClassName,
  size = 'default',
}: WarningProps) => (
  <div
    className={clsx(
      'flex flex-row items-center rounded-md bg-background-secondary',
      size === 'default' ? 'gap-4 p-4' : 'gap-3 p-3',
      className
    )}
  >
    <WarningRounded
      className={clsx(
        'text-icon-interactive-warning',
        size === 'default' ? '!h-10 !w-10' : '!h-8 !w-8',
        iconClassName
      )}
    />

    <p
      className={clsx(
        'primary-text text-text-interactive-warning-body',
        size === 'sm' && 'text-xs',
        textClassName
      )}
    >
      {content}
    </p>
  </div>
)
