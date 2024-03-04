import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'

export type WarningCardProps = {
  content: ReactNode
  children?: ReactNode
  className?: string
  iconClassName?: string
  textClassName?: string
  size?: 'sm' | 'default'
  contentContainerClassName?: string
  onClick?: () => void
}

export const WarningCard = ({
  content,
  children,
  className,
  iconClassName,
  textClassName,
  size = 'default',
  contentContainerClassName,
  onClick,
}: WarningCardProps) => (
  <div
    className={clsx(
      'flex flex-row items-center rounded-md bg-background-secondary',
      onClick &&
        'cursor-pointer transition-opacity hover:opacity-80 active:opacity-70',
      size === 'default' ? 'gap-4 p-4' : 'gap-3 p-3',
      className
    )}
    onClick={onClick}
  >
    <WarningRounded
      className={clsx(
        'text-icon-interactive-warning',
        size === 'default' ? '!h-10 !w-10' : '!h-8 !w-8',
        iconClassName
      )}
    />

    <div
      className={clsx(
        'flex flex-col items-start gap-2',
        contentContainerClassName
      )}
    >
      {typeof content === 'string' ? (
        <p
          className={clsx(
            'primary-text text-text-interactive-warning-body',
            size === 'sm' && 'text-xs',
            textClassName
          )}
        >
          {content}
        </p>
      ) : (
        content
      )}

      {children}
    </div>
  </div>
)
