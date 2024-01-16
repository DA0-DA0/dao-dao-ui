import { useState } from 'react'
import { useRecoilValue } from 'recoil'

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

  const { votingRegistryAddress, neutronToken, loadingVaults } =
    useVotingModule()
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
  const loadingWalletVotingBondedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !address
      ? undefined
      : NeutronVaultSelectors.votingPowerAtHeightSelector({
          contractAddress: loadingVaults.data.neutronVault.address,
          chainId,
          params: [
            {
              address,
            },
          ],
        })
  )
  const loadingNeutronBalance = useCachedLoadingWithError(
    !address
      ? undefined
      : genericTokenBalanceSelector({
          chainId: neutronToken.chainId,
          type: neutronToken.type,
          denomOrAddress: neutronToken.denomOrAddress,
          address: address,
        })
  )

  return (
    <>
      {showStakingModal && (
        <StakingModal
          maxDeposit={maxGovernanceTokenDeposit}
          onClose={() => setShowStakingModal(false)}
        />
      )}

      <ProfileCardMemberInfoTokens
        claimingLoading={false}
        daoName={daoName}
        hideUnstaking
        loadingStakedTokens={
          loadingWalletVotingBondedTokens.loading ||
          loadingWalletVotingBondedTokens.errored
            ? { loading: true }
            : {
                loading: false,
                data: convertMicroDenomToDenomWithDecimals(
                  loadingWalletVotingBondedTokens.data.power,
                  neutronToken.decimals
                ),
              }
        }
        loadingUnstakedTokens={
          loadingNeutronBalance.loading || loadingNeutronBalance.errored
            ? { loading: true }
            : {
                loading: false,
                data: convertMicroDenomToDenomWithDecimals(
                  loadingNeutronBalance.data.balance,
                  neutronToken.decimals
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
        tokenDecimals={neutronToken.decimals}
        tokenSymbol={neutronToken.symbol}
        unstakingDurationSeconds={undefined}
        unstakingTasks={[]}
        {...props}
      />
    </>
  )
}
