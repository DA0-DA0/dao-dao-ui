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
    className={clsx('flex flex-row gap-2 items-center link-text', className)}
  >
    {icon}
    {label}
  </div>
)
