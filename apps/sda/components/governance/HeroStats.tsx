import { Dollar, Staked, Apr, Submitted } from '@dao-dao/icons'

import { HeroStat } from './HeroStat'

const formatZeroes = (num: number) => new Intl.NumberFormat().format(num)

export interface HeroStatsProps {
  data?: {
    denom: string
    totalSupply: number
    stakedPercent: number
    aprPercent: number
    unstakingDuration: string
    proposalDeposit: number
    depositRefund: string
    passingThreshold: string
  }
}

export const HeroStats = ({ data }: HeroStatsProps) => (
  <div className="flex justify-center p-4 space-x-4">
    <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2">
      <HeroStat Icon={Dollar}>Total supply</HeroStat>
      <span className="font-bold">
        {data && `${formatZeroes(data.totalSupply)} ${data.denom}`}
      </span>
      <HeroStat Icon={Staked}>
        {data && (
          <>
            <b>{data.stakedPercent}%</b> staked
          </>
        )}
      </HeroStat>
      <HeroStat Icon={Apr} size="sm">
        {data && (
          <>
            <b>{data.aprPercent}%</b> APR
          </>
        )}
      </HeroStat>
      <HeroStat Icon={Submitted}>Unstaking Period</HeroStat>
      <span className="font-bold">{data && data.unstakingDuration}</span>
    </div>
    <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2">
      <HeroStat Icon={Dollar}>Proposal Deposit</HeroStat>
      <span className="font-bold">
        {data && `${data.proposalDeposit} ${data.denom}`}
      </span>
      <HeroStat Icon={Dollar}>Deposit Refund</HeroStat>
      <span className="font-bold capitalize">
        {data && String(data.depositRefund)}
      </span>
      <HeroStat Icon={Dollar}>Passing Threshold</HeroStat>
      <span className="font-bold">{data && data.passingThreshold}</span>
    </div>
  </div>
)
