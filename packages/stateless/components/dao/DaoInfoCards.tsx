import clsx from 'clsx'

import { DaoInfoCardsProps } from '@dao-dao/types'

import { TooltipInfoIcon } from '../tooltip'

export const DaoInfoCards = ({ cards, className }: DaoInfoCardsProps) => (
  <div
    className={clsx(
      'grid grid-cols-1 gap-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      className
    )}
  >
    {cards.map(({ label, tooltip, loading, value }, index) => (
      <div
        key={index}
        className="flex flex-col gap-2 rounded-md bg-background-tertiary px-4 py-3"
      >
        <div className="flex flex-row items-center gap-1">
          <p className="primary-text font-normal text-text-secondary">
            {label}
          </p>
          {tooltip && <TooltipInfoIcon size="xs" title={tooltip} />}
        </div>

        <div
          className={clsx(
            'symbol-small-body-text flex flex-row gap-1 font-mono text-sm',
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
