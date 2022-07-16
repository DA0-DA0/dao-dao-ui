/* eslint-disable @next/next/no-img-element */

import { useTranslation } from 'react-i18next'

import { Wallet } from '@dao-dao/icons'
import { useVotingModule } from '@dao-dao/state'
import { HeroStat } from '@dao-dao/ui'

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

type InnerVoteHeroStatsContentProps = Pick<
  BaseVoteHeroStatsProps,
  'coreAddress'
>

const InnerVoteHeroStatsContent = ({
  coreAddress,
}: InnerVoteHeroStatsContentProps) => {
  const { t } = useTranslation()
  const { cw4VotingMembers } = useVotingModule(coreAddress, {
    fetchCw4VotingMembers: true,
  })

  if (!cw4VotingMembers) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <InnerVoteHeroStats
      data={{
        members: cw4VotingMembers?.length,
      }}
    />
  )
}
