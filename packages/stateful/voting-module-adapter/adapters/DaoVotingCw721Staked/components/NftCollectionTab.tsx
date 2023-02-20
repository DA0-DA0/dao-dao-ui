import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, waitForAll } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state/recoil'
import { stakerForNftSelector } from '@dao-dao/state/recoil/selectors/contracts/DaoVotingCw721Staked'
import { NftsTab, useCachedLoadable } from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { NftCardNoCollection, StakedNftCard } from '../../../../components'
import { nftCardInfoSelector } from '../../../../recoil/selectors/nft'
import { useGovernanceCollectionInfo } from '../hooks'

enum Filter {
  All = 'all',
  Staked = 'staked',
  Unstaked = 'unstaked',
}

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const allTokens = useCachedLoadable(
    Cw721BaseSelectors.allTokensSelector({
      contractAddress: collectionAddress,
    })
  )

  const nftCardInfosLoading = loadableToLoadingData(
    useCachedLoadable(
      allTokens.state === 'hasValue'
        ? waitForAll(
            allTokens.contents.map((tokenId) =>
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

  const tokenOwners = loadableToLoadingData(
    useCachedLoadable(
      allTokens.state === 'hasValue'
        ? waitForAll(
            allTokens.contents.map((tokenId) =>
              Cw721BaseSelectors.ownerOfSelector({
                contractAddress: collectionAddress,
                params: [
                  {
                    tokenId,
                  },
                ],
              })
            )
          )
        : undefined
    ),
    []
  )

  // Show the owner by checking if owner is staking contract and using the
  // staker instead if so. If not staked with staking contract, use owner.
  const stakerOrOwnerForTokens = loadableToLoadingData(
    useCachedLoadable(
      allTokens.state === 'hasValue' && !tokenOwners.loading
        ? waitForAll(
            allTokens.contents.map((tokenId, index) =>
              tokenOwners.data[index].owner === stakingContractAddress
                ? stakerForNftSelector({
                    contractAddress: stakingContractAddress,
                    tokenId,
                  })
                : constSelector(tokenOwners.data[index].owner)
            )
          )
        : undefined
    ),
    []
  )

  const [filter, setFilter] = useState(Filter.All)

  return (
    <NftsTab
      NftCard={NftCardNoCollection}
      description={t('info.nftCollectionExplanation', { context: filter })}
      filterDropdownProps={{
        onSelect: (value) => setFilter(value),
        options: [
          {
            label: t('title.allNfts'),
            value: Filter.All,
          },
          {
            label: t('title.stakedNfts'),
            value: Filter.Staked,
          },
          {
            label: t('title.unstakedNfts'),
            value: Filter.Unstaked,
          },
        ],
        selected: filter,
      }}
      nfts={
        nftCardInfosLoading.loading ||
        tokenOwners.loading ||
        stakerOrOwnerForTokens.loading
          ? { loading: true }
          : {
              loading: false,
              data: nftCardInfosLoading.data
                .map((nft, index) => ({
                  ...nft,
                  owner: stakerOrOwnerForTokens.data[index],
                  // If staked, show staked card instead of default.
                  OverrideNftCard:
                    tokenOwners.data[index].owner === stakingContractAddress
                      ? StakedNftCard
                      : undefined,
                }))
                // Filter by selected filter.
                .filter((nft) =>
                  filter === Filter.All
                    ? true
                    : filter === Filter.Staked
                    ? nft.OverrideNftCard
                    : !nft.OverrideNftCard
                )
                // Sort staked NFTs first.
                .sort((a, b) =>
                  a.OverrideNftCard && b.OverrideNftCard
                    ? a.name.localeCompare(b.name)
                    : a.OverrideNftCard
                    ? -1
                    : b.OverrideNftCard
                    ? 1
                    : 0
                ),
            }
      }
    />
  )
}
