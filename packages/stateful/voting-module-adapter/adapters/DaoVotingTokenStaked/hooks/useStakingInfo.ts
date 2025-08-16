import { useSuspenseQuery } from '@tanstack/react-query'
import { constSelector, useSetRecoilState } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoVotingNativeStakedSelectors,
  DaoVotingTokenStakedSelectors,
  chainQueries,
  daoVotingTokenStakedQueries,
  refreshClaimsIdAtom,
} from '@dao-dao/state'
import { TokenStakedVotingModule } from '@dao-dao/state/clients'
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
  const loadingTotalStakedValue = useCachedLoading(
    fetchTotalStakedValue
      ? (votingModule instanceof TokenStakedVotingModule
          ? DaoVotingTokenStakedSelectors
          : DaoVotingNativeStakedSelectors
        ).totalPowerAtHeightSelector({
          chainId: votingModule.chainId,
          contractAddress: votingModule.address,
          params: [{}],
        })
      : constSelector(undefined),
    undefined
  )

  // Wallet staked value
  const loadingWalletStakedValue = useCachedLoading(
    fetchWalletStakedValue && walletAddress
      ? (votingModule instanceof TokenStakedVotingModule
          ? DaoVotingTokenStakedSelectors
          : DaoVotingNativeStakedSelectors
        ).votingPowerAtHeightSelector({
          chainId: votingModule.chainId,
          contractAddress: votingModule.address,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined),
    undefined
  )

  return {
    stakingContractAddress: votingModule.address,
    unstakingDuration: config.unstaking_duration ?? undefined,
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
      : !loadingTotalStakedValue.data
        ? undefined
        : {
            loading: false,
            data: HugeDecimal.from(loadingTotalStakedValue.data.power),
          },
    // Wallet staked value
    loadingWalletStakedValue: loadingWalletStakedValue.loading
      ? { loading: true }
      : !loadingWalletStakedValue.data
        ? undefined
        : {
            loading: false,
            data: HugeDecimal.from(loadingWalletStakedValue.data.power),
          },
  }
}
