import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import {
  constSelector,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import {
  Cw721BaseSelectors,
  DaoVotingCw721StakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '@dao-dao/types'
import { NftClaim } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import { claimAvailable, loadableToLoadingDataWithError } from '@dao-dao/utils'

import { useActionOptions } from '../../../../actions/react'
import { nftCardInfoSelector } from '../../../../recoil/selectors/nft'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceTokenInfo } from './useGovernanceTokenInfo'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
  fetchLoadingWalletStakedValue = false,
  fetchLoadingWalletUnstakedValue = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { chainId } = useActionOptions()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { governanceTokenAddress } = useGovernanceTokenInfo()

  const stakingContractAddress = votingModuleAddress
  const unstakingDuration =
    useRecoilValue(
      DaoVotingCw721StakedSelectors.configSelector({
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
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = useCallback(
    () => _setClaimsId((id) => id + 1),
    [_setClaimsId]
  )

  const claims = useRecoilValue(
    fetchClaims && walletAddress
      ? DaoVotingCw721StakedSelectors.nftClaimsSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.nft_claims

  const nftClaims: NftClaim[] = claims
    ? claims.map(({ token_id, release_at }) => {
        return {
          release_at,
          token_id,
        } as NftClaim
      })
    : []

  const claimsPending = blockHeight
    ? nftClaims?.filter((c) => !claimAvailable(c, blockHeight))
    : undefined
  const claimsAvailable = blockHeight
    ? nftClaims?.filter((c) => claimAvailable(c, blockHeight))
    : undefined
  const sumClaimsAvailable = claimsAvailable?.length

  // Total staked value
  const totalStakedValue = useRecoilValue(
    fetchTotalStakedValue
      ? DaoVotingCw721StakedSelectors.totalPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.power

  // Wallet staked value
  const walletStakedNfts = useRecoilValue(
    fetchWalletStakedValue && walletAddress
      ? DaoVotingCw721StakedSelectors.votingPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power

  const loadingWalletStakedNftsLoadable = loadableToLoadingDataWithError(
    useCachedLoadable(
      fetchLoadingWalletStakedValue && walletAddress
        ? DaoVotingCw721StakedSelectors.stakedNftsSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : undefined
    )
  )

  const loadingWalletUnstakedNftsLoadable = loadableToLoadingDataWithError(
    useCachedLoadable(
      fetchLoadingWalletUnstakedValue && walletAddress && governanceTokenAddress
        ? Cw721BaseSelectors.allTokensForOwnerSelector({
            contractAddress: governanceTokenAddress,
            owner: walletAddress,
          })
        : undefined
    )
  )

  const loadingWalletStakedNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      !loadingWalletStakedNftsLoadable.loading &&
        !loadingWalletStakedNftsLoadable.errored &&
        loadingWalletStakedNftsLoadable.data
        ? waitForAll(
            loadingWalletStakedNftsLoadable.data?.map((tokenId) =>
              nftCardInfoSelector({
                chainId,
                collection: governanceTokenAddress,
                tokenId,
              })
            )
          )
        : undefined
    )
  )

  const loadingWalletUnstakedNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      !loadingWalletUnstakedNftsLoadable.loading &&
        !loadingWalletUnstakedNftsLoadable.errored &&
        loadingWalletUnstakedNftsLoadable.data
        ? waitForAll(
            loadingWalletUnstakedNftsLoadable.data?.map((tokenId) =>
              nftCardInfoSelector({
                chainId,
                collection: governanceTokenAddress,
                tokenId,
              })
            )
          )
        : undefined
    )
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
    claims: nftClaims,
    claimsPending,
    claimsAvailable,
    sumClaimsAvailable,
    // Total staked value
    totalStakedValue: totalStakedValue ? Number(totalStakedValue) : undefined,
    // Wallet staked value
    walletStakedValue: walletStakedNfts ? Number(walletStakedNfts) : undefined,
    loadingWalletStakedValue: loadingWalletStakedNftsLoadable.loading
      ? { loading: true }
      : !loadingWalletStakedNftsLoadable
      ? undefined
      : {
          loading: false,
          data: Number(
            loadingWalletStakedNftsLoadable.loading ||
              loadingWalletStakedNftsLoadable.errored
              ? 0
              : loadingWalletStakedNftsLoadable.data?.length
          ),
        },
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
  }
}
