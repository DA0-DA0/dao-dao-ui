/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import {
  CwCoreSelectors,
  useGovernanceTokenInfo,
  useProposalModule,
  useStakingInfo,
} from '@dao-dao/state'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
  useProcessThresholdData,
} from '@dao-dao/utils'

import { useApr } from '@/hooks'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL, VOTE_EXTERNAL_URL } from '@/util'

import { Loader } from '../Loader'
import { VoteHero } from './Hero'

export const VoteHeroContentLoader = () => (
  <>
    <VoteHero.Header image={<Loader size="100%" />} />
    <VoteHero.Stats />
  </>
)

export const VoteHeroContent = () => {
  const config = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)
  const apr = useApr()
  const { stakingContractConfig, totalStakedValue } = useStakingInfo(
    DAO_ADDRESS,
    {
      fetchTotalStakedValue: true,
    }
  )
  const { proposalModuleConfig } = useProposalModule(DAO_ADDRESS, {
    fetchProposalDepositTokenInfo: true,
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
