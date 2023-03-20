import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable, useCachedLoading } from '@dao-dao/stateless'
import { claimAvailable } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const config = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
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
  const blockHeightLoadable = useCachedLoadable(
    fetchClaims ? blockHeightSelector({}) : undefined
  )
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = () => _setClaimsId((id) => id + 1)

  const loadingClaims = useCachedLoading(
    fetchClaims && walletAddress
      ? DaoVotingNativeStakedSelectors.claimsSelector({
          contractAddress: votingModuleAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined),
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
  const loadingTotalStakedValue = useCachedLoading(
    fetchTotalStakedValue
      ? DaoVotingNativeStakedSelectors.totalPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{}],
        })
      : constSelector(undefined),
    undefined
  )

  // Wallet staked value
  const loadingWalletStakedValue = useCachedLoading(
    fetchWalletStakedValue && walletAddress
      ? DaoVotingNativeStakedSelectors.votingPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined),
    undefined
  )

  return {
    stakingContractAddress: '',
    unstakingDuration: config.unstaking_duration ?? undefined,
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
    loadingTotalStakedValue: loadingTotalStakedValue.loading
      ? { loading: true }
      : !loadingTotalStakedValue.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingTotalStakedValue.data.power),
        },
    // Wallet staked value
    loadingWalletStakedValue: loadingWalletStakedValue.loading
      ? { loading: true }
      : !loadingWalletStakedValue.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletStakedValue.data.power),
        },
  }
}
