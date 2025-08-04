import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ChainId, NftCardInfo, NftUriData, TokenType } from '@dao-dao/types'
import {
  STARGAZE_URL_BASE,
  getNftKey,
  nftCardInfoFromStargazeIndexerNft,
  parseNftMetadata,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import { stargazeIndexerClient, stargazeTokenQuery } from '../../graphql'
import {
  cw721BaseQueries,
  daoVotingCw721StakedExtraQueries,
  daoVotingOnftStakedExtraQueries,
} from './contracts'
import { omniflixQueries } from './omniflix'
import { tokenQueries } from './token'

/**
 * Fetch owner of NFT, or staked if NFT is staked with the given staking
 * contract (probably a DAO voting module.)
 */
export const fetchNftOwnerOrStaker = async (
  queryClient: QueryClient,
  {
    chainId,
    collection,
    tokenId,
    stakingContractAddress,
  }: {
    chainId: string
    collection: string
    tokenId: string
    /**
     * If defined, will resolve the NFT's staker if it is currently staked with
     * this staking contract address.
     */
    stakingContractAddress?: string
  }
): Promise<{
  address: string
  /**
   * If true, the address is staking with the given staking contract. If false,
   * the address is the owner of the NFT.
   */
  staked: boolean
}> => {
  const isOmniFlix =
    chainId === ChainId.OmniflixHubMainnet ||
    chainId === ChainId.OmniflixHubTestnet

  const owner = isOmniFlix
    ? (
        await queryClient.fetchQuery(
          omniflixQueries.onft({
            chainId,
            collectionId: collection,
            tokenId,
          })
        )
      ).owner
    : (
        await queryClient.fetchQuery(
          cw721BaseQueries.ownerOf({
            chainId,
            contractAddress: collection,
            args: {
              tokenId,
            },
          })
        )
      ).owner

  const staker =
    stakingContractAddress && owner === stakingContractAddress
      ? await queryClient.fetchQuery(
          isOmniFlix
            ? daoVotingOnftStakedExtraQueries.staker({
                chainId,
                address: stakingContractAddress,
                tokenId,
              })
            : daoVotingCw721StakedExtraQueries.staker({
                chainId,
                address: stakingContractAddress,
                tokenId,
              })
        )
      : null

  return {
    address: staker || owner,
    staked: !!staker,
  }
}

/**
 * Fetch NFT card info.
 */
export const fetchNftCardInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    collection,
    tokenId,
  }: {
    chainId: string
    collection: string
    tokenId: string
  }
): Promise<NftCardInfo> => {
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
        ? await queryClient.fetchQuery(
            tokenQueries.info({
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

  const tokenInfo = await queryClient.fetchQuery(
    cw721BaseQueries.nftInfo({
      chainId,
      contractAddress: collection,
      args: {
        tokenId,
      },
    })
  )

  return await queryClient.fetchQuery(
    nftQueries.cardInfoMaybeFromUri({
      chainId,
      collection,
      tokenId,
      tokenUri: tokenInfo.token_uri,
    })
  )
}

/**
 * Fetch NFT card info, maybe with its token URI.
 */
export const fetchNftCardInfoMaybeFromUri = async (
  queryClient: QueryClient,
  {
    chainId,
    collection,
    tokenId,
    tokenUri,
  }: {
    chainId: string
    collection: string
    tokenId: string
    tokenUri?: string | null | undefined
  }
): Promise<NftCardInfo> => {
  const collectionInfo = await queryClient.fetchQuery(
    cw721BaseQueries.contractInfo({
      chainId,
      contractAddress: collection,
    })
  )

  let metadata =
    (tokenUri &&
      (await queryClient
        .fetchQuery(nftQueries.metadataFromUri({ tokenUri }))
        .catch(() => undefined))) ||
    undefined

  // If metadata not loaded from token URI (or token URI not set), try to load
  // from extension.
  if (!metadata) {
    const { extension } = await queryClient.fetchQuery(
      cw721BaseQueries.nftInfo({
        chainId,
        contractAddress: collection,
        args: {
          tokenId,
        },
      })
    )
    if (extension && typeof extension === 'object') {
      metadata = parseNftMetadata(extension as any)
    }
  }

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
}

/**
 * Parse NFT metadata from a token URI.
 *
 * Tries to parse [EIP-721] metadata out of an NFT's metadata JSON.
 *
 * [EIP-721]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
export const fetchNftMetadataFromUri = async ({
  tokenUri,
}: {
  tokenUri: string
}): Promise<NftUriData> => {
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
      throw new Error(
        `Failed to fetch NFT metadata: [${response.status} ${
          response.statusText
        }] ${await response.text().catch(() => '')}`.trim()
      )
    }
  }

  const metadata = await response.json()
  return parseNftMetadata(metadata)
}

export const nftQueries = {
  /**
   * Fetch owner of NFT, or staked if NFT is staked with the given staking
   * contract (probably a DAO voting module.)
   */
  ownerOrStaker: (options: Parameters<typeof fetchNftOwnerOrStaker>[1]) =>
    queryOptions({
      queryKey: ['nft', 'ownerOrStaker', options],
      queryFn: (ctx) => fetchNftOwnerOrStaker(ctx.client, options),
    }),
  /**
   * Fetch NFT card info.
   */
  cardInfo: (options: Parameters<typeof fetchNftCardInfo>[1]) =>
    queryOptions({
      queryKey: ['nft', 'cardInfo', options],
      queryFn: (ctx) => fetchNftCardInfo(ctx.client, options),
    }),
  /**
   * Fetch NFT card info, maybe with a token URI.
   */
  cardInfoMaybeFromUri: (
    options: Parameters<typeof fetchNftCardInfoMaybeFromUri>[1]
  ) =>
    queryOptions({
      queryKey: ['nft', 'cardInfoMaybeFromUri', options],
      queryFn: (ctx) => fetchNftCardInfoMaybeFromUri(ctx.client, options),
    }),
  /**
   * Fetch NFT metadata from a token URI.
   */
  metadataFromUri: (options: Parameters<typeof fetchNftMetadataFromUri>[0]) =>
    queryOptions({
      queryKey: ['nft', 'metadataFromUri', options],
      queryFn: () => fetchNftMetadataFromUri(options),
    }),
}
