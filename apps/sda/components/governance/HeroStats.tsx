import { Dollar, Staked, Apr, Submitted } from '@dao-dao/icons'

import { HeroStat } from './HeroStat'

const formatZeroes = (num: number) => new Intl.NumberFormat().format(num)

export interface HeroStatsProps {
  data: {
    denom: string
    totalSupply: number
    stakedPercent: number
    aprPercent: number
    unstakingDays: number
    proposalDeposit: number
    depositRefund: boolean
    passingThreshold: number
  }
}

export function HeroStats({ data }: HeroStatsProps) {
  return (
    <div className="flex justify-center p-4 space-x-4">
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2">
        <HeroStat Icon={Dollar}>Total supply</HeroStat>
        <span className="font-bold">
          {formatZeroes(data.totalSupply)} {data.denom}
        </span>
        <HeroStat Icon={Staked}>
          <b>{data.stakedPercent}%</b> staked
        </HeroStat>
        <HeroStat Icon={Apr} size="sm">
          <b>{data.aprPercent}%</b> APR
        </HeroStat>
        <HeroStat Icon={Submitted}>Unstaking Period</HeroStat>
        <span className="font-bold">{data.unstakingDays} day(s)</span>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2">
        <HeroStat Icon={Dollar}>Proposal Deposit</HeroStat>
        <span className="font-bold">
          {data.proposalDeposit} ${data.denom}
        </span>
        <HeroStat Icon={Dollar}>Deposit Refund</HeroStat>
        <span className="font-bold capitalize">
          {String(data.depositRefund)}
        </span>
        <HeroStat Icon={Dollar}>Passing Threshold</HeroStat>
        <span className="font-bold">
          {data.passingThreshold} ${data.denom}
        </span>
      </div>
    </div>
  )
}
