import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  Cw20StakedBalanceVotingSelectors,
  StakeCw20Selectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
  useVotingModule,
} from '@dao-dao/state'
import { Claim, GetConfigResponse } from '@dao-dao/state/clients/stake-cw20'
import { claimAvailable } from '@dao-dao/utils'

interface UseStakingOptions {
  fetchClaims?: boolean
  fetchTotalStakedValue?: boolean
  fetchWalletStakedValue?: boolean
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
  // Total staked value
  totalStakedValue?: number
  // Wallet staked value
  walletStakedValue?: number
}

export const useStakingInfo = (
  coreAddress: string,
  {
    fetchClaims = false,
    fetchTotalStakedValue = false,
    fetchWalletStakedValue = false,
  }: UseStakingOptions = {}
): UseStakingResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModule(coreAddress)

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress
      ? Cw20StakedBalanceVotingSelectors.stakingContractSelector({
          contractAddress: votingModuleAddress,
        })
      : constSelector(undefined)
  )

  const stakingContractConfig = useRecoilValue(
    stakingContractAddress
      ? StakeCw20Selectors.getConfigSelector({
          contractAddress: stakingContractAddress,
        })
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
      ? StakeCw20Selectors.claimsSelector({
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

  // Total staked value
  const totalStakedValue = useRecoilValue(
    fetchTotalStakedValue && stakingContractAddress
      ? StakeCw20Selectors.totalValueSelector({
          contractAddress: stakingContractAddress,
        })
      : constSelector(undefined)
  )?.total

  // Wallet staked value
  const walletStakedValue = useRecoilValue(
    fetchWalletStakedValue && stakingContractAddress && walletAddress
      ? StakeCw20Selectors.stakedValueSelector({
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
    // Total staked value
    totalStakedValue: fetchTotalStakedValue
      ? Number(totalStakedValue)
      : undefined,
    // Wallet staked value
    walletStakedValue: fetchWalletStakedValue
      ? Number(walletStakedValue)
      : undefined,
  }
}
