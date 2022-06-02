/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useProposalModule,
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

// TODO: Add cw4-voting support.
export const VoteHeroContent = () => {
  const daoConfig = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo(DAO_ADDRESS)
  const apr = useApr()
  const { stakingContractConfig, totalStaked } = useStakingInfo(DAO_ADDRESS, {
    fetchTotalStaked: true,
  })
  const { proposalModuleConfig } = useProposalModule(DAO_ADDRESS, {
    fetchProposalDepositTokenInfo: true,
  })

  const { threshold } = proposalModuleConfig
    ? processThresholdData(proposalModuleConfig.threshold)
    : { threshold: undefined }

  if (
    !daoConfig ||
    !governanceTokenAddress ||
    !governanceTokenInfo ||
    apr === undefined ||
    !stakingContractConfig ||
    totalStaked === undefined ||
    !proposalModuleConfig ||
    !threshold
  )
    return <VoteHeroContentLoader />

  return (
    <>
      <VoteHero.Header
        description={daoConfig.description}
        image={
          <img
            alt="logo"
            className="w-full h-full"
            src={daoConfig.image_url ?? DEFAULT_IMAGE_URL}
          />
        }
        title={daoConfig.name}
      />
      <VoteHero.Stats
        data={{
          denom: governanceTokenInfo.name,
          totalSupply: convertMicroDenomToDenomWithDecimals(
            governanceTokenInfo.total_supply,
            governanceTokenInfo.decimals
          ),
          stakedPercent: Number(
            (
              (totalStaked / Number(governanceTokenInfo.total_supply)) *
              100
            ).toLocaleString()
          ),
          aprReward: apr * 100,
          unstakingDuration: stakingContractConfig.unstaking_duration
            ? humanReadableDuration(stakingContractConfig.unstaking_duration)
            : 'None',
          link: VOTE_EXTERNAL_URL,
        }}
      />
    </>
  )
}
