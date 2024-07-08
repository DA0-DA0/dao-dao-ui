import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  blockHeightSelector,
  contractQueries,
  daoVotingOnftStakedQueries,
  daoVotingOnftStakedQueryKeys,
  nftCardInfoSelector,
  omniflixQueries,
  refreshDaoVotingPowerAtom,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useCachedLoadingWithError,
  useDaoContext,
} from '@dao-dao/stateless'
import { NftClaim } from '@dao-dao/types/contracts/DaoVotingOnftStaked'
import { claimAvailable, parseContractVersion } from '@dao-dao/utils'

import {
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useWallet } from '../../../../hooks/useWallet'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'
import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
  fetchWalletUnstakedNfts = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const { dao } = useDaoContext()
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { address: walletAddress } = useWallet({
    chainId,
  })

  const { collectionAddress: governanceTokenAddress } =
    useGovernanceCollectionInfo()

  const queryClient = useQueryClient()
  const [stakingContractVersion, unstakingDuration] = useSuspenseQueries({
    queries: [
      contractQueries.info(queryClient, {
        chainId,
        address: votingModuleAddress,
      }),
      daoVotingOnftStakedQueries.config(queryClient, {
        chainId,
        contractAddress: votingModuleAddress,
      }),
    ],
    combine: ([
      {
        data: { info },
      },
      { data: config },
    ]) => [
      parseContractVersion(info.version),
      config.unstaking_duration || undefined,
    ],
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(dao.coreAddress)
  )

  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(() => {
    setRefreshDaoVotingPower((id) => id + 1)
    queryClient.invalidateQueries({
      queryKey: dao.getVotingPowerQuery(walletAddress).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: dao.getTotalVotingPowerQuery().queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: dao.votingModule.getVotingPowerQuery(walletAddress).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: dao.votingModule.getTotalVotingPowerQuery().queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: omniflixQueries.onftCollectionSupply({
        chainId,
        id: governanceTokenAddress,
      }).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: [
        'omniflix',
        'paginatedOnfts',
        {
          chainId,
          id: governanceTokenAddress,
        },
      ],
    })
    queryClient.invalidateQueries({
      queryKey: [
        'omniflix',
        'allOnfts',
        {
          chainId,
          id: governanceTokenAddress,
        },
      ],
    })
    queryClient.invalidateQueries({
      queryKey: [
        'indexer',
        'query',
        {
          chainId,
          contractAddress: votingModuleAddress,
          formula: 'daoVotingOnftStaked/topStakers',
        },
      ],
    })

    // Invalidate indexer query first.
    queryClient.invalidateQueries({
      queryKey: [
        'indexer',
        'query',
        {
          chainId,
          contractAddress: votingModuleAddress,
          formula: 'daoVotingOnftStaked/stakedNfts',
          args: {
            address: walletAddress,
          },
        },
      ],
    })
    // Then invalidate contract query that uses indexer query.
    queryClient.invalidateQueries({
      queryKey: daoVotingOnftStakedQueryKeys.stakedNfts(votingModuleAddress, {
        address: walletAddress,
      }),
    })
  }, [
    chainId,
    dao,
    governanceTokenAddress,
    queryClient,
    setRefreshDaoVotingPower,
    votingModuleAddress,
    walletAddress,
  ])

  /// Optional

  // Claims
  const blockHeightLoadable = useCachedLoadable(
    fetchClaims
      ? blockHeightSelector({
          chainId,
        })
      : undefined
  )
  const blockHeight =
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0

  const refreshClaims = useCallback(() => {
    // Invalidate indexer query first.
    queryClient.invalidateQueries({
      queryKey: [
        'indexer',
        'query',
        {
          chainId,
          contractAddress: votingModuleAddress,
          formula: 'daoVotingOnftStaked/nftClaims',
          args: {
            address: walletAddress,
          },
        },
      ],
    })
    // Then invalidate contract query that uses indexer query.
    queryClient.invalidateQueries({
      queryKey: daoVotingOnftStakedQueryKeys.nftClaims(votingModuleAddress, {
        address: walletAddress,
      }),
    })
  }, [chainId, queryClient, votingModuleAddress, walletAddress])

  const loadingClaims = useQueryLoadingData(
    daoVotingOnftStakedQueries.nftClaims(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
      args: {
        address: walletAddress || '',
      },
      options: {
        enabled: fetchClaims && !!walletAddress,
      },
    }),
    { nft_claims: [] }
  )
  const nftClaims = (
    loadingClaims.loading ? [] : loadingClaims.data.nft_claims
  ).map(
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
  const sumClaimsAvailable = claimsAvailable?.length

  // Total staked value
  const loadingTotalStakedValue = useQueryLoadingDataWithError({
    ...dao.votingModule.getTotalVotingPowerQuery(),
    enabled: fetchTotalStakedValue,
  })

  // Wallet staked value
  const loadingWalletStakedNftIds = useQueryLoadingDataWithError(
    daoVotingOnftStakedQueries.stakedNfts(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
      args: {
        address: walletAddress ?? '',
      },
      options: {
        enabled: fetchWalletStakedValue && !!walletAddress,
      },
    })
  )

  const loadingWalletStakedNfts = useCachedLoadingWithError(
    !loadingWalletStakedNftIds.loading && !loadingWalletStakedNftIds.errored
      ? waitForAll(
          loadingWalletStakedNftIds.data.map((tokenId) =>
            nftCardInfoSelector({
              chainId,
              collection: governanceTokenAddress,
              tokenId,
            })
          )
        )
      : undefined
  )

  const loadingWalletUnstakedOnfts = useQueryLoadingDataWithError({
    ...omniflixQueries.allOnfts(queryClient, {
      chainId,
      id: governanceTokenAddress,
      owner: walletAddress ?? '',
    }),
    enabled: fetchWalletUnstakedNfts && !!walletAddress,
  })

  const loadingWalletUnstakedNfts = useCachedLoadingWithError(
    !loadingWalletUnstakedOnfts.loading && !loadingWalletUnstakedOnfts.errored
      ? waitForAll(
          loadingWalletUnstakedOnfts.data.map(({ id }) =>
            nftCardInfoSelector({
              chainId,
              collection: governanceTokenAddress,
              tokenId: id,
            })
          )
        )
      : undefined
  )

  return {
    stakingContractVersion,
    stakingContractAddress: votingModuleAddress,
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
    loadingTotalStakedValue:
      !fetchTotalStakedValue || loadingTotalStakedValue.errored
        ? undefined
        : loadingTotalStakedValue.loading
        ? { loading: true }
        : {
            loading: false,
            data: Number(loadingTotalStakedValue.data.power),
          },
    // Wallet staked value
    loadingWalletStakedValue:
      !fetchWalletStakedValue || loadingWalletStakedNftIds.errored
        ? undefined
        : loadingWalletStakedNftIds.loading
        ? { loading: true }
        : {
            loading: false,
            data: loadingWalletStakedNftIds.data.length,
          },
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
  }
}
