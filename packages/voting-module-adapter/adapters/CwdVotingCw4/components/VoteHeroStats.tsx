/* eslint-disable @next/next/no-img-element */

import { useTranslation } from 'react-i18next'

import { Wallet } from '@dao-dao/icons'
import { HeroStat, HeroStatLink } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseVoteHeroStatsProps } from '../../../types'
import { useVotingModule as useCw4VotingModule } from '../hooks/useVotingModule'

export const VoteHeroStats = ({ loader, ...props }: BaseVoteHeroStatsProps) =>
  loader ? (
    <InnerVoteHeroStats {...props} />
  ) : (
    <InnerVoteHeroStatsContent {...props} />
  )

export interface InnerVoteHeroStatsProps
  extends Pick<BaseVoteHeroStatsProps, 'additionalStats'> {
  data?: {
    members: number
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
        Icon={Wallet}
        title={t('title.members') + ':'}
        value={data?.members.toLocaleString()}
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
  const { coreAddress } = useVotingModuleAdapterOptions()

  const { members } = useCw4VotingModule(coreAddress, {
    fetchMembers: true,
  })
  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <InnerVoteHeroStats
      data={{
        members: members.length,
      }}
      {...props}
    />
  )
}
