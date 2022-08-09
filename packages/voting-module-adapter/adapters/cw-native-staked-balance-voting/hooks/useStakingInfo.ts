import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  CwNativeStakedBalanceVotingSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { claimAvailable } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../../../types'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const config = useRecoilValue(
    CwNativeStakedBalanceVotingSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )
  if (!config) {
    throw new Error(t('error.loadingData'))
  }

  const setRefreshStakingContractBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(config.denom)
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
    fetchClaims && walletAddress
      ? CwNativeStakedBalanceVotingSelectors.claimsSelector({
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
      ? CwNativeStakedBalanceVotingSelectors.totalPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.power

  // Wallet staked value
  const walletStakedValue = useRecoilValue(
    fetchWalletStakedValue && walletAddress
      ? CwNativeStakedBalanceVotingSelectors.votingPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power

  return {
    stakingContractAddress: '',
    unstakingDuration: config.unstaking_duration ?? undefined,
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
