import { selectorFamily, waitForAll, waitForNone } from 'recoil'

import {
  ChainId,
  GenericToken,
  LazyNftCardInfo,
  LoadingDataWithError,
  LoadingNfts,
  NftCardInfo,
  NftUriData,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  STARGAZE_URL_BASE,
  combineLoadingDataWithErrors,
  getNftKey,
  nftCardInfoFromStargazeIndexerNft,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import {
  stargazeIndexerClient,
  stargazeTokenQuery,
  stargazeTokensForOwnerQuery,
} from '../../graphql'
import { omniflixQueries } from '../../query'
import {
  queryClientAtom,
  refreshWalletBalancesIdAtom,
  refreshWalletStargazeNftsAtom,
} from '../atoms'
import { accountsSelector } from './account'
import { CommonNftSelectors, DaoDaoCoreSelectors } from './contracts'
import { queryAccountIndexerSelector } from './indexer'
import { stargazeWalletUsdValueSelector } from './stargaze'
import { genericTokenSelector } from './token'

// Tries to parse [EIP-721] metadata out of an NFT's metadata JSON.
//
// [EIP-721]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
export const nftUriDataSelector = selectorFamily<
  NftUriData | undefined,
  string
>({
  key: 'nftUriData',
  get: (tokenUri) => async () => {
    try {
      // Transform IPFS url if necessary.
      let response = await fetch(transformIpfsUrlToHttpsIfNecessary(tokenUri))

      if (!response.ok) {
        // Sometimes `tokenUri` is missing a `.json` extension, so try again on
        // failure in that case.
        if (!tokenUri.endsWith('.json')) {
          response = await fetch(
            transformIpfsUrlToHttpsIfNecessary(tokenUri + '.json')
          )
        }

        if (!response.ok) {
          return
        }
      }

      const data = await response.json()

      let name
      let description
      let imageUrl
      let externalLink

      if (typeof data.name === 'string' && !!data.name.trim()) {
        name = data.name
      }

      if (typeof data.description === 'string' && !!data.description.trim()) {
        description = data.description
      }

      if (typeof data.image === 'string' && !!data.image) {
        imageUrl = transformIpfsUrlToHttpsIfNecessary(data.image)
      }

      if (typeof data.external_url === 'string' && !!data.external_url.trim()) {
        const externalUrl = transformIpfsUrlToHttpsIfNecessary(
          data.external_url
        )
        const externalUrlDomain = new URL(externalUrl).hostname
        externalLink = {
          href: externalUrl,
          name: HostnameMap[externalUrlDomain] ?? externalUrlDomain,
        }
      }

      return {
        // Include all metadata.
        ...data,

        // Override specifics.
        name,
        description,
        imageUrl,
        externalLink,
      }
    } catch (err) {
      console.error(err)
    }
  },
})

export const allNftUsdValueSelector = selectorFamily<
  number,
  WithChainId<{ address: string }>
>({
  key: 'nftAllNftUsdValue',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const accounts = get(accountsSelector({ chainId, address }))
      const sum = get(
        waitForAll(
          accounts
            .filter(
              ({ chainId }) =>
                chainId === ChainId.StargazeMainnet ||
                chainId === ChainId.StargazeTestnet
            )
            .map(({ chainId, address }) =>
              stargazeWalletUsdValueSelector({
                chainId,
                address,
              })
            )
        )
      ).reduce((acc, x) => acc + x, 0)
      return sum
    },
})

// Maps domain -> human readable name. If a domain is in this set, NFTs
// associated with it will have their external links displayed using the human
// readable name provided here.
const HostnameMap: Record<string, string | undefined> = {
  'stargaze.zone': 'Stargaze',
}

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

// TODO(omniflix): move this to react-query and load ONFT JSON metadata URI
export const nftCardInfoSelector = selectorFamily<
  NftCardInfo,
  WithChainId<{ tokenId: string; collection: string }>
>({
  key: 'nftCardInfo',
  get:
    ({ tokenId, collection, chainId }) =>
    async ({ get }) => {
      // Use Stargaze indexer when possible. Fallback to contract query.
      if (
        chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet
      ) {
        let data
        try {
          data = (
            await stargazeIndexerClient.query({
              query: stargazeTokenQuery,
              variables: {
                collectionAddr: collection,
                tokenId,
              },
            })
          ).data
        } catch (err) {
          console.error(err)
        }

        if (data?.token) {
          const genericToken = data.token?.highestOffer?.offerPrice?.denom
            ? get(
                genericTokenSelector({
                  chainId,
                  type: TokenType.Native,
                  denomOrAddress: data.token.highestOffer.offerPrice.denom,
                })
              )
            : undefined

          return nftCardInfoFromStargazeIndexerNft(
            chainId,
            data.token,
            genericToken
          )
        }
      }

      if (
        chainId === ChainId.OmniflixHubMainnet ||
        chainId === ChainId.OmniflixHubTestnet
      ) {
        const queryClient = get(queryClientAtom)

        const [collectionInfo, onft] = await Promise.all([
          queryClient.fetchQuery(
            omniflixQueries.onftCollectionInfo({
              chainId,
              id: collection,
            })
          ),
          queryClient.fetchQuery(
            omniflixQueries.onft({
              chainId,
              collectionId: collection,
              tokenId,
            })
          ),
        ])

        return {
          chainId,
          key: getNftKey(chainId, collection, tokenId),
          collectionAddress: collection,
          collectionName: collectionInfo.name,
          tokenId,
          owner: onft.owner,
          externalLink: {
            href: `https://omniflix.market/c/${collection}/${tokenId}`,
            name: 'OmniFlix',
          },
          imageUrl: onft.metadata?.mediaUri,
          name: onft.metadata?.name || tokenId,
          description: onft.metadata?.description,
        }
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
              omniflixQueries.allOnfts(queryClient, {
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

          const existingChainLoadingNfts = acc[chainId] ? [acc[chainId]] : []

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
