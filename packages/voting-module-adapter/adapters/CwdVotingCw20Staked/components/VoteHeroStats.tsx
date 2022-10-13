import { ArrowUpIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Dollar, Staked } from '@dao-dao/icons'
import { HeroStat, HeroStatLink } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
  humanReadableDuration,
} from '@dao-dao/utils'

import { BaseVoteHeroStatsProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'

export const VoteHeroStats = ({ loader, ...props }: BaseVoteHeroStatsProps) =>
  loader ? (
    <InnerVoteHeroStats {...props} />
  ) : (
    <InnerVoteHeroStatsContent {...props} />
  )

export interface InnerVoteHeroStatsProps
  extends Pick<BaseVoteHeroStatsProps, 'additionalStats'> {
  data?: {
    denom: string
    totalSupply: number
    stakedPercent: number
    unstakingDuration: string
  }
}

export const InnerVoteHeroStats = ({
  data,
  additionalStats,
}: InnerVoteHeroStatsProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 py-8 px-6">
      <HeroStat
        Icon={Dollar}
        title={t('title.totalSupply') + ':'}
        value={data && `${data.totalSupply.toLocaleString()} $${data.denom}`}
      />
      <HeroStat
        Icon={Staked}
        title={t('title.staked') + ':'}
        value={data && formatPercentOf100(data.stakedPercent)}
      />
      <HeroStat
        Icon={ArrowUpIcon}
        title={t('title.unstakingPeriod') + ':'}
        value={data?.unstakingDuration}
      />
      {additionalStats?.map(({ link, ...props }, index) =>
        link ? (
          <HeroStatLink key={index} {...props} />
        ) : (
          <HeroStat key={index} {...props} />
        )
      )}
    </div>
  )
}

interface InnerVoteHeroStatsContentProps
  extends Pick<BaseVoteHeroStatsProps, 'additionalStats'> {}

const InnerVoteHeroStatsContent = (props: InnerVoteHeroStatsContentProps) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo()
  const { unstakingDuration, totalStakedValue } = useStakingInfo({
    fetchTotalStakedValue: true,
  })

  if (totalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <InnerVoteHeroStats
      data={{
        denom: governanceTokenInfo.symbol,
        totalSupply: convertMicroDenomToDenomWithDecimals(
          governanceTokenInfo.total_supply,
          governanceTokenInfo.decimals
        ),
        stakedPercent:
          (totalStakedValue / Number(governanceTokenInfo.total_supply)) * 100,
        unstakingDuration: unstakingDuration
          ? humanReadableDuration(unstakingDuration)
          : 'None',
      }}
      {...props}
    />
  )
}
