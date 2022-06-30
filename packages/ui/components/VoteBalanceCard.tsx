import { FC } from 'react'

import { BalanceIcon, CopyToClipboard } from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

interface VoteBalanceCardProps {
  weight: number
  title: string
  weightTotal: number
  addrTitle?: boolean
}

export const VoteBalanceCard: FC<VoteBalanceCardProps> = ({
  weight,
  title,
  weightTotal,
  addrTitle,
}) => (
  <div className="mt-2 w-full rounded-lg border border-default py-4 px-6">
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
