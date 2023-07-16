import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseProfileCardMemberInfoProps,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  processError,
} from '@dao-dao/utils'

import {
  Cw20StakeHooks,
  useAwaitNextBlock,
  useWalletInfo,
} from '../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../components'
import { useGovernanceTokenInfo, useStakingInfo } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { name: daoName } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletInfo()

  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const {
    governanceTokenInfo,
    token,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceTokenInfo({
    fetchWalletBalance: true,
  })

  const {
    stakingContractAddress,
    unstakingDuration,
    refreshTotals,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    loadingTotalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  if (
    loadingUnstakedBalance === undefined ||
    loadingWalletStakedValue === undefined ||
    loadingTotalStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const doClaim = Cw20StakeHooks.useClaim({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const awaitNextBlock = useAwaitNextBlock()
  const onClaim = useCallback(async () => {
    if (!connected) {
      return toast.error(t('error.logInToContinue'))
    }
    if (!sumClaimsAvailable) {
      return toast.error(t('error.noClaimsAvailable'))
    }

    setClaimingLoading(true)
    try {
      await doClaim()

      // New balances will not appear until the next block.
      await awaitNextBlock()

      refreshBalances()
      refreshTotals()
      refreshClaims?.()

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
    awaitNextBlock,
    connected,
    doClaim,
    governanceTokenInfo.decimals,
    governanceTokenInfo.symbol,
    refreshBalances,
    refreshClaims,
    refreshTotals,
    sumClaimsAvailable,
    t,
  ])

  const blockHeightLoadable = useCachedLoadable(
    blockHeightSelector({
      chainId,
    })
  )
  const blocksPerYearLoadable = useCachedLoadable(
    blocksPerYearSelector({
      chainId,
    })
  )

  const unstakingTasks: UnstakingTask[] = [
    ...(claimsPending ?? []).map(({ amount, release_at }) => ({
      token,
      status: UnstakingTaskStatus.Unstaking,
      amount: convertMicroDenomToDenomWithDecimals(
        amount,
        governanceTokenInfo.decimals
      ),
      date:
        blocksPerYearLoadable.state === 'hasValue'
          ? convertExpirationToDate(
              blocksPerYearLoadable.contents,
              release_at,
              blockHeightLoadable.state === 'hasValue'
                ? blockHeightLoadable.contents
                : 0
            )
          : undefined,
    })),
    ...(claimsAvailable ?? []).map(({ amount, release_at }) => ({
      token,
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: convertMicroDenomToDenomWithDecimals(
        amount,
        governanceTokenInfo.decimals
      ),
      date:
        blocksPerYearLoadable.state === 'hasValue'
          ? convertExpirationToDate(
              blocksPerYearLoadable.contents,
              release_at,
              blockHeightLoadable.state === 'hasValue'
                ? blockHeightLoadable.contents
                : 0
            )
          : undefined,
    })),
  ]

  return (
    <>
      {showStakingModal && (
        <StakingModal
          maxDeposit={maxGovernanceTokenDeposit}
          onClose={() => setShowStakingModal(false)}
        />
      )}

      <ProfileCardMemberInfoTokens
        claimingLoading={claimingLoading}
        daoName={daoName}
        loadingStakedTokens={
          loadingWalletStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data: convertMicroDenomToDenomWithDecimals(
                  loadingWalletStakedValue.data,
                  governanceTokenInfo.decimals
                ),
              }
        }
        loadingUnstakedTokens={
          loadingUnstakedBalance.loading
            ? { loading: true }
            : {
                loading: false,
                data: convertMicroDenomToDenomWithDecimals(
                  loadingUnstakedBalance.data,
                  governanceTokenInfo.decimals
                ),
              }
        }
        loadingVotingPower={
          loadingWalletStakedValue.loading || loadingTotalStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data:
                  (loadingWalletStakedValue.data /
                    loadingTotalStakedValue.data) *
                  100,
              }
        }
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => refreshClaims?.()}
        stakingLoading={stakingLoading}
        tokenDecimals={governanceTokenInfo.decimals}
        tokenSymbol={governanceTokenInfo.symbol}
        unstakingDurationSeconds={
          (blocksPerYearLoadable.state === 'hasValue' &&
            unstakingDuration &&
            durationToSeconds(
              blocksPerYearLoadable.contents,
              unstakingDuration
            )) ||
          undefined
        }
        unstakingTasks={unstakingTasks}
        {...props}
      />
    </>
  )
}
