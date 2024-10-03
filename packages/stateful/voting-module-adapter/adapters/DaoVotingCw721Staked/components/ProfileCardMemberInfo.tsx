import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
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
  durationToSeconds,
  processError,
} from '@dao-dao/utils'

import {
  DaoVotingCw721StakedHooks,
  useAwaitNextBlock,
  useWallet,
} from '../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../components'
import { useGovernanceCollectionInfo, useStakingInfo } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { name: daoName } = useDaoInfoContext()
  const {
    address: walletAddress,
    isWalletConnected,
    refreshBalances,
  } = useWallet()
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const {
    collectionInfo,
    token,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceCollectionInfo({
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

  const doClaim = DaoVotingCw721StakedHooks.useClaimNfts({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const awaitNextBlock = useAwaitNextBlock()
  const onClaim = useCallback(async () => {
    if (!isWalletConnected) {
      return toast.error(t('error.logInToContinue'))
    }
    if (!sumClaimsAvailable?.isPositive()) {
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
        t('success.claimedTokens', {
          amount: sumClaimsAvailable.toInternationalizedHumanReadableString(),
          tokenSymbol: collectionInfo.symbol,
        })
      )
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setClaimingLoading(false)
    }
  }, [
    awaitNextBlock,
    isWalletConnected,
    doClaim,
    collectionInfo.symbol,
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
  const blocksPerYear = useRecoilValue(
    blocksPerYearSelector({
      chainId,
    })
  )

  const unstakingTasks: UnstakingTask[] = [
    ...(claimsPending ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.Unstaking,
      amount: HugeDecimal.one,
      date: convertExpirationToDate(
        blocksPerYear,
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
    ...(claimsAvailable ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: HugeDecimal.one,
      date: convertExpirationToDate(
        blocksPerYear,
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
  ]

  return (
    <>
      <ProfileCardMemberInfoTokens
        claimingLoading={claimingLoading}
        daoName={daoName}
        loadingTokens={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingUnstakedBalance ||
          loadingUnstakedBalance.loading
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: [
                  {
                    token,
                    staked: loadingWalletStakedValue.data,
                    unstaked: loadingUnstakedBalance.data,
                  },
                ],
              }
        }
        loadingVotingPower={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingTotalStakedValue ||
          loadingTotalStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data: loadingWalletStakedValue.data
                  .div(loadingTotalStakedValue.data)
                  .times(100)
                  .toNumber(),
              }
        }
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => refreshClaims?.()}
        stakingLoading={stakingLoading}
        unstakingDurationSeconds={
          (unstakingDuration &&
            durationToSeconds(blocksPerYear, unstakingDuration)) ||
          undefined
        }
        unstakingTasks={unstakingTasks}
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
