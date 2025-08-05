import { useSuspenseQueries } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  chainQueries,
  contractQueries,
  daoVotingOnftStakedExtraQueries,
  daoVotingOnftStakedQueries,
  daoVotingOnftStakedQueryKeys,
  omniflixQueries,
  refreshDaoVotingPowerAtom,
} from '@dao-dao/state'
import { useDao, useDependencyTrackedQueryClient } from '@dao-dao/stateless'
import { LazyNftCardInfo } from '@dao-dao/types'
import { NftClaimsResponse } from '@dao-dao/types/contracts/DaoVotingOnftStaked'
import { claimAvailable, getNftKey } from '@dao-dao/utils'

import {
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useWallet } from '../../../../hooks/useWallet'
import { UseStakingInfoOptions, UseStakingInfoResponse } from '../types'
import { useGovernanceCollectionInfo } from './useGovernanceCollectionInfo'

export const useStakingInfo = ({
  fetchClaims = false,
  fetchTotalStakedValue = false,
  fetchWalletStakedValue = false,
  fetchWalletUnstakedNfts = false,
}: UseStakingInfoOptions = {}): UseStakingInfoResponse => {
  const dao = useDao()
  const { address: walletAddress } = useWallet()
  const { collectionAddress } = useGovernanceCollectionInfo()
  const queryClient = useDependencyTrackedQueryClient()

  const { votingModule } = dao

  const [stakingContractVersion, unstakingDuration] = useSuspenseQueries({
    queries: [
      contractQueries.version({
        chainId: votingModule.chainId,
        address: votingModule.address,
      }),
      daoVotingOnftStakedQueries.config({
        chainId: votingModule.chainId,
        contractAddress: votingModule.address,
      }),
    ],
    combine: ([
      { data: version },
      {
        data: { unstaking_duration },
      },
    ]) => [version, unstaking_duration || undefined],
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(dao.coreAddress)
  )

  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(() => {
    setRefreshDaoVotingPower((id) => id + 1)
    queryClient.invalidate(dao.getVotingPowerQuery(walletAddress))
    queryClient.invalidate(dao.getTotalVotingPowerQuery())
    queryClient.invalidate(dao.votingModule.getVotingPowerQuery(walletAddress))
    queryClient.invalidate(dao.votingModule.getTotalVotingPowerQuery())
    queryClient.invalidate(
      omniflixQueries.onftCollectionSupply({
        chainId: votingModule.chainId,
        id: collectionAddress,
      })
    )
    queryClient.invalidate(
      omniflixQueries.paginatedOnfts({
        chainId: votingModule.chainId,
        id: collectionAddress,
      } as any)
    )
    queryClient.invalidate(
      omniflixQueries.allOnfts({
        chainId: votingModule.chainId,
        id: collectionAddress,
      })
    )
    queryClient.invalidate(
      daoVotingOnftStakedExtraQueries.topStakers({
        chainId: votingModule.chainId,
        address: votingModule.address,
      })
    )
    queryClient.invalidate(
      daoVotingOnftStakedQueryKeys.stakedNfts(
        votingModule.chainId,
        votingModule.address,
        {
          address: walletAddress,
        }
      )
    )
  }, [
    votingModule,
    dao,
    collectionAddress,
    queryClient,
    setRefreshDaoVotingPower,
    walletAddress,
  ])

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

  const refreshClaims = useCallback(() => {
    queryClient.invalidate(
      daoVotingOnftStakedQueryKeys.nftClaims(
        votingModule.chainId,
        votingModule.address,
        {
          address: walletAddress,
        }
      )
    )
  }, [votingModule, queryClient, walletAddress])

  const loadingClaims = useQueryLoadingData(
    daoVotingOnftStakedQueries.nftClaims({
      chainId: votingModule.chainId,
      contractAddress: votingModule.address,
      args: {
        address: walletAddress || '',
      },
      options: {
        enabled: fetchClaims && !!walletAddress,
      },
    }),
    { nft_claims: [] } as NftClaimsResponse
  )
  const nftClaims = loadingClaims.loading ? [] : loadingClaims.data.nft_claims

  const claimsPending = blockHeight
    ? nftClaims?.filter((c) => !claimAvailable(c, blockHeight))
    : undefined
  const claimsAvailable = blockHeight
    ? nftClaims?.filter((c) => claimAvailable(c, blockHeight))
    : undefined
  const sumClaimsAvailable = HugeDecimal.from(claimsAvailable?.length || 0)

  // Total staked value
  const loadingTotalStakedValue = useQueryLoadingDataWithError({
    ...dao.votingModule.getTotalVotingPowerQuery(),
    enabled: fetchTotalStakedValue,
  })

  // Wallet staked value
  const loadingWalletStakedNfts = useQueryLoadingDataWithError(
    daoVotingOnftStakedQueries.stakedNfts({
      chainId: votingModule.chainId,
      contractAddress: votingModule.address,
      args: {
        address: walletAddress ?? '',
      },
      options: {
        enabled: fetchWalletStakedValue && !!walletAddress,
      },
    }),
    (data) =>
      data.map(
        (tokenId): LazyNftCardInfo => ({
          key: getNftKey(votingModule.chainId, collectionAddress, tokenId),
          chainId: votingModule.chainId,
          collectionAddress,
          tokenId,
        })
      )
  )

  const loadingWalletUnstakedNfts = useQueryLoadingDataWithError(
    {
      ...omniflixQueries.allOnfts({
        chainId: votingModule.chainId,
        id: collectionAddress,
        owner: walletAddress ?? '',
      }),
      enabled: fetchWalletUnstakedNfts && !!walletAddress,
    },
    ([{ onfts }]) =>
      onfts.map(
        ({ id }): LazyNftCardInfo => ({
          key: getNftKey(votingModule.chainId, collectionAddress, id),
          chainId: votingModule.chainId,
          collectionAddress,
          tokenId: id,
        })
      )
  )

  return {
    stakingContractVersion,
    stakingContractAddress: votingModule.address,
    unstakingDuration,
    refreshTotals,
    /// Optional
    // Claims
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
              data: HugeDecimal.from(loadingTotalStakedValue.data.power),
            },
    // Wallet staked value
    loadingWalletStakedValue:
      !fetchWalletStakedValue || loadingWalletStakedNfts.errored
        ? undefined
        : loadingWalletStakedNfts.loading
          ? { loading: true }
          : {
              loading: false,
              data: HugeDecimal.from(loadingWalletStakedNfts.data.length),
            },
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
  }
}
