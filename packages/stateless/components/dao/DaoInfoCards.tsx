import clsx from 'clsx'

import { DaoInfoCardsProps } from '@dao-dao/types'

import { TooltipInfoIcon } from '../tooltip'

export const DaoInfoCards = ({ cards, className }: DaoInfoCardsProps) => (
  <div
    className={clsx(
      'grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4',
      className
    )}
  >
    {cards.map(({ label, tooltip, loading, value }, index) => (
      <div
        key={index}
        className="flex flex-col gap-1 rounded-md bg-background-tertiary px-3 py-2 xs:gap-2 xs:px-4 xs:py-3"
      >
        <div className="flex flex-row items-center gap-1">
          <p className="primary-text text-xs font-normal text-text-secondary xs:text-sm">
            {label}
          </p>
          {tooltip && <TooltipInfoIcon size="xs" title={tooltip} />}
        </div>

        <div
          className={clsx(
            'symbol-small-body-text flex flex-row gap-1 font-mono text-xs xs:text-sm',
            loading && 'animate-pulse'
          )}
        >
          {/* Make sure to render 0. */}
          {value || typeof value === 'number' ? value : loading && '...'}
        </div>
      </div>
    ))}
  </div>
)
