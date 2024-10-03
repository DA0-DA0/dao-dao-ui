import { useCallback } from 'react'
import {
  constSelector,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  CommonNftSelectors,
  DaoVotingCw721StakedSelectors,
  blockHeightSelector,
  contractVersionSelector,
  nftCardInfoSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useCachedLoading,
  useCachedLoadingWithError,
  useDaoContext,
} from '@dao-dao/stateless'
import { NftClaim } from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import { claimAvailable } from '@dao-dao/utils'

import { useWallet } from '../../../../hooks/useWallet'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'
import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
  fetchWalletUnstakedNfts = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { dao } = useDaoContext()
  const { address: walletAddress } = useWallet()

  const { collectionAddress: governanceTokenAddress } =
    useGovernanceCollectionInfo()

  const [stakingContractVersion, { unstaking_duration: unstakingDuration }] =
    useRecoilValue(
      waitForAll([
        contractVersionSelector({
          chainId: dao.chainId,
          contractAddress: dao.votingModule.address,
        }),
        DaoVotingCw721StakedSelectors.configSelector({
          chainId: dao.chainId,
          contractAddress: dao.votingModule.address,
          params: [],
        }),
      ])
    )

  const setRefreshTotalBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(undefined)
  )
  // Refresh NFTs owned by staking contract.
  const setRefreshStakedNftsId = useSetRecoilState(
    refreshWalletBalancesIdAtom(dao.votingModule.address)
  )
  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(() => {
    setRefreshTotalBalancesId((id) => id + 1)
    setRefreshStakedNftsId((id) => id + 1)
  }, [setRefreshStakedNftsId, setRefreshTotalBalancesId])

  /// Optional

  // Claims
  const blockHeightLoadable = useCachedLoadable(
    fetchClaims
      ? blockHeightSelector({
          chainId: dao.chainId,
        })
      : undefined
  )
  const blockHeight =
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0

  const _setClaimsId = useSetRecoilState(refreshClaimsIdAtom(walletAddress))
  const refreshClaims = useCallback(
    () => _setClaimsId((id) => id + 1),
    [_setClaimsId]
  )

  const loadingClaims = useCachedLoading(
    fetchClaims && walletAddress
      ? DaoVotingCw721StakedSelectors.nftClaimsSelector({
          chainId: dao.chainId,
          contractAddress: dao.votingModule.address,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined),
    undefined
  )
  const claims =
    loadingClaims.loading || !loadingClaims.data
      ? []
      : loadingClaims.data.nft_claims
  const nftClaims = claims.map(
    ({ token_id, release_at }): NftClaim => ({
      release_at,
      token_id,
    })
  )

  const claimsPending = blockHeight
    ? nftClaims?.filter((c) => !claimAvailable(c, blockHeight))
    : undefined
  const claimsAvailable = blockHeight
    ? nftClaims?.filter((c) => claimAvailable(c, blockHeight))
    : undefined
  const sumClaimsAvailable = HugeDecimal.from(claimsAvailable?.length || 0)

  // Total staked value
  const loadingTotalStakedValue = useCachedLoading(
    fetchTotalStakedValue
      ? DaoVotingCw721StakedSelectors.totalPowerAtHeightSelector({
          chainId: dao.chainId,
          contractAddress: dao.votingModule.address,
          params: [{}],
        })
      : constSelector(undefined),
    undefined
  )

  // Wallet staked value
  const loadingWalletStakedNftsLoadable = useCachedLoading(
    fetchWalletStakedValue && walletAddress
      ? DaoVotingCw721StakedSelectors.stakedNftsSelector({
          chainId: dao.chainId,
          contractAddress: dao.votingModule.address,
          params: [{ address: walletAddress }],
        })
      : undefined,
    undefined
  )

  const loadingWalletStakedNfts = useCachedLoadingWithError(
    !loadingWalletStakedNftsLoadable.loading &&
      loadingWalletStakedNftsLoadable.data
      ? waitForAll(
          loadingWalletStakedNftsLoadable.data?.map((tokenId) =>
            nftCardInfoSelector({
              chainId: dao.chainId,
              collection: governanceTokenAddress,
              tokenId,
            })
          )
        )
      : undefined
  )

  const loadingWalletUnstakedNftsLoadable = useCachedLoadingWithError(
    fetchWalletUnstakedNfts && walletAddress && governanceTokenAddress
      ? CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
          chainId: dao.chainId,
          contractAddress: governanceTokenAddress,
          owner: walletAddress,
        })
      : undefined
  )

  const loadingWalletUnstakedNfts = useCachedLoadingWithError(
    !loadingWalletUnstakedNftsLoadable.loading &&
      !loadingWalletUnstakedNftsLoadable.errored &&
      loadingWalletUnstakedNftsLoadable.data
      ? waitForAll(
          loadingWalletUnstakedNftsLoadable.data?.map((tokenId) =>
            nftCardInfoSelector({
              chainId: dao.chainId,
              collection: governanceTokenAddress,
              tokenId,
            })
          )
        )
      : undefined
  )

  return {
    stakingContractVersion,
    stakingContractAddress: dao.votingModule.address,
    unstakingDuration: unstakingDuration ?? undefined,
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
    loadingTotalStakedValue: loadingTotalStakedValue.loading
      ? { loading: true }
      : !loadingTotalStakedValue.data
      ? undefined
      : {
          loading: false,
          data: HugeDecimal.from(loadingTotalStakedValue.data.power),
        },
    // Wallet staked value
    loadingWalletStakedValue: loadingWalletStakedNftsLoadable.loading
      ? { loading: true }
      : !loadingWalletStakedNftsLoadable.data
      ? undefined
      : {
          loading: false,
          data: HugeDecimal.from(loadingWalletStakedNftsLoadable.data.length),
        },
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
  }
}
