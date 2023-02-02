import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  junoswapPoolsListSelector,
  stakingLoadingAtom,
} from '@dao-dao/state'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  BaseProfileCardMemberInfoProps,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import { Claim } from '@dao-dao/types/contracts/Cw20Stake'
import {
  NATIVE_DENOM,
  convertExpirationToDate,
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  nativeTokenLabel,
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
  deposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { name: daoName, chainId } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletInfo()

  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const {
    governanceTokenAddress,
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

  // Search for governance token in junoswap pools list.
  const poolsList = useRecoilValue(junoswapPoolsListSelector)
  const governanceTokenPoolSymbol = poolsList?.pools
    .flatMap(({ pool_assets }) => pool_assets)
    .find(
      ({ token_address }) => governanceTokenAddress === token_address
    )?.symbol

  const doClaim = Cw20StakeHooks.useClaim({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const awaitNextBlock = useAwaitNextBlock()
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

      // New balances will not appear until the next block.
      await awaitNextBlock()

      refreshBalances()
      refreshTotals()
      refreshClaims?.()

      toast.success(
        `Claimed ${convertMicroDenomToDenomWithDecimals(
          sumClaimsAvailable ?? 0,
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
    ...((claimsPending as Claim[]) ?? []).map(({ amount, release_at }) => ({
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
    ...((claimsAvailable as Claim[]) ?? []).map(({ amount, release_at }) => ({
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
          maxDeposit={deposit}
          onClose={() => setShowStakingModal(false)}
        />
      )}

      <ProfileCardMemberInfoTokens
        claimingLoading={claimingLoading}
        daoName={daoName}
        junoswapHref={
          governanceTokenPoolSymbol
            ? `https://junoswap.com/?from=${nativeTokenLabel(
                NATIVE_DENOM
              )}&to=${governanceTokenPoolSymbol}`
            : undefined
        }
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
