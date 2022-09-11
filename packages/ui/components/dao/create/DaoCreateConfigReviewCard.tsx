import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { TooltipInfoIcon } from '../../TooltipInfoIcon'

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
  <div className="flex flex-row gap-6 justify-between items-center py-8 px-6 bg-background-tertiary rounded-lg">
    <div className="flex flex-row gap-3 items-center">
      <p className="text-xl">
        <Icon />
      </p>
      <p className="text-text-body primary-text">{name}</p>
      {tooltip && <TooltipInfoIcon title={tooltip} />}
    </div>

    <p
      className={clsx(
        'py-1 px-2 font-mono text-center text-text-primary bg-component-badge-primary rounded-full link-text',
        reviewClassName
      )}
    >
      {review}
    </p>
  </div>
)
