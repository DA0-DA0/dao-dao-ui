import clsx from 'clsx'

import { HugeDecimal } from '@dao-dao/math'
import { ButtonProps, LoadingData } from '@dao-dao/types'

import { Button } from '../buttons'

export type PercentButtonProps = {
  loadingMax: LoadingData<HugeDecimal>
  /**
   * Value out of 100 (e.g. 50 = 50%).
   */
  percent: number
  amount: HugeDecimal
  setAmount: (newAmount: HugeDecimal) => void
  /**
   * Override the default label of `{percent}%`.
   */
  label?: string
  className?: string
  absoluteOffset?: HugeDecimal
  size?: ButtonProps['size']
}

export const PercentButton = ({
  loadingMax,
  percent,
  amount,
  setAmount,
  label = `${percent}%`,
  className,
  absoluteOffset,
  size,
}: PercentButtonProps) => {
  const newAmount = loadingMax.loading
    ? HugeDecimal.zero
    : // Cap between 1 and max
      HugeDecimal.min(
        HugeDecimal.max(
          HugeDecimal.one,
          loadingMax.data
            .times(percent)
            .div(100)
            .plus(absoluteOffset || 0)
            .toFixed(0)
        ),
        loadingMax.data
      )

  return (
    <Button
      center
      className={clsx('w-full', className)}
      disabled={loadingMax.loading}
      onClick={() => !loadingMax.loading && setAmount(newAmount)}
      pressed={
        // Only show as pressed if percent and amount are both zero or nonzero.
        // If one is zero and the other is nonzero, the button should not be
        // pressed. This ensures that the button doesn't show as pressed when
        // the max is 0, since all percents of 0 are 0.
        (percent === 0) === amount.isZero() &&
        !loadingMax.loading &&
        newAmount.eq(amount)
      }
      size={size}
      variant="secondary"
    >
      {label}
    </Button>
  )
}
