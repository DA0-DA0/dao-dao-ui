import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  Cw20StakeSelectors,
  DaoVotingCw20StakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { claimAvailable, loadableToLoadingData } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const stakingContractAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const unstakingDuration =
    useRecoilValue(
      Cw20StakeSelectors.getConfigSelector({
        contractAddress: stakingContractAddress,
        params: [],
      })
    ).unstaking_duration ?? undefined

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
  const blockHeightLoadable = useCachedLoadable(
    fetchClaims ? blockHeightSelector({}) : undefined
  )
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = useCallback(
    () => _setClaimsId((id) => id + 1),
    [_setClaimsId]
  )

  const loadingClaims = loadableToLoadingData(
    useCachedLoadable(
      fetchClaims && walletAddress
        ? Cw20StakeSelectors.claimsSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    ),
    undefined
  )
  const claims = loadingClaims.loading
    ? []
    : !loadingClaims.data
    ? undefined
    : loadingClaims.data.claims

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
  const loadingTotalStakedValue = loadableToLoadingData(
    useCachedLoadable(
      fetchTotalStakedValue
        ? Cw20StakeSelectors.totalValueSelector({
            contractAddress: stakingContractAddress,
            params: [],
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Wallet staked value
  const loadingWalletStakedValue = loadableToLoadingData(
    useCachedLoadable(
      fetchWalletStakedValue && walletAddress
        ? Cw20StakeSelectors.stakedValueSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    ),
    undefined
  )

  return {
    stakingContractAddress,
    unstakingDuration,
    refreshTotals,
    /// Optional
    // Claims
    blockHeight:
      blockHeightLoadable.state === 'hasValue'
        ? blockHeightLoadable.contents
        : 0,
    refreshClaims: fetchClaims ? refreshClaims : undefined,
    claims,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    // Total staked value
    loadingTotalStakedValue: loadingTotalStakedValue.loading
      ? { loading: true }
      : !loadingTotalStakedValue.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingTotalStakedValue.data.total),
        },
    // Wallet staked value
    loadingWalletStakedValue: loadingWalletStakedValue.loading
      ? { loading: true }
      : !loadingWalletStakedValue.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletStakedValue.data.value),
        },
  }
}
