import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  StakeCw20Hooks,
  blockHeightSelector,
  stakingLoadingAtom,
  useCachedLoadable,
  useWalletProfile,
} from '@dao-dao/state'
import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/tstypes'
import {
  convertExpirationToDate,
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  processError,
} from '@dao-dao/utils'

import { BaseProfileMemberCardMembershipInfoProps } from '../../../types'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'
import { ProfileMemberCardMembershipInfo as StatelessProfileMemberCardMembershipInfo } from '../ui'
import { StakingModal } from './StakingModal'

export const ProfileMemberCardMembershipInfo = ({
  deposit,
}: BaseProfileMemberCardMembershipInfoProps) => {
  const { t } = useTranslation()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletProfile()

  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const { governanceTokenInfo, walletBalance: unstakedBalance } =
    useGovernanceTokenInfo({
      fetchWalletBalance: true,
    })

  const {
    stakingContractAddress,
    unstakingDuration,
    refreshStakingContractBalances,
    refreshTotals,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    walletStakedValue,
    totalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  if (
    claimsPending === undefined ||
    claimsAvailable === undefined ||
    sumClaimsAvailable === undefined ||
    unstakedBalance === undefined ||
    walletStakedValue === undefined ||
    totalStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const doClaim = StakeCw20Hooks.useClaim({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const onClaim = useCallback(async () => {
    if (!connected) {
      return toast.error(t('error.connectWalletToContinue'))
    }
    if (sumClaimsAvailable === 0) {
      return toast.error(t('error.noClaimsAvailable'))
    }

    setClaimingLoading(true)
    try {
      await doClaim()

      // TODO: Figure out better solution for detecting block.
      // New balances will not appear until the next block.
      await new Promise((resolve) => setTimeout(resolve, 6500))

      refreshBalances()
      refreshTotals()
      refreshClaims?.()
      refreshStakingContractBalances()

      toast.success(
        `Claimed ${convertMicroDenomToDenomWithDecimals(
          sumClaimsAvailable,
          governanceTokenInfo.decimals
        ).toLocaleString(undefined, {
          maximumFractionDigits: governanceTokenInfo.decimals,
        })} $${governanceTokenInfo.symbol}`
      )
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setClaimingLoading(false)
    }
  }, [
    connected,
    doClaim,
    governanceTokenInfo.decimals,
    governanceTokenInfo.symbol,
    refreshBalances,
    refreshClaims,
    refreshStakingContractBalances,
    refreshTotals,
    sumClaimsAvailable,
    t,
  ])

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector)

  const unstakingTasks: UnstakingTask[] = [
    ...claimsAvailable.map(({ amount, release_at }) => ({
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: convertMicroDenomToDenomWithDecimals(
        amount,
        governanceTokenInfo.decimals
      ),
      tokenSymbol: governanceTokenInfo.symbol,
      tokenDecimals: governanceTokenInfo.decimals,
      date: convertExpirationToDate(
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
  ]

  return (
    <>
      {showStakingModal && (
        <StakingModal
          maxDeposit={deposit}
          onClose={() => setShowStakingModal(false)}
        />
      )}

      <StatelessProfileMemberCardMembershipInfo
        claimingLoading={claimingLoading}
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        stakedTokens={convertMicroDenomToDenomWithDecimals(
          walletStakedValue,
          governanceTokenInfo.decimals
        )}
        stakingLoading={stakingLoading}
        tokenDecimals={governanceTokenInfo.decimals}
        tokenSymbol={governanceTokenInfo.symbol}
        unstakedTokens={convertMicroDenomToDenomWithDecimals(
          unstakedBalance,
          governanceTokenInfo.decimals
        )}
        unstakingDurationSeconds={
          (unstakingDuration && durationToSeconds(unstakingDuration)) ||
          undefined
        }
        unstakingTasks={unstakingTasks}
        votingPower={(walletStakedValue / totalStakedValue) * 100}
      />
    </>
  )
}
