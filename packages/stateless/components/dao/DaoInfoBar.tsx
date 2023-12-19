import clsx from 'clsx'

import { DaoInfoBarProps } from '@dao-dao/types/components/DaoInfoBar'

import { TooltipInfoIcon } from '../tooltip'

export * from '@dao-dao/types/components/DaoInfoBar'

export const DaoInfoBar = ({ items, className }: DaoInfoBarProps) => (
  <div
    className={clsx(
      'flex flex-row flex-wrap items-center gap-12 px-8 pt-5 pb-9',
      className
    )}
  >
    {items.map(({ Icon, label, tooltip, loading, value }, index) => (
      <div
        key={index}
        className="flex grow basis-0 flex-col items-center gap-1 text-center"
      >
        <Icon className="mb-2 h-5 w-5 text-icon-secondary" />

        <div className="flex flex-row items-center gap-1">
          <p className="secondary-text">{label}</p>
          {tooltip && <TooltipInfoIcon size="xs" title={tooltip} />}
        </div>

        <div
          className={clsx(
            'symbol-small-body-text flex flex-row gap-1 font-mono',
            loading && 'animate-pulse'
          )}
        >
          {value || (loading && '...')}
        </div>
      </div>
    ))}
  </div>
)
