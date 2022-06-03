import { ArrowUpIcon, LinkIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { Dollar, Staked, Apr, WalletAvatar } from '@dao-dao/icons'

import { HeroStat, HeroStatLink } from './Stat'

const formatZeroes = (num: number) => new Intl.NumberFormat().format(num)

export interface HeroStatsProps {
  data?: {
    members?: number
    denom?: string
    totalSupply?: number
    stakedPercent?: number
    aprReward?: number
    unstakingDuration?: string
    link?: {
      url: string
      title: string
    }
  }
}

export const HeroStats: FC<HeroStatsProps> = ({ data }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
    {(!data ||
      (data.totalSupply !== undefined && data.denom !== undefined)) && (
      <HeroStat
        Icon={Dollar}
        title="Total supply:"
        value={data ? `${formatZeroes(data.totalSupply!)} ${data.denom!}` : ''}
      />
    )}
    {(!data || data.members !== undefined) && (
      <HeroStat
        Icon={WalletAvatar}
        title="Members:"
        value={data ? data.members!.toLocaleString() : ''}
      />
    )}
    {(!data || data.stakedPercent !== undefined) && (
      <HeroStat
        Icon={Staked}
        title="Staked:"
        value={data ? `${data.stakedPercent!}%` : ''}
      />
    )}
    {(!data || data.unstakingDuration !== undefined) && (
      <HeroStat
        Icon={ArrowUpIcon}
        title="Unstaking period:"
        value={data ? data.unstakingDuration! : ''}
      />
    )}
    {(!data || data.aprReward !== undefined) && (
      <HeroStat
        Icon={Apr}
        title="APR:"
        value={data ? data.aprReward!.toLocaleString() + '%' : ''}
      />
    )}
    {(!data || data.link !== undefined) && (
      <HeroStatLink
        Icon={LinkIcon}
        title={data ? data.link!.title : ''}
        value={data ? data.link!.url : '#'}
      />
    )}
  </div>
)
