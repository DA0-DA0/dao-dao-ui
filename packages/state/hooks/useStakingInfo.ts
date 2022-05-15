import { useCallback } from 'react'
import { useRecoilValue, constSelector, useSetRecoilState } from 'recoil'

import {
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  useWallet,
} from '@dao-dao/state'
import { Claim, GetConfigResponse } from '@dao-dao/state/clients/stake-cw20'
import {
  getConfigSelector,
  claimsSelector,
  stakedValueSelector,
  totalValueSelector,
} from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { claimAvailable } from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '.'

interface UseStakingOptions {
  fetchClaims?: boolean
  fetchTotalStaked?: boolean
  fetchWalletStaked?: boolean
}

interface UseStakingResponse {
  stakingContractAddress?: string
  stakingContractConfig?: GetConfigResponse
  refreshStakingContractBalances: () => void
  refreshTotals: () => void
  /// Optional
  // Claims
  blockHeight?: number
  refreshClaims?: () => void
  claims?: Claim[]
  claimsPending?: Claim[]
  claimsAvailable?: Claim[]
  sumClaimsAvailable?: number
  // Total staked
  totalStaked?: number
  // Wallet staked
  walletStaked?: number
}

export const useStakingInfo = (
  coreAddress: string,
  {
    fetchClaims = false,
    fetchTotalStaked = false,
    fetchWalletStaked = false,
  }: UseStakingOptions = {}
): UseStakingResponse => {
  const { address: walletAddress } = useWallet()
  const { stakingContractAddress } = useGovernanceTokenInfo(coreAddress)

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

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = () => _setClaimsId((id) => id + 1)

  const claims = useRecoilValue(
    fetchClaims && walletAddress && stakingContractAddress
      ? claimsSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.claims

  const claimsPending = blockHeight
    ? claims?.filter((c) => !claimAvailable(c, blockHeight))
    : undefined
  const claimsAvailable = blockHeight
    ? claims?.filter((c) => claimAvailable(c, blockHeight))
    : undefined
  const sumClaimsAvailable = claimsAvailable?.reduce(
    (p, c) => p + Number(c.amount),
    0
  )

  // Total staked
  const totalStaked = useRecoilValue(
    fetchTotalStaked && stakingContractAddress
      ? totalValueSelector({ contractAddress: stakingContractAddress })
      : constSelector(undefined)
  )?.total

  // Wallet staked
  const walletStaked = useRecoilValue(
    fetchWalletStaked && stakingContractAddress && walletAddress
      ? stakedValueSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.value

  return {
    stakingContractAddress,
    stakingContractConfig,
    refreshStakingContractBalances,
    refreshTotals,
    /// Optional
    // Claims
    blockHeight,
    refreshClaims: fetchClaims ? refreshClaims : undefined,
    claims,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    // Total staked
    totalStaked: fetchTotalStaked ? Number(totalStaked) : undefined,
    // Wallet staked
    walletStaked: fetchWalletStaked ? Number(walletStaked) : undefined,
  }
}
