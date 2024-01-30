import clsx from 'clsx'

import { DaoInfoBarProps } from '@dao-dao/types'

import { TooltipInfoIcon } from '../tooltip'

export const DaoInfoBar = ({ items, className }: DaoInfoBarProps) => (
  <div
    className={clsx('flex flex-row flex-wrap items-stretch gap-1', className)}
  >
    {items.map(({ label, tooltip, loading, value }, index) => (
      <div
        key={index}
        className="flex shrink-0 grow flex-col justify-between gap-2 rounded-md bg-background-tertiary px-4 py-3"
      >
        <div className="flex flex-row items-center gap-1">
          <p className="primary-text font-normal text-text-secondary">
            {label}
          </p>
          {tooltip && <TooltipInfoIcon size="xs" title={tooltip} />}
        </div>

        <div
          className={clsx(
            'symbol-small-body-text flex flex-row gap-1 self-end pr-1 text-right font-mono text-sm',
            loading && 'animate-pulse'
          )}
        >
          {value || (loading && '...')}
        </div>
      </div>
    ))}
  </div>
)
