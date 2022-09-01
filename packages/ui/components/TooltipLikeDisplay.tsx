import clsx from 'clsx'
import { ReactNode } from 'react'

export interface TooltipLikeDisplayProps {
  icon?: ReactNode
  label: string
  caption?: string
  className?: string
}

export const TooltipLikeDisplay = ({
  icon,
  label,
  caption,
  className,
}: TooltipLikeDisplayProps) => (
  <div
    className={clsx(
      'inline-flex flex-row gap-x-3 items-start py-2 px-3 text-text-body bg-component-tooltip rounded-md border border-border-primary caption-text',
      className
    )}
  >
    <div className="flex flex-col justify-center h-4">{icon}</div>
    <div>
      <p>{label}</p>
      {!!caption && <p className="text-text-tertiary">{caption}</p>}
    </div>
  </div>
)
