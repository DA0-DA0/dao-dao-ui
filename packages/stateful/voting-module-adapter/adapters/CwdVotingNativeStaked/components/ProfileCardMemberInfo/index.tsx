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
import {
  NATIVE_DENOM,
  convertExpirationToDate,
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  nativeTokenLabel,
  processError,
} from '@dao-dao/utils'

import {
  CwdVotingNativeStakedHooks,
  useAwaitNextBlock,
  useWalletProfile,
} from '../../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../../components'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo, useStakingInfo } from '../../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  deposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { name: daoName } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()
  const { refreshBalances } = useWalletProfile()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceTokenInfo({
    fetchLoadingWalletBalance: true,
  })

  const {
    unstakingDuration,
    refreshTotals,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    totalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchLoadingWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  if (
    claimsPending === undefined ||
    claimsAvailable === undefined ||
    sumClaimsAvailable === undefined ||
    loadingUnstakedBalance === undefined ||
    loadingWalletStakedValue === undefined ||
    totalStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  // Search for native governance token in junoswap pools list.
  const poolsList = useRecoilValue(junoswapPoolsListSelector)
  const governanceTokenPoolSymbol = poolsList?.pools
    .flatMap(({ pool_assets }) => pool_assets)
    .find(
      ({ native, symbol, denom }) =>
        native &&
        denom.startsWith('ibc/') &&
        // governanceTokenAddress is denom of native token, so its label should
        // be its symbol.
        symbol === nativeTokenLabel(governanceTokenAddress)
    )?.symbol

  const doClaim = CwdVotingNativeStakedHooks.useClaim({
    contractAddress: votingModuleAddress,
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

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))

  const unstakingTasks: UnstakingTask[] = [
    ...claimsPending.map(({ amount, release_at }) => ({
      status: UnstakingTaskStatus.Unstaking,
      amount: convertMicroDenomToDenomWithDecimals(
        amount,
        governanceTokenInfo.decimals
      ),
      tokenSymbol: governanceTokenInfo.symbol,
      tokenDecimals: governanceTokenInfo.decimals,
      date: convertExpirationToDate(
        blocksPerYear,
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
    ...claimsAvailable.map(({ amount, release_at }) => ({
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: convertMicroDenomToDenomWithDecimals(
        amount,
        governanceTokenInfo.decimals
      ),
      tokenSymbol: governanceTokenInfo.symbol,
      tokenDecimals: governanceTokenInfo.decimals,
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
          loadingWalletStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data: (loadingWalletStakedValue.data / totalStakedValue) * 100,
              }
        }
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => refreshClaims?.()}
        stakingLoading={stakingLoading}
        tokenDecimals={governanceTokenInfo.decimals}
        tokenSymbol={governanceTokenInfo.symbol}
        unstakingDurationSeconds={
          (unstakingDuration &&
            durationToSeconds(blocksPerYear, unstakingDuration)) ||
          undefined
        }
        unstakingTasks={unstakingTasks}
        {...props}
      />
    </>
  )
}
