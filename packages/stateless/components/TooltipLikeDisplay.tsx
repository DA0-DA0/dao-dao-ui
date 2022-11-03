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
      'caption-text inline-flex flex-row items-start gap-2 rounded-md border border-border-primary bg-component-tooltip py-2 px-3 text-text-body',
      className
    )}
  >
    <div className="flex h-4 flex-col justify-center">{icon}</div>
    <div>
      <p>{label}</p>
      {!!caption && <p className="text-text-tertiary">{caption}</p>}
    </div>
  </div>
)
