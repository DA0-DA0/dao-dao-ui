import clsx from 'clsx'
import { ReactNode } from 'react'

export interface DarkTooltipDisplayProps {
  icon?: ReactNode
  label: string
  caption?: string
  className?: string
}

export const DarkTooltipDisplay = ({
  icon,
  label,
  caption,
  className,
}: DarkTooltipDisplayProps) => (
  <div
    className={clsx(
      'inline-flex flex-row gap-x-3 items-start py-2 px-3 text-body bg-white rounded-md border border-inactive caption-text',
      className
    )}
  >
    <div className="flex flex-col justify-center h-4">{icon}</div>
    <div>
      <p>{label}</p>
      {!!caption && <p className="text-tertiary">{caption}</p>}
    </div>
  </div>
)
