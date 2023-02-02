import { waitForAll } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state/recoil'
import {
  StakedNftsTab as StatelessStakedNftsTab,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { NftCard } from '../../../../components'
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

  const nftCardInfosLoadable = useCachedLoadable(
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
  )

  return (
    <StatelessStakedNftsTab
      NftCard={NftCard}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
    />
  )
}
