import clsx from 'clsx'
import { ReactNode } from 'react'

import { TooltipInfoIcon } from './tooltip'

export type InfoLineCardProps = {
  /**
   * Info label.
   */
  label: string
  /**
   * Optional tooltip to display next to the label.
   */
  tooltip?: string
  /**
   * Optional image URL to the left of the label.
   */
  imageUrl?: string
  /**
   * Info value. If this is a string, it will be wrapped in a <p> tag.
   */
  value: ReactNode
  /**
   * Additional classes to apply to the <p> tag wrapping the value if a string.
   */
  valueClassName?: string
  /**
   * Additional classes to apply to the container.
   */
  className?: string
}

export const InfoLineCard = ({
  label,
  tooltip,
  imageUrl,
  value,
  valueClassName,
  className,
}: InfoLineCardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md bg-background-secondary px-4 py-3',
        className
      )}
    >
      <div className="flex flex-row items-center gap-2 max-w-full">
        {imageUrl && (
          <div
            className="h-6 w-6 bg-contain bg-center bg-no-repeat shrink-0"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        )}

        <p className="primary-text break-all">{label}</p>

        {!!tooltip && (
          <TooltipInfoIcon className="-ml-1" size="sm" title={tooltip} />
        )}
      </div>

      {typeof value === 'string' ? (
        <p className={clsx('body-text break-all', valueClassName)}>{value}</p>
      ) : (
        value
      )}
    </div>
  )
}
