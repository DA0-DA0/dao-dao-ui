import { useSuspenseQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { constSelector, useSetRecoilState } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoVotingTokenStakedSelectors,
  chainQueries,
  daoVotingTokenStakedQueries,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoading, useVotingModule } from '@dao-dao/stateless'
import { claimAvailable } from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useWallet } from '../../../../hooks/useWallet'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const votingModule = useVotingModule()
  const { address: walletAddress } = useWallet()

  const { data: config } = useSuspenseQuery(
    daoVotingTokenStakedQueries.getConfig({
      chainId: votingModule.chainId,
      contractAddress: votingModule.address,
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
  const blockHeightLoading = useQueryLoadingDataWithError(
    fetchClaims
      ? chainQueries.block({
          chainId: votingModule.chainId,
        })
      : undefined
  )
  const blockHeight =
    blockHeightLoading.loading || blockHeightLoading.errored
      ? undefined
      : blockHeightLoading.data.header.height

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = () => _setClaimsId((id) => id + 1)

  const loadingClaims = useCachedLoading(
    fetchClaims && walletAddress
      ? DaoVotingTokenStakedSelectors.claimsSelector({
          chainId: votingModule.chainId,
          contractAddress: votingModule.address,
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
    (sum, c) => sum.plus(c.amount),
    HugeDecimal.zero
  )

  // Total staked value
  const loadingTotalStakedValue = useQueryLoadingDataWithError({
    ...votingModule.getTotalVotingPowerQuery(),
    enabled: fetchTotalStakedValue,
  })

  // Wallet staked value
  const loadingWalletStakedValue = useQueryLoadingDataWithError({
    ...votingModule.getVotingPowerQuery(walletAddress),
    enabled: fetchWalletStakedValue && !!walletAddress,
  })

  return {
    stakingContractAddress: votingModule.address,
    unstakingDuration: config.unstaking_duration ?? undefined,
    refreshTotals,
    /// Optional
    // Claims
    refreshClaims: fetchClaims ? refreshClaims : undefined,
    claims,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    // Total staked value
    loadingTotalStakedValue: loadingTotalStakedValue.loading
      ? { loading: true }
      : loadingTotalStakedValue.errored
        ? undefined
        : {
            loading: false,
            data: HugeDecimal.from(loadingTotalStakedValue.data.power),
          },
    // Wallet staked value
    loadingWalletStakedValue: loadingWalletStakedValue.loading
      ? { loading: true }
      : loadingWalletStakedValue.errored
        ? undefined
        : {
            loading: false,
            data: HugeDecimal.from(loadingWalletStakedValue.data.power),
          },
  }
}
