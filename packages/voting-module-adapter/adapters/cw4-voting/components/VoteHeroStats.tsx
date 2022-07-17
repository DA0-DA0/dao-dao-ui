/* eslint-disable @next/next/no-img-element */

import { useTranslation } from 'react-i18next'

import { Wallet } from '@dao-dao/icons'
import { useCw4VotingModule } from '@dao-dao/state'
import { HeroStat } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseVoteHeroStatsProps } from '../../../types'

export const VoteHeroStats = ({ loader }: BaseVoteHeroStatsProps) =>
  loader ? <InnerVoteHeroStats /> : <InnerVoteHeroStatsContent />

export interface InnerVoteHeroStatsProps {
  data?: {
    members: number
  }
}

export const InnerVoteHeroStats = ({ data }: InnerVoteHeroStatsProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center py-8 px-6 w-full">
      <HeroStat
        Icon={Wallet}
        title={t('title.members') + ':'}
        value={data?.members.toLocaleString()}
      />
    </div>
  )
}

const InnerVoteHeroStatsContent = () => {
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
        members: members?.length,
      }}
    />
  )
}
