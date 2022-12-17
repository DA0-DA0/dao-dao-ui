import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '@dao-dao/types'
import { claimAvailable, loadableToLoadingData } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
  fetchLoadingWalletStakedValue = false,
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
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = () => _setClaimsId((id) => id + 1)

  const claims = useRecoilValue(
    fetchClaims && walletAddress
      ? DaoVotingNativeStakedSelectors.claimsSelector({
          contractAddress: votingModuleAddress,
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
    fetchTotalStakedValue
      ? DaoVotingNativeStakedSelectors.totalPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.power

  // Wallet staked value
  const walletStakedValue = useRecoilValue(
    fetchWalletStakedValue && walletAddress
      ? DaoVotingNativeStakedSelectors.votingPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power
  const loadingWalletStakedValue = loadableToLoadingData(
    useCachedLoadable(
      fetchLoadingWalletStakedValue && walletAddress
        ? DaoVotingNativeStakedSelectors.votingPowerAtHeightSelector({
            contractAddress: votingModuleAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    ),
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
    totalStakedValue: totalStakedValue ? Number(totalStakedValue) : undefined,
    // Wallet staked value
    walletStakedValue: walletStakedValue
      ? Number(walletStakedValue)
      : undefined,
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
