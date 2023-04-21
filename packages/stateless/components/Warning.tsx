import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'

export type WarningProps = {
  content: string
  className?: string
  iconClassName?: string
  textClassName?: string
}

export const Warning = ({
  content,
  className,
  iconClassName,
  textClassName,
}: WarningProps) => (
  <div
    className={clsx(
      'flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4',
      className
    )}
  >
    <WarningRounded
      className={clsx(
        '!h-10 !w-10 text-icon-interactive-warning',
        iconClassName
      )}
    />

    <p
      className={clsx(
        'primary-text text-text-interactive-warning-body',
        textClassName
      )}
    >
      {content}
    </p>
  </div>
)
