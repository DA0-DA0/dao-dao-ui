import { FC } from 'react'

import { BalanceIcon, CopyToClipboard } from '@dao-dao/ui'

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
  <div className="py-4 px-6 mt-2 w-full rounded-lg border border-default">
    {addrTitle ? (
      <CopyToClipboard value={title} />
    ) : (
      <h2 className="font-mono caption-text">{title}</h2>
    )}
    <div className="flex flex-row flex-wrap gap-2 items-center mt-5 mb-[22px] title-text">
      <BalanceIcon />
      {weight}
      <span className="inline secondary-text">
        {((weight / weightTotal) * 100).toLocaleString(undefined, {
          maximumSignificantDigits: 3,
        })}
        %
      </span>
    </div>
  </div>
)
