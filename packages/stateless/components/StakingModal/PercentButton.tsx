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
    className={clsx('flex w-full flex-row justify-center', className)}
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
      !loadingMax.loading &&
      (loadingMax.data * percent + (absoluteOffset ?? 0)).toFixed(
        tokenDecimals
      ) === amount.toFixed(tokenDecimals)
    }
    size="lg"
    variant="secondary"
  >
    {label}
  </Button>
)
