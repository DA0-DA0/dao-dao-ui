import { FC } from 'react'

export interface PercentSelectorProps {
  max: number
  amount: number
  tokenDecimals: number
  setAmount: (newAmount: number) => void
}

export const PercentSelector: FC<PercentSelectorProps> = ({
  max,
  amount,
  setAmount,
  tokenDecimals,
}) => {
  const active = (p: number) => max * p === amount
  const getClassName = (p: number) =>
    'rounded-md transition hover:bg-secondary link-text font-normal px-2 py-1' +
    (active(p) ? ' bg-secondary border border-inactive' : '')
  const getOnClick = (p: number) => () => {
    setAmount(Number((p * max).toFixed(tokenDecimals)))
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      <button className={getClassName(0.1)} onClick={getOnClick(0.1)}>
        10%
      </button>
      <button className={getClassName(0.25)} onClick={getOnClick(0.25)}>
        25%
      </button>
      <button className={getClassName(0.5)} onClick={getOnClick(0.5)}>
        50%
      </button>
      <button className={getClassName(0.75)} onClick={getOnClick(0.75)}>
        75%
      </button>
      <button className={getClassName(1)} onClick={getOnClick(1)}>
        100%
      </button>
    </div>
  )
}
