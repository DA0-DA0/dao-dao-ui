import { ArrowUpIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Dollar, Staked, Wallet } from '@dao-dao/icons'
import { VotingModuleType, formatPercentOf100 } from '@dao-dao/utils'

import { HeroStat } from './Stat'

export interface HeroStatsProps {
  votingModuleType: VotingModuleType
  data?: {
    members?: number
    denom?: string
    totalSupply?: number
    stakedPercent?: number
    unstakingDuration?: string
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
              data
                ? `${data.totalSupply!.toLocaleString()} $${data.denom!}`
                : ''
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
            title={t('title.unstakingPeriod') + ':'}
            value={data ? data.unstakingDuration! : ''}
          />
        )}
    </div>
  )
}
