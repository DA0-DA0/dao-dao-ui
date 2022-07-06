import { ArrowUpIcon, LinkIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Apr, Dollar, Staked, Wallet } from '@dao-dao/icons'
import { VotingModuleType, formatPercentOf100 } from '@dao-dao/utils'

import { HeroStat, HeroStatLink } from './Stat'

const formatZeroes = (num: number) => new Intl.NumberFormat().format(num)

export interface HeroStatsProps {
  votingModuleType: VotingModuleType
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

export const HeroStats: FC<HeroStatsProps> = ({ data, votingModuleType }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
      {(!data ||
        (data.totalSupply !== undefined && data.denom !== undefined)) &&
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting && (
          <HeroStat
            Icon={Dollar}
            title={t('title.totalSupply') + ':'}
            value={
              data ? `${formatZeroes(data.totalSupply!)} ${data.denom!}` : ''
            }
          />
        )}
      {(!data || data.members !== undefined) &&
        votingModuleType === VotingModuleType.Cw4Voting && (
          <HeroStat
            Icon={Wallet}
            title={t('title.members') + ':'}
            value={data ? data.members!.toLocaleString() : ''}
          />
        )}
      {(!data || data.stakedPercent !== undefined) &&
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting && (
          <HeroStat
            Icon={Staked}
            title={t('title.staked') + ':'}
            value={data ? formatPercentOf100(data.stakedPercent!) : ''}
          />
        )}
      {(!data || data.unstakingDuration !== undefined) &&
        votingModuleType === VotingModuleType.Cw20StakedBalanceVoting && (
          <HeroStat
            Icon={ArrowUpIcon}
            title={t('title.unstakingPeriod') + '+'}
            value={data ? data.unstakingDuration! : ''}
          />
        )}
      {(!data || data.aprReward !== undefined) && (
        <HeroStat
          Icon={Apr}
          title={t('title.apr') + ':'}
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
}
