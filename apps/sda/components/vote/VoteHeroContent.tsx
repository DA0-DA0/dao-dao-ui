/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { Loader } from '../Loader'
import { VoteHero } from './Hero'
import { useApr } from '@/hooks'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL, VOTE_EXTERNAL_URL } from '@/util'

export const VoteHeroContentLoader = () => (
  <>
    <VoteHero.Header image={<Loader size="100%" />} />
    <VoteHero.Stats />
  </>
)

export const VoteHeroContent = () => {
  const config = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)
  const apr = useApr()
  const { stakingContractConfig, totalStaked } = useStakingInfo(DAO_ADDRESS, {
    fetchTotalStaked: true,
  })
  const { proposalModuleConfig } = useProposalModule(DAO_ADDRESS, {
    fetchProposalDepositTokenInfo: true,
  })
  const { cw4VotingMembers } = useVotingModule(DAO_ADDRESS, {
    fetchCw4VotingMembers: true,
  })

  const { threshold } = proposalModuleConfig
    ? processThresholdData(proposalModuleConfig.threshold)
    : { threshold: undefined }

  if (!config || !proposalModuleConfig || !threshold)
    return <VoteHeroContentLoader />

  return (
    <>
      <VoteHero.Header
        description={config.description}
        image={
          <img
            alt="logo"
            className="w-full h-full"
            src={config.image_url ?? DEFAULT_IMAGE_URL}
          />
        }
        title={config.name}
      />
      <VoteHero.Stats
        data={{
          members: cw4VotingMembers?.length,
          denom: governanceTokenInfo?.name,
          totalSupply: governanceTokenInfo
            ? convertMicroDenomToDenomWithDecimals(
                governanceTokenInfo.total_supply,
                governanceTokenInfo.decimals
              )
            : undefined,
          stakedPercent:
            totalStaked !== undefined && governanceTokenInfo
              ? Number(
                  (
                    (totalStaked / Number(governanceTokenInfo.total_supply)) *
                    100
                  ).toLocaleString()
                )
              : undefined,
          aprReward: apr !== undefined ? apr * 100 : undefined,
          unstakingDuration: stakingContractConfig
            ? stakingContractConfig.unstaking_duration
              ? humanReadableDuration(stakingContractConfig.unstaking_duration)
              : 'None'
            : undefined,
          link: VOTE_EXTERNAL_URL
            ? {
                title: 'junoswap.com',
                url: VOTE_EXTERNAL_URL,
              }
            : undefined,
        }}
      />
    </>
  )
}
