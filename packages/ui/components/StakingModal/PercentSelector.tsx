import clsx from 'clsx'

import { Button } from '../Button'

export interface PercentSelectorProps {
  max: number
  amount: number
  tokenDecimals: number
  setAmount: (newAmount: number) => void
}

export const PercentSelector = (props: PercentSelectorProps) => (
  <div className="grid grid-cols-5 gap-1">
    <PercentButton label="10%" percent={0.1} {...props} />
    <PercentButton label="25%" percent={0.25} {...props} />
    <PercentButton label="50%" percent={0.5} {...props} />
    <PercentButton label="75%" percent={0.75} {...props} />
    <PercentButton label="100%" percent={1} {...props} />
  </div>
)

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
    pressed={
      (max * percent + (absoluteOffset ?? 0)).toFixed(tokenDecimals) ===
      amount.toFixed(tokenDecimals)
    }
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
    variant="secondary"
  >
    {label}
  </Button>
)
