import { ArrowUpIcon, LinkIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { Dollar, Staked, Apr } from '@dao-dao/icons'

import { HeroStat, HeroStatLink } from './Stat'

const formatZeroes = (num: number) => new Intl.NumberFormat().format(num)

export interface HeroStatsProps {
  data?: {
    denom: string
    totalSupply: number
    stakedPercent: number
    aprReward: number
    unstakingDuration: string
    link: string
  }
}

export const HeroStats: FC<HeroStatsProps> = ({ data }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
    <HeroStat
      Icon={Dollar}
      title="Total supply:"
      value={data ? `${formatZeroes(data.totalSupply)} ${data.denom}` : ''}
    />
    <HeroStat
      Icon={Staked}
      title="Staked:"
      value={data ? `${data.stakedPercent}%` : ''}
    />
    <HeroStat
      Icon={ArrowUpIcon}
      title="Unstaking period:"
      value={data ? data.unstakingDuration : ''}
    />
    <HeroStat
      Icon={Apr}
      title="APR:"
      value={data ? data.aprReward.toLocaleString() + '%' : ''}
    />
    <HeroStatLink
      Icon={LinkIcon}
      title="junoswap.com"
      value={data?.link || ''}
    />
  </div>
)
