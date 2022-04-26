/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { Loader } from '../Loader'
import { Hero } from './Hero'
import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useGovernanceModule,
} from '@/hooks'
import { DAO_ADDRESS, EXTERNAL_HREF } from '@/util'

export const HeroContentLoader = () => (
  <>
    <Hero.Header image={<Loader size="6rem" />} />
    <Hero.Stats />
  </>
)

export const HeroContent = () => {
  const daoConfig = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenAddress, governanceTokenInfo, apr } =
    useGovernanceTokenInfo({ fetchPriceInfo: true })
  const { stakingContractConfig, totalStaked } = useStakingInfo({
    fetchTotalStaked: true,
  })
  const { governanceModuleConfig } = useGovernanceModule({
    fetchProposalDepositTokenInfo: true,
  })

  const { threshold } = governanceModuleConfig
    ? processThresholdData(governanceModuleConfig.threshold)
    : { threshold: undefined }

  if (
    !daoConfig ||
    !governanceTokenAddress ||
    !governanceTokenInfo ||
    apr === undefined ||
    !stakingContractConfig ||
    totalStaked === undefined ||
    !governanceModuleConfig ||
    !threshold
  )
    return <HeroContentLoader />

  return (
    <>
      <Hero.Header
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
      <Hero.Stats
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
          link: EXTERNAL_HREF,
        }}
      />
    </>
  )
}
