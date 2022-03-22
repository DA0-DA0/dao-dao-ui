import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

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
      className={`absolute top-0 left-0 h-[56px] w-[51px] flex justify-center items-center bg-primary rounded-l ${
        amount <= 1 ? 'bg-transparent border border-inactive' : ''
      }`}
      disabled={amount <= 1}
      onClick={() => setAmount(amount - 1)}
    >
      <ChevronLeftIcon className="w-4 h-4" />
    </button>
    <input
      className="pr-16 pl-16 w-[392px] h-[56px] bg-btn-secondary rounded"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAmount(e.target.valueAsNumber)
      }
      type="number"
      value={amount}
    />
    <button
      className={`absolute top-0 right-0 h-[56px] w-[51px] flex justify-center items-center bg-primary rounded-r ${
        Number(amount) + 1 >= max ? 'bg-transparent border border-inactive' : ''
      }`}
      disabled={amount + 1 >= max}
      onClick={() => setAmount(amount + 1)}
    >
      <ChevronRightIcon className="w-4 h-4" />
    </button>
  </div>
)
