import clsx from 'clsx'

import { LoadingData } from '@dao-dao/types'

import { Button } from '../buttons'

export interface PercentButtonProps {
  label: string
  loadingMax: LoadingData<number>
  percent: number
  amount: number
  setAmount: (newAmount: number) => void
  tokenDecimals: number
  className?: string
  absoluteOffset?: number
}

export const PercentButton = ({
  label,
  loadingMax,
  percent,
  amount,
  setAmount,
  tokenDecimals,
  className,
  absoluteOffset,
}: PercentButtonProps) => (
  <Button
    center
    className={clsx('w-full', className)}
    disabled={loadingMax.loading}
    onClick={() =>
      !loadingMax.loading &&
      setAmount(
        Math.min(
          Math.max(
            Number(
              (loadingMax.data * percent + (absoluteOffset ?? 0)).toFixed(
                tokenDecimals
              )
            ),
            1 / Math.pow(10, tokenDecimals)
          ),
          loadingMax.data
        )
      )
    }
    pressed={
      // Only show as pressed if percent and amount are both zero or nonzero. If
      // one is zero and the other is nonzero, the button should not be pressed.
      // This ensures that the button doesn't show as pressed when the max is 0,
      // since all percents of 0 are 0.
      (percent === 0) === (amount === 0) &&
      !loadingMax.loading &&
      (loadingMax.data * percent + (absoluteOffset ?? 0)).toFixed(
        tokenDecimals
      ) === amount.toFixed(tokenDecimals)
    }
    variant="secondary"
  >
    {label}
  </Button>
)
