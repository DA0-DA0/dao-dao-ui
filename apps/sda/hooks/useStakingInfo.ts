import { useCallback } from 'react'

import { useRecoilValue, constSelector, useSetRecoilState } from 'recoil'

import {
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  useWallet,
} from '@dao-dao/state'
import { Claim, GetConfigResponse } from '@dao-dao/state/clients/stake-cw20'
import { stakingContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import {
  getConfigSelector,
  claimsSelector,
  stakedBalanceAtHeightSelector,
  totalStakedAtHeightSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { claimAvailable } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '.'

interface UseStakingOptions {
  fetchClaims?: boolean
  fetchTotalStaked?: boolean
  fetchWalletBalance?: boolean
}

interface UseStakingResponse {
  stakingContractAddress?: string
  stakingContractConfig?: GetConfigResponse
  refreshStakingContractBalances: () => void
  refreshTotals: () => void
  /// Optional
  // Claims
  blockHeight?: number
  claims?: Claim[]
  refreshClaims?: () => void
  sumClaimsAvailable?: number
  // Total staked
  totalStaked?: number
  // Wallet balance
  walletBalance?: number
}

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStaked = false,
  fetchWalletBalance = false,
}: UseStakingOptions = {}): UseStakingResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useGovernanceTokenInfo()

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress
      ? stakingContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const stakingContractConfig = useRecoilValue(
    stakingContractAddress
      ? getConfigSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )

  const setRefreshStakingContractBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(stakingContractAddress ?? '')
  )
  const refreshStakingContractBalances = useCallback(
    () => setRefreshStakingContractBalancesId((id) => id + 1),
    [setRefreshStakingContractBalancesId]
  )

  const setRefreshTotalBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(undefined)
  )
  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(
    () => setRefreshTotalBalancesId((id) => id + 1),
    [setRefreshTotalBalancesId]
  )

  /// Optional

  // Claims
  const blockHeight = useRecoilValue(
    fetchClaims ? blockHeightSelector : constSelector(undefined)
  )
  const _claimsSelector =
    fetchClaims && walletAddress && stakingContractAddress
      ? claimsSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  const claims = useRecoilValue(_claimsSelector)?.claims
  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = () => _setClaimsId((id) => id + 1)
  const sumClaimsAvailable =
    fetchClaims && blockHeight !== undefined
      ? claims
          ?.filter((c) => claimAvailable(c, blockHeight))
          .reduce((p, c) => p + Number(c.amount), 0)
      : undefined

  // Total staked
  const totalStakedAtHeight = useRecoilValue(
    fetchTotalStaked && stakingContractAddress
      ? totalStakedAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && stakingContractAddress && walletAddress
      ? stakedBalanceAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.balance

  return {
    stakingContractAddress,
    stakingContractConfig,
    refreshStakingContractBalances,
    refreshTotals,
    /// Optional
    // Claims
    blockHeight,
    claims,
    refreshClaims: fetchClaims ? refreshClaims : undefined,
    sumClaimsAvailable,
    // Total staked
    totalStaked: totalStakedAtHeight && Number(totalStakedAtHeight.total),
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
  }
}
