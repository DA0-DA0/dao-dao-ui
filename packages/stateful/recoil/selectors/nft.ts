import { selectorFamily, waitForNone } from 'recoil'

import {
  CommonNftSelectors,
  DaoCoreV2Selectors,
  nftUriDataSelector,
  queryWalletIndexerSelector,
  refreshWalletBalancesIdAtom,
  refreshWalletStargazeNftsAtom,
  stargazeIndexerClient,
  stargazeTokenQuery,
  stargazeTokensForOwnerQuery,
} from '@dao-dao/state'
import { stakerForNftSelector } from '@dao-dao/state/recoil/selectors/contracts/DaoVotingCw721Staked'
import { ChainId, NftCardInfo, WithChainId } from '@dao-dao/types'
import { LazyNftCardInfo, LoadingNfts } from '@dao-dao/types/nft'
import {
  MAINNET,
  STARGAZE_URL_BASE,
  getNftKey,
  nftCardInfoFromStargazeIndexerNft,
  transformBech32Address,
} from '@dao-dao/utils'

const STARGAZE_INDEXER_TOKENS_LIMIT = 100
export const walletStargazeNftCardInfosSelector = selectorFamily<
  NftCardInfo[],
  string
>({
  key: 'walletStargazeNftCardInfos',
  get:
    (walletAddress: string) =>
    async ({ get }) => {
      const chainId = MAINNET
        ? ChainId.StargazeMainnet
        : ChainId.StargazeTestnet

      const stargazeWalletAddress = transformBech32Address(
        walletAddress,
        chainId
      )

      get(refreshWalletStargazeNftsAtom(stargazeWalletAddress))

      const nftCardInfos: NftCardInfo[] = []

      while (true) {
        const { error, data } = await stargazeIndexerClient.query({
          query: stargazeTokensForOwnerQuery,
          variables: {
            ownerAddrOrName: stargazeWalletAddress,
            limit: STARGAZE_INDEXER_TOKENS_LIMIT,
            offset: nftCardInfos.length,
          },
          // Don't cache since this recoil selector handles caching. If this
          // selector is re-evaluated, it should be re-fetched since an NFT may
          // have changed ownership.
          fetchPolicy: 'no-cache',
        })
        const timestamp = new Date()

        if (error) {
          throw error
        }

        if (!data.tokens?.pageInfo) {
          break
        }

        nftCardInfos.push(
          ...data.tokens.tokens.map((token) =>
            nftCardInfoFromStargazeIndexerNft(chainId, token, timestamp)
          )
        )

        if (nftCardInfos.length === data.tokens.pageInfo.total) {
          break
        }
      }

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
          (chainId === ChainId.StargazeMainnet ||
          chainId === ChainId.StargazeTestnet
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
      // Use Stargaze indexer when possible.
      if (
        chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet
      ) {
        const { error, data } = await stargazeIndexerClient.query({
          query: stargazeTokenQuery,
          variables: {
            collectionAddr: collection,
            tokenId,
          },
        })

        if (error) {
          throw error
        }

        if (!data.token) {
          throw new Error('Failed to load NFT from Stargaze')
        }

        return nftCardInfoFromStargazeIndexerNft(chainId, data.token)
      }

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
                CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
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
