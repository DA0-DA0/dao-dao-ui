import { selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  CommonNftSelectors,
  DaoCoreV2Selectors,
  nftUriDataSelector,
  queryWalletIndexerSelector,
  refreshWalletBalancesIdAtom,
  refreshWalletStargazeNftsAtom,
} from '@dao-dao/state'
import { stakerForNftSelector } from '@dao-dao/state/recoil/selectors/contracts/DaoVotingCw721Staked'
import { ChainId, NftCardInfo, WithChainId } from '@dao-dao/types'
import { LazyNftCardInfo, LoadingNfts, StargazeNft } from '@dao-dao/types/nft'
import {
  MAINNET,
  STARGAZE_PROFILE_API_TEMPLATE,
  STARGAZE_URL_BASE,
  getNftKey,
  transformBech32Address,
} from '@dao-dao/utils'

export const walletStargazeNftCardInfosSelector = selectorFamily<
  NftCardInfo[],
  string
>({
  key: 'walletStargazeNftCardInfos',
  get:
    (walletAddress: string) =>
    async ({ get }) => {
      const stargazeWalletAddress = transformBech32Address(
        walletAddress,
        MAINNET ? ChainId.StargazeMainnet : ChainId.StargazeTestnet
      )

      get(refreshWalletStargazeNftsAtom(stargazeWalletAddress))

      let stargazeNfts: StargazeNft[] = []
      try {
        stargazeNfts = await (
          await fetch(
            STARGAZE_PROFILE_API_TEMPLATE.replace(
              'ADDRESS',
              stargazeWalletAddress
            )
          )
        ).json()
      } catch (err) {
        console.error(err)
      }

      if (!Array.isArray(stargazeNfts)) {
        return []
      }

      const nftCardInfos = get(
        waitForAll(
          stargazeNfts.map(({ collection, tokenId, tokenUri }) =>
            nftCardInfoWithUriSelector({
              collection: collection.contractAddress,
              tokenId,
              tokenUri,
              chainId: MAINNET
                ? ChainId.StargazeMainnet
                : ChainId.StargazeTestnet,
            })
          )
        )
      )

      return nftCardInfos
    },
})

export const nftCardInfoWithUriSelector = selectorFamily<
  NftCardInfo,
  WithChainId<{
    collection: string
    tokenId: string
    tokenUri?: string | null | undefined
  }>
>({
  key: 'nftCardInfo',
  get:
    ({ tokenId, collection, tokenUri, chainId }) =>
    async ({ get }) => {
      const collectionInfo = get(
        CommonNftSelectors.contractInfoSelector({
          contractAddress: collection,
          chainId,
          params: [],
        })
      )

      const metadata =
        (tokenUri && get(nftUriDataSelector(tokenUri))) || undefined
      const { name = '', description, imageUrl, externalLink } = metadata || {}

      const info: NftCardInfo = {
        key: getNftKey(chainId, collection, tokenId),
        collectionAddress: collection,
        collectionName: collectionInfo.name,
        tokenId,
        externalLink:
          externalLink ||
          (chainId === ChainId.StargazeMainnet
            ? {
                href: `${STARGAZE_URL_BASE}/media/${collection}/${tokenId}`,
                name: 'Stargaze',
              }
            : undefined),
        // Default to tokenUri; this gets overwritten if tokenUri contains valid
        // metadata and has an image.
        imageUrl: imageUrl || tokenUri || undefined,
        metadata,
        name,
        description,
        chainId,
      }

      return info
    },
})

export const nftCardInfoSelector = selectorFamily<
  NftCardInfo,
  WithChainId<{ tokenId: string; collection: string }>
>({
  key: 'nftCardInfo',
  get:
    ({ tokenId, collection, chainId }) =>
    async ({ get }) => {
      const tokenInfo = get(
        CommonNftSelectors.nftInfoSelector({
          contractAddress: collection,
          chainId,
          params: [{ tokenId }],
        })
      )

      return get(
        nftCardInfoWithUriSelector({
          tokenId,
          collection,
          tokenUri: tokenInfo.token_uri,
          chainId,
        })
      )
    },
})

export const lazyNftCardInfosForDaoSelector = selectorFamily<
  // Map chain ID to DAO-owned NFTs on that chain.
  LoadingNfts<LazyNftCardInfo>,
  WithChainId<{
    coreAddress: string
    // If DAO is using the cw721-staking voting module adapter, it will have an
    // NFT governance collection. If this is the case, passing it here makes
    // sure we include the collection if it is not in the DAO's cw721 token
    // list.
    governanceCollectionAddress?: string
  }>
>({
  key: 'lazyNftCardInfosForDao',
  get:
    ({ chainId, coreAddress, governanceCollectionAddress }) =>
    async ({ get }) => {
      const allNfts = get(
        DaoCoreV2Selectors.allCw721CollectionsSelector({
          contractAddress: coreAddress,
          chainId,
          governanceCollectionAddress,
        })
      )

      return Object.entries(allNfts).reduce(
        (acc, [chainId, { owner, collectionAddresses }]) => {
          collectionAddresses = Array.from(new Set(collectionAddresses))

          // Get all token IDs owned by the DAO for each collection.
          const nftCollectionTokenIds = get(
            waitForNone(
              collectionAddresses.map((collectionAddress) =>
                CommonNftSelectors.allTokensForOwnerSelector({
                  contractAddress: collectionAddress,
                  chainId,
                  owner,
                })
              )
            )
          )

          // Get all lazy info for each collection.
          const lazyNftCardProps = collectionAddresses.flatMap(
            (collectionAddress, index) =>
              nftCollectionTokenIds[index].state === 'hasValue'
                ? (nftCollectionTokenIds[index].contents as string[]).map(
                    (tokenId): LazyNftCardInfo => ({
                      key: getNftKey(chainId, collectionAddress, tokenId),
                      chainId,
                      tokenId,
                      collectionAddress,
                      type: 'collection',
                    })
                  )
                : []
          )

          return {
            ...acc,
            [chainId]:
              nftCollectionTokenIds.length > 0 &&
              nftCollectionTokenIds.every(
                (loadable) => loadable.state === 'loading'
              )
                ? {
                    loading: true,
                    errored: false,
                  }
                : {
                    loading: false,
                    errored: false,
                    updating: nftCollectionTokenIds.some(
                      (loadable) => loadable.state === 'loading'
                    ),
                    data: lazyNftCardProps,
                  },
          }
        },
        {} as LoadingNfts<LazyNftCardInfo>
      )
    },
})

type CollectionWithTokens = {
  collectionAddress: string
  tokens: string[]
}

// Retrieve all NFTs for a given wallet address using the indexer, but don't
// load the NFT info.
export const walletLazyNftCardInfosSelector = selectorFamily<
  LoadingNfts<LazyNftCardInfo>,
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'walletLazyNftCardInfos',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(walletAddress))

      // Use Stargaze's API if we're on the Stargaze chain.
      if (
        chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet
      ) {
        return {
          [chainId]: {
            loading: false,
            errored: false,
            data: get(walletStargazeNftCardInfosSelector(walletAddress)),
          },
        }
      }

      const collections: CollectionWithTokens[] = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress,
          formula: 'nft/collections',
          id,
        })
      )
      if (!collections || !Array.isArray(collections)) {
        return {
          [chainId]: {
            loading: false,
            errored: false,
            data: [],
          },
        }
      }

      // Get all lazy info for each collection.
      const lazyNftCardInfos = collections.flatMap(
        ({ collectionAddress, tokens }) =>
          tokens.map(
            (tokenId): LazyNftCardInfo => ({
              key: getNftKey(chainId, collectionAddress, tokenId),
              chainId,
              tokenId,
              collectionAddress,
              type: 'collection',
            })
          )
      )

      return {
        [chainId]: {
          loading: false,
          errored: false,
          data: lazyNftCardInfos,
        },
      }
    },
})

// Retrieve all NFTs a given wallet address has staked with a DAO (via
// dao-voting-cw721-staked) using the indexer.
export const walletStakedLazyNftCardInfosSelector = selectorFamily<
  LazyNftCardInfo[],
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'walletStakedLazyNftCardInfos',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(walletAddress))

      const collections: CollectionWithTokens[] = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress,
          formula: 'nft/stakedWithDaos',
          id,
        })
      )
      if (!collections || !Array.isArray(collections)) {
        return []
      }

      // Get all lazy info for each collection.
      const lazyNftCardInfos = collections.flatMap(
        ({ collectionAddress, tokens }) =>
          tokens.map(
            (tokenId): LazyNftCardInfo => ({
              key: getNftKey(chainId, collectionAddress, tokenId),
              chainId,
              tokenId,
              collectionAddress,
              type: 'collection',
            })
          )
      )

      return lazyNftCardInfos.map((info) => ({
        ...info,
        staked: true,
      }))
    },
})

// Get owner of NFT, or staker if NFT is staked with the given staking contract.
export const nftStakerOrOwnerSelector = selectorFamily<
  {
    staked: boolean
    address: string
  },
  WithChainId<{
    collectionAddress: string
    tokenId: string
    stakingContractAddress?: string
  }>
>({
  key: 'nftStakerOrOwner',
  get:
    ({ collectionAddress, tokenId, stakingContractAddress, chainId }) =>
    async ({ get }) => {
      const { owner } = get(
        CommonNftSelectors.ownerOfSelector({
          contractAddress: collectionAddress,
          params: [{ tokenId }],
          chainId,
        })
      )

      const staker =
        stakingContractAddress && owner === stakingContractAddress
          ? get(
              stakerForNftSelector({
                contractAddress: stakingContractAddress,
                tokenId,
                chainId,
              })
            )
          : undefined

      return {
        staked: staker !== undefined,
        address: staker || owner,
      }
    },
})
