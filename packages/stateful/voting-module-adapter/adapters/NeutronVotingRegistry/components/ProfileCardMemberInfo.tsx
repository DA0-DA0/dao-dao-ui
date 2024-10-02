import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  genericTokenBalanceSelector,
  neutronVaultQueries,
  neutronVotingRegistryQueries,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  useCachedLoadingWithError,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'
import { makeCombineQueryResultsIntoLoadingDataWithError } from '@dao-dao/utils'

import { useQueryLoadingDataWithError, useWallet } from '../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../components'
import { useVotingModule } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { name: daoName, chainId } = useDaoInfoContext()
  const { address } = useWallet()

  const [showStakingModal, setShowStakingModal] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const { votingRegistryAddress, loadingVaults } = useVotingModule()
  const realVaults =
    loadingVaults.loading || loadingVaults.errored
      ? []
      : loadingVaults.data.flatMap(({ info, ...vault }) =>
          info.real
            ? {
                ...vault,
                ...info,
              }
            : []
        )

  const loadingWalletVotingPower = useQueryLoadingDataWithError(
    !address
      ? undefined
      : neutronVotingRegistryQueries.votingPowerAtHeight({
          chainId,
          contractAddress: votingRegistryAddress,
          args: {
            address,
          },
        })
  )
  const loadingTotalVotingPower = useQueryLoadingDataWithError(
    neutronVotingRegistryQueries.totalPowerAtHeight({
      chainId,
      contractAddress: votingRegistryAddress,
      args: {},
    })
  )
  const loadingStakedTokens = useQueries({
    queries:
      loadingVaults.loading || loadingVaults.errored || !address
        ? []
        : realVaults.map(({ address: contractAddress }) =>
            neutronVaultQueries.bondingStatus({
              chainId,
              contractAddress,
              args: {
                address,
              },
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      // Show loading if empty array is passed.
      loadIfNone: true,
    }),
  })
  const loadingUnstakedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !address
      ? undefined
      : waitForAll(
          realVaults.map(({ bondToken: { chainId, type, denomOrAddress } }) =>
            genericTokenBalanceSelector({
              chainId,
              type,
              denomOrAddress,
              address: address,
            })
          )
        )
  )

  return (
    <>
      <ProfileCardMemberInfoTokens
        claimingLoading={false}
        daoName={daoName}
        hideUnstaking
        loadingTokens={
          loadingVaults.loading ||
          loadingVaults.errored ||
          loadingStakedTokens.loading ||
          loadingStakedTokens.errored ||
          loadingUnstakedTokens.loading ||
          loadingUnstakedTokens.errored
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: realVaults.map(({ bondToken }, index) => ({
                  token: bondToken,
                  staked: HugeDecimal.from(
                    loadingStakedTokens.data[index].unbondable_abount
                  ),
                  unstaked: HugeDecimal.from(
                    loadingUnstakedTokens.data[index].balance
                  ),
                })),
              }
        }
        loadingVotingPower={
          loadingWalletVotingPower.loading ||
          loadingWalletVotingPower.errored ||
          loadingTotalVotingPower.loading ||
          loadingTotalVotingPower.errored
            ? { loading: true }
            : {
                loading: false,
                data:
                  (Number(loadingWalletVotingPower.data.power) /
                    Number(loadingTotalVotingPower.data.power)) *
                  100,
              }
        }
        onClaim={() => {}}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => {}}
        stakingLoading={stakingLoading}
        unstakingDurationSeconds={undefined}
        unstakingTasks={[]}
        {...props}
      />

      <StakingModal
        maxDeposit={maxGovernanceTokenDeposit}
        onClose={() => setShowStakingModal(false)}
        visible={showStakingModal}
      />
    </>
  )
}
