import { useState } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  NeutronVaultSelectors,
  NeutronVotingRegistrySelectors,
  genericTokenBalanceSelector,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  useCachedLoadingWithError,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { BaseProfileCardMemberInfoProps } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useWallet } from '../../../../hooks'
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
  const loadingWalletVotingPower = useCachedLoadingWithError(
    !address
      ? undefined
      : NeutronVotingRegistrySelectors.votingPowerAtHeightSelector({
          contractAddress: votingRegistryAddress,
          chainId,
          params: [
            {
              address,
            },
          ],
        })
  )
  const loadingTotalVotingPower = useCachedLoadingWithError(
    NeutronVotingRegistrySelectors.totalPowerAtHeightSelector({
      contractAddress: votingRegistryAddress,
      chainId,
      params: [{}],
    })
  )
  const loadingStakedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !address
      ? undefined
      : waitForAll(
          loadingVaults.data.realVaults.map(({ vault }) =>
            NeutronVaultSelectors.bondingStatusSelector({
              contractAddress: vault.address,
              chainId,
              params: [
                {
                  address,
                },
              ],
            })
          )
        )
  )
  const loadingUnstakedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !address
      ? undefined
      : waitForAll(
          loadingVaults.data.realVaults.map(({ bondToken }) =>
            genericTokenBalanceSelector({
              chainId: bondToken.chainId,
              type: bondToken.type,
              denomOrAddress: bondToken.denomOrAddress,
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
                data: loadingVaults.data.realVaults.map(
                  ({ bondToken }, index) => ({
                    token: bondToken,
                    staked: convertMicroDenomToDenomWithDecimals(
                      loadingStakedTokens.data[index].unbondable_abount,
                      bondToken.decimals
                    ),
                    unstaked: convertMicroDenomToDenomWithDecimals(
                      loadingUnstakedTokens.data[index].balance,
                      bondToken.decimals
                    ),
                  })
                ),
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
