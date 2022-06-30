import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { ChangeEvent, FC } from 'react'

export interface AmountSelectorProps {
  setAmount: (newValue: number) => void
  amount: number
  max: number
}

export const AmountSelector: FC<AmountSelectorProps> = ({
  setAmount,
  amount,
  max,
}) => (
  <div className="relative">
    <button
      className={`absolute top-0 left-0 flex h-[56px] w-[51px] items-center justify-center rounded-l bg-primary ${
        amount <= 1 ? 'border border-inactive bg-transparent' : ''
      }`}
      disabled={amount <= 0}
      onClick={() => setAmount(amount - 1)}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <input
      className="h-[56px] w-full rounded bg-btn-secondary pr-16 pl-16"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAmount(e.target.valueAsNumber)
      }
      type="number"
      value={amount}
    />
    <button
      className={`absolute top-0 right-0 flex h-[56px] w-[51px] items-center justify-center rounded-r bg-primary ${
        Number(amount) >= max ? 'border border-inactive bg-transparent' : ''
      }`}
      disabled={amount >= max}
      onClick={() => setAmount(amount + 1)}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
)
