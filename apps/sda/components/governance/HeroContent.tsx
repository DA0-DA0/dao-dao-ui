/* eslint-disable @next/next/no-img-element */

import { useRecoilValue } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  convertMicroDenomToDenomWithDecimals,
  humanReadableDuration,
} from '@dao-dao/utils'
import { convertThresholdDataToTQ } from '@dao-dao/utils/v1'

import { Loader } from '../Loader'
import { Hero } from './Hero'
import {
  useGovernanceTokenInfo,
  useStakingInfo,
  useGovernanceModule,
} from '@/hooks'
import { DAO_ADDRESS } from '@/util'

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
  const { governanceModuleConfig, proposalDepositTokenInfo } =
    useGovernanceModule({ fetchProposalDepositTokenInfo: true })

  const { threshold } = governanceModuleConfig
    ? convertThresholdDataToTQ(governanceModuleConfig.threshold)
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
    return null

  return (
    <>
      <Hero.Header
        description={daoConfig.description}
        image={
          <img
            alt="logo"
            className="w-full h-full"
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
          stakedPercent:
            (totalStaked / Number(governanceTokenInfo.total_supply)) * 100,
          aprReward: apr,
          unstakingDuration: stakingContractConfig.unstaking_duration
            ? humanReadableDuration(stakingContractConfig.unstaking_duration)
            : 'None',
          proposalDeposit:
            governanceModuleConfig.deposit_info?.deposit &&
            proposalDepositTokenInfo
              ? convertMicroDenomToDenomWithDecimals(
                  governanceModuleConfig.deposit_info.deposit,
                  proposalDepositTokenInfo.decimals
                )
              : 0,
          depositRefund:
            governanceModuleConfig.deposit_info?.refund_failed_proposals ??
            false
              ? 'Yes'
              : 'No',
          passingThreshold: threshold.display,
        }}
      />
    </>
  )
}
