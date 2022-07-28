import { ArrowUpIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Dollar } from '@dao-dao/icons'
import { HeroStat, HeroStatLink } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
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
    totalStaked: number
    unstakingDuration: string
  }
}

export const InnerVoteHeroStats = ({
  data,
  additionalStats,
}: InnerVoteHeroStatsProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
      <HeroStat
        Icon={Dollar}
        title={t('title.staked') + ':'}
        value={data && `${data.totalStaked.toLocaleString()} $${data.denom}`}
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

  if (!governanceTokenInfo || totalStakedValue === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <InnerVoteHeroStats
      data={{
        denom: governanceTokenInfo.symbol,
        totalStaked: convertMicroDenomToDenomWithDecimals(
          totalStakedValue,
          governanceTokenInfo.decimals
        ),
        unstakingDuration: unstakingDuration
          ? humanReadableDuration(unstakingDuration)
          : 'None',
      }}
      {...props}
    />
  )
}
