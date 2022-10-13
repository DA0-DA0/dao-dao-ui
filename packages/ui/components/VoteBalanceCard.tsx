import { formatPercentOf100 } from '@dao-dao/utils'

import { BalanceIcon } from './ContractView'
import { CopyToClipboard } from './CopyToClipboard'

export interface VoteBalanceCardProps {
  weight: number
  title: string
  weightTotal: number
  addrTitle?: boolean
}

export const VoteBalanceCard = ({
  weight,
  title,
  weightTotal,
  addrTitle,
}: VoteBalanceCardProps) => (
  <div className="w-full rounded-lg border border-default py-4 px-6">
    {addrTitle ? (
      <CopyToClipboard value={title} />
    ) : (
      <h2 className="caption-text font-mono">{title}</h2>
    )}
    <div className="title-text mt-5 mb-[22px] flex flex-row flex-wrap items-center gap-2">
      <BalanceIcon />
      {weight}
      <span className="secondary-text inline">
        {formatPercentOf100(
          weightTotal === 0 ? 0 : (weight / weightTotal) * 100
        )}
      </span>
    </div>
  </div>
)
