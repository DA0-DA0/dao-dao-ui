import clsx from 'clsx'
import { ReactNode } from 'react'

export interface StatusDisplayProps {
  icon: ReactNode
  label: ReactNode
  className?: string
}

export const StatusDisplay = ({
  icon,
  label,
  className,
}: StatusDisplayProps) => (
  <div
    className={clsx('link-text flex flex-row items-center gap-2', className)}
  >
    {icon}
    {label}
  </div>
)
