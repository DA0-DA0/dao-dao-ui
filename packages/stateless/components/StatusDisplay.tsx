import clsx from 'clsx'
import { ComponentType } from 'react'

export type StatusDisplayProps = {
  /**
   * The icon to display.
   */
  Icon?: ComponentType<{ className: string }>
  /**
   * Optional class names for the icon.
   */
  iconClassName?: string
  /**
   * The label to display.
   */
  label?: string
  /**
   * Optional class names for the label.
   */
  labelClassName?: string
  /**
   * Optional class names for the container.
   */
  className?: string
}

export const StatusDisplay = ({
  Icon,
  iconClassName,
  label,
  labelClassName,
  className,
}: StatusDisplayProps) => (
  <div
    className={clsx('link-text flex flex-row items-center gap-1.5', className)}
  >
    {Icon && <Icon className={clsx('!h-5 !w-5 shrink-0', iconClassName)} />}

    {!!label && (
      <p className={clsx('shrink-0 truncate', labelClassName)}>{label}</p>
    )}
  </div>
)
