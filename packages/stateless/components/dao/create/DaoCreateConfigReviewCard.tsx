import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'

export interface DaoCreateConfigReviewCardProps {
  Icon: ComponentType
  name: string
  tooltip?: string
  reviewClassName?: string
  review: ReactNode
}

export const DaoCreateConfigReviewCard = ({
  Icon,
  name,
  tooltip,
  reviewClassName,
  review,
}: DaoCreateConfigReviewCardProps) => (
  <div className="flex flex-row items-center justify-between gap-6 rounded-lg bg-background-tertiary py-6 px-5">
    <div className="flex flex-row items-center gap-3">
      <p className="text-xl">
        <Icon />
      </p>
      <p className="primary-text text-text-body">{name}</p>
      {tooltip && <TooltipInfoIcon title={tooltip} />}
    </div>

    <div
      className={clsx(
        'link-text min-w-0 truncate break-words rounded-full bg-component-badge-primary py-1 px-2 text-center font-mono text-text-primary',
        reviewClassName
      )}
    >
      {review}
    </div>
  </div>
)
