import clsx from 'clsx'

import { Button } from '../Button'

export interface PercentButtonProps {
  label: string
  max: number
  percent: number
  amount: number
  setAmount: (newAmount: number) => void
  tokenDecimals: number
  className?: string
  absoluteOffset?: number
}

export const PercentButton = ({
  label,
  max,
  percent,
  amount,
  setAmount,
  tokenDecimals,
  className,
  absoluteOffset,
}: PercentButtonProps) => (
  <Button
    className={clsx('flex flex-row justify-center w-full', className)}
    onClick={() =>
      setAmount(
        Math.min(
          Math.max(
            Number(
              (max * percent + (absoluteOffset ?? 0)).toFixed(tokenDecimals)
            ),
            1 / Math.pow(10, tokenDecimals)
          ),
          max
        )
      )
    }
    pressed={
      (max * percent + (absoluteOffset ?? 0)).toFixed(tokenDecimals) ===
      amount.toFixed(tokenDecimals)
    }
    size="lg"
    variant="secondary"
  >
    {label}
  </Button>
)
