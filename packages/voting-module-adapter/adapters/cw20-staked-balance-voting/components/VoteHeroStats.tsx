/* eslint-disable @next/next/no-img-element */

import { ArrowUpIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Dollar, Staked } from '@dao-dao/icons'
import { useGovernanceTokenInfo, useStakingInfo } from '@dao-dao/state'
import { HeroStat } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
  humanReadableDuration,
} from '@dao-dao/utils'

import { BaseVoteHeroStatsProps } from '../../../types'

export const VoteHeroStats = ({
  loader,
  coreAddress,
}: BaseVoteHeroStatsProps) =>
  loader ? (
    <InnerVoteHeroStats />
  ) : (
    <InnerVoteHeroStatsContent coreAddress={coreAddress} />
  )

export interface InnerVoteHeroStatsProps {
  data?: {
    denom: string
    totalSupply: number
    stakedPercent: number
    unstakingDuration: string
  }
}

export const InnerVoteHeroStats = ({ data }: InnerVoteHeroStatsProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
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
    </div>
  )
}

type InnerVoteHeroStatsContentProps = Pick<
  BaseVoteHeroStatsProps,
  'coreAddress'
>

const InnerVoteHeroStatsContent = ({
  coreAddress,
}: InnerVoteHeroStatsContentProps) => {
  const { t } = useTranslation()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { stakingContractConfig, totalStakedValue } = useStakingInfo(
    coreAddress,
    {
      fetchTotalStakedValue: true,
    }
  )

  if (
    !governanceTokenInfo ||
    !stakingContractConfig ||
    totalStakedValue === undefined
  ) {
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
        unstakingDuration: stakingContractConfig.unstaking_duration
          ? humanReadableDuration(stakingContractConfig.unstaking_duration)
          : 'None',
      }}
    />
  )
}
