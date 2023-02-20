import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

export interface TooltipLikeDisplayProps {
  icon?: ReactNode
  label?: string
  caption?: string
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

export const TooltipLikeDisplay = ({
  icon,
  label,
  caption,
  className,
  children,
  style,
}: TooltipLikeDisplayProps) => (
  <div
    className={clsx(
      'caption-text inline-flex flex-row items-start gap-2 rounded-md border border-border-component-primary bg-component-tooltip py-2 px-3 text-text-component-primary',
      className
    )}
    style={style}
  >
    {icon && <div className="flex h-4 flex-col justify-center">{icon}</div>}
    {(!!label || !!caption) && (
      <div>
        <p>{label}</p>
        {!!caption && (
          <p className="text-text-component-secondary">{caption}</p>
        )}
      </div>
    )}

    {children}
  </div>
)
