import clsx from 'clsx'

import { ArrowUpward } from '@dao-dao/icons'
import { formatPercentOf100 } from '@dao-dao/utils'

export interface PricePercentChangeProps {
  value: number
  className?: string
}

export const PricePercentChange = ({
  value,
  className,
}: PricePercentChangeProps) => {
  const negative = value < 0

  return (
    <div
      className={clsx(
        'flex flex-row gap-1 items-end caption-text',
        {
          'text-icon-interactive-error': negative,
          'text-icon-interactive-valid': !negative,
        },
        className
      )}
    >
      <ArrowUpward
        className={clsx('w-3 h-4', {
          'rotate-180': negative,
        })}
      />
      <p>{formatPercentOf100(Math.abs(value))}</p>
    </div>
  )
}
