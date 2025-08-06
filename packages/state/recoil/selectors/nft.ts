import { selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  ChainId,
  GenericToken,
  GraphqlTypes,
  LazyNftCardInfo,
  LoadingDataWithError,
  LoadingNfts,
  NftCardInfo,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  combineLoadingDataWithErrors,
  getNftKey,
  nftCardInfoFromStargazeIndexerNft,
} from '@dao-dao/utils'

import {
  stargazeIndexerClient,
  stargazeTokensForOwnerQuery,
} from '../../graphql'
import { omniflixQueries } from '../../query'
import {
  queryClientAtom,
  refreshWalletBalancesIdAtom,
  refreshWalletStargazeNftsAtom,
} from '../atoms'
import { CommonNftSelectors, DaoDaoCoreSelectors } from './contracts'
import { queryAccountIndexerSelector } from './indexer'
import { genericTokenSelector } from './token'

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
      const timestamp = new Date()

      get(refreshWalletStargazeNftsAtom(walletAddress))

      const allStargazeTokens: {
        tokenId: string
        name?: string | null
        description?: string | null
        collection: {
          contractAddress: string
          name?: string | null
        }
        highestOffer?: {
          offerPrice?: {
            amount?: number | null
            amountUsd?: number | null
            denom?: string | null
          } | null
        } | null
        media?: {
          url?: string | null
          visualAssets?: {
            lg?: { url?: string | null } | null
          } | null
        } | null
        saleType?: GraphqlTypes.SaleType | null
      }[] = []
      while (true) {
        const { error, data } = await stargazeIndexerClient.query({
          query: stargazeTokensForOwnerQuery,
          variables: {
            ownerAddrOrName: walletAddress,
            limit: STARGAZE_INDEXER_TOKENS_LIMIT,
            offset: allStargazeTokens.length,
          },
          // Don't cache since this recoil selector handles caching. If this
          // selector is re-evaluated, it should be re-fetched since an NFT may
          // have changed ownership.
          fetchPolicy: 'no-cache',
        })

        if (error) {
          throw error
        }

        if (!data.tokens?.tokens?.length) {
          break
        }

        allStargazeTokens.push(...data.tokens.tokens)

        if (
          data.tokens.pageInfo &&
          allStargazeTokens.length === data.tokens.pageInfo.total
        ) {
          break
        }
      }

      const genericTokens = get(
        waitForAll(
          allStargazeTokens.flatMap((token) =>
            token.highestOffer?.offerPrice?.denom
              ? genericTokenSelector({
                  chainId,
                  type: TokenType.Native,
                  denomOrAddress: token.highestOffer!.offerPrice!.denom!,
                })
              : []
          )
        )
      )

      const genericTokensMap: Map<string, GenericToken> = new Map(
        genericTokens.map((item) => [item.denomOrAddress, item])
      )

      return allStargazeTokens.map((token) =>
        nftCardInfoFromStargazeIndexerNft(
          chainId,
          token,
          token.highestOffer?.offerPrice?.denom
            ? genericTokensMap.get(token.highestOffer.offerPrice.denom)
            : undefined,
          timestamp
        )
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
        DaoDaoCoreSelectors.allCw721CollectionsSelector({
          contractAddress: coreAddress,
          chainId,
          governanceCollectionAddress,
        })
      )

      const queryClient = get(queryClientAtom)
      const allOnfts =
        chainId === ChainId.OmniflixHubMainnet ||
        chainId === ChainId.OmniflixHubTestnet
          ? await queryClient.fetchQuery(
              omniflixQueries.allOnfts({
                chainId,
                owner: coreAddress,
              })
            )
          : []

      const startingAllNfts: LoadingNfts<LazyNftCardInfo> = allOnfts.length
        ? {
            [chainId]: {
              loading: false,
              errored: false,
              updating: false,
              data: allOnfts.flatMap(({ collection, onfts }) =>
                onfts.map(
                  (onft): LazyNftCardInfo => ({
                    key: getNftKey(chainId, collection.id, onft.id),
                    chainId,
                    tokenId: onft.id,
                    collectionAddress: collection.id,
                  })
                )
              ),
            },
          }
        : {}

      return Object.entries(allNfts).reduce(
        (acc, [chainId, { owners, collectionAddresses }]) => {
          collectionAddresses = Array.from(new Set(collectionAddresses))

          // Get all token IDs owned by the DAO for each collection.
          const nftCollectionTokenIds = get(
            waitForNone(
              collectionAddresses.flatMap((collectionAddress) =>
                owners.map((owner) =>
                  CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
                    contractAddress: collectionAddress,
                    chainId,
                    owner,
                  })
                )
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

          const newChainLoadingNfts: LoadingDataWithError<LazyNftCardInfo[]> =
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
                }

          const existingChainLoadingNfts = acc[chainId] ? [acc[chainId]!] : []

          const loadingNfts = combineLoadingDataWithErrors(
            newChainLoadingNfts,
            ...existingChainLoadingNfts
          )

          return {
            ...acc,
            [chainId]: loadingNfts,
          }
        },
        startingAllNfts
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
        queryAccountIndexerSelector({
          chainId,
          walletAddress,
          formula: 'nft/collections',
          id,
          noFallback: true,
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
        queryAccountIndexerSelector({
          chainId,
          walletAddress,
          formula: 'nft/stakedWithDaos',
          id,
          noFallback: true,
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
