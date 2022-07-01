/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import {
  CwCoreSelectors,
  useGovernanceTokenInfo,
  useProposalModule,
  useStakingInfo,
  useVotingModule,
} from '@dao-dao/state'
import {
  VotingModuleType,
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
  useProcessThresholdData,
} from '@dao-dao/utils'

import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

import { useDAOInfoContext } from '../DAOInfoContext'
import { Loader } from '../Loader'
import { VoteHero } from './Hero'

export const VoteHeroContentLoader = () => (
  <>
    <VoteHero.Header image={<Loader size="100%" />} />
    <VoteHero.Stats votingModuleType={useDAOInfoContext().votingModuleType} />
  </>
)

export const VoteHeroContent = () => {
  const { votingModuleType } = useDAOInfoContext()
  const config = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)
  const { stakingContractConfig, totalStakedValue } = useStakingInfo(
    DAO_ADDRESS,
    {
      fetchTotalStakedValue: true,
    }
  )
  const { proposalModuleConfig } = useProposalModule(DAO_ADDRESS, {
    fetchProposalDepositTokenInfo: true,
  })
  const { cw4VotingMembers } = useVotingModule(DAO_ADDRESS, {
    fetchCw4VotingMembers: votingModuleType === VotingModuleType.Cw4Voting,
  })

  const processThresholdData = useProcessThresholdData()
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
            totalStakedValue !== undefined && governanceTokenInfo
              ? (totalStakedValue / Number(governanceTokenInfo.total_supply)) *
                100
              : undefined,
          unstakingDuration: stakingContractConfig
            ? stakingContractConfig.unstaking_duration
              ? humanReadableDuration(stakingContractConfig.unstaking_duration)
              : 'None'
            : undefined,
        }}
        votingModuleType={votingModuleType}
      />
    </>
  )
}
