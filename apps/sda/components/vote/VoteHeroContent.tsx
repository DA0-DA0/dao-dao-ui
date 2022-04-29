/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { Loader } from '../Loader'
import { VoteHero } from './Hero'
import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useProposalModule,
} from '@/hooks'
import { DAO_ADDRESS, VOTE_EXTERNAL_URL } from '@/util'

export const VoteHeroContentLoader = () => (
  <>
    <VoteHero.Header image={<Loader size="100%" />} />
    <VoteHero.Stats />
  </>
)

export const VoteHeroContent = () => {
  const daoConfig = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenAddress, governanceTokenInfo, apr } =
    useGovernanceTokenInfo({ fetchPriceInfo: true })
  const { stakingContractConfig, totalStaked } = useStakingInfo({
    fetchTotalStaked: true,
  })
  const { proposalModuleConfig } = useProposalModule({
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
            // TODO: Replace placeholder image.
            src={daoConfig.image_url ?? '/daotoken.jpg'}
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
          aprReward: apr,
          unstakingDuration: stakingContractConfig.unstaking_duration
            ? humanReadableDuration(stakingContractConfig.unstaking_duration)
            : 'None',
          link: VOTE_EXTERNAL_URL,
        }}
      />
    </>
  )
}
