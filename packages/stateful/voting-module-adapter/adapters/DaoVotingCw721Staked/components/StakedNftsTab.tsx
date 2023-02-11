import { waitForAll } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state/recoil'
import { stakerForNftSelector } from '@dao-dao/state/recoil/selectors/contracts/DaoVotingCw721Staked'
import {
  StakedNftsTab as StatelessStakedNftsTab,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { StakedNftCard } from '../../../../components'
import { nftCardInfoSelector } from '../../../../recoil/selectors/nft'
import { useGovernanceCollectionInfo } from '../hooks'

export const StakedNftsTab = () => {
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const allStakedTokens = useCachedLoadable(
    Cw721BaseSelectors.allTokensForOwnerSelector({
      contractAddress: collectionAddress,
      owner: stakingContractAddress,
    })
  )

  const nftCardInfosLoading = loadableToLoadingData(
    useCachedLoadable(
      allStakedTokens.state === 'hasValue'
        ? waitForAll(
            allStakedTokens.contents.map((tokenId) =>
              nftCardInfoSelector({
                collection: collectionAddress,
                tokenId,
              })
            )
          )
        : undefined
    ),
    []
  )

  const stakedTokenOwners = loadableToLoadingData(
    useCachedLoadable(
      allStakedTokens.state === 'hasValue'
        ? waitForAll(
            allStakedTokens.contents.map((tokenId) =>
              stakerForNftSelector({
                contractAddress: stakingContractAddress,
                tokenId,
              })
            )
          )
        : undefined
    ),
    []
  )

  return (
    <StatelessStakedNftsTab
      NftCard={StakedNftCard}
      nfts={
        nftCardInfosLoading.loading || stakedTokenOwners.loading
          ? { loading: true }
          : {
              loading: false,
              data: nftCardInfosLoading.data.map((nft, index) => ({
                ...nft,
                owner: stakedTokenOwners.data[index],
              })),
            }
      }
    />
  )
}
