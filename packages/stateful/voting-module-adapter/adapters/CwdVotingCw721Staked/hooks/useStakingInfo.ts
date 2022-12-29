import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  Cw721BaseSelectors,
  CwdVotingCw721StakedSelectors,
  blockHeightSelector,
  refreshClaimsIdAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  NftCardInfo,
  UseStakingInfoOptions,
  UseStakingInfoResponse,
} from '@dao-dao/types'
import { NftClaim } from '@dao-dao/types/contracts/CwdVotingCw721Staked'
import { claimAvailable, loadableToLoadingDataWithError } from '@dao-dao/utils'

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
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { governanceTokenAddress } = useGovernanceTokenInfo()

  const stakingContractAddress = votingModuleAddress
  const unstakingDuration =
    useRecoilValue(
      CwdVotingCw721StakedSelectors.configSelector({
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
      ? CwdVotingCw721StakedSelectors.nftClaimsSelector({
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
      ? CwdVotingCw721StakedSelectors.totalPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.power

  // Wallet staked value
  const walletStakedNfts = useRecoilValue(
    fetchWalletStakedValue && walletAddress
      ? CwdVotingCw721StakedSelectors.votingPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power

  const loadingWalletStakedNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      fetchLoadingWalletStakedValue && walletAddress
        ? CwdVotingCw721StakedSelectors.stakedNftsSelector({
            contractAddress: stakingContractAddress,
            params: [{ address: walletAddress }],
          })
        : undefined
    )
  )

  const loadingWalletUnstakedNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      fetchLoadingWalletUnstakedValue && walletAddress && governanceTokenAddress
        ? Cw721BaseSelectors.tokensSelector({
            contractAddress: governanceTokenAddress,
            params: [{ owner: walletAddress }],
          })
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
    loadingWalletStakedValue: loadingWalletStakedNfts.loading
      ? { loading: true }
      : !loadingWalletStakedNfts
      ? undefined
      : {
          loading: false,
          data: Number(
            loadingWalletStakedNfts.loading || loadingWalletStakedNfts.errored
              ? 0
              : loadingWalletStakedNfts.data?.length
          ),
        },
    loadingWalletStakedNfts:
      loadingWalletStakedNfts.loading || loadingWalletStakedNfts.errored
        ? loadingWalletStakedNfts
        : {
            loading: false,
            errored: false,
            data: [
              ...loadingWalletStakedNfts.data?.map(
                (tokenId) =>
                  ({
                    collection: {
                      address: governanceTokenAddress,
                      name: '',
                    },
                    tokenId,
                    name: '',
                    imageUrl: `https://nft-api.loop.markets/ipfs/QmZnAagPx7QPv5w7E3DhTYh8AqHSQGTzwUxm2xjLJ391F5/${tokenId}.webp`,
                  } as NftCardInfo)
              ),
            ],
          },
    loadingWalletUnstakedNfts:
      loadingWalletUnstakedNfts.loading || loadingWalletUnstakedNfts.errored
        ? loadingWalletUnstakedNfts
        : {
            loading: false,
            errored: false,
            data: [
              ...loadingWalletUnstakedNfts.data?.tokens?.map(
                (tokenId) =>
                  ({
                    collection: {
                      address: governanceTokenAddress,
                      name: '',
                    },
                    tokenId,
                    name: '',
                    imageUrl: `https://nft-api.loop.markets/ipfs/QmZnAagPx7QPv5w7E3DhTYh8AqHSQGTzwUxm2xjLJ391F5/${tokenId}.webp`,
                  } as NftCardInfo)
              ),
            ],
          },
  }
}
