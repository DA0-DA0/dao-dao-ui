import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import {
  ONFT,
  Denom as OnftCollectionInfo,
} from '@dao-dao/types/protobuf/codegen/OmniFlix/onft/v1beta1/onft'
import { getAllRpcResponse, omniflixProtoRpcClientRouter } from '@dao-dao/utils'

/**
 * Fetch ONFT collection info.
 */
export const fetchOnftCollectionInfo = async ({
  chainId,
  id,
}: {
  chainId: string
  id: string
}): Promise<OnftCollectionInfo> => {
  const client = await omniflixProtoRpcClientRouter.connect(chainId)
  const { denom } = await client.onft.v1beta1.denom({
    denomId: id,
  })

  if (!denom) {
    throw new Error(`Collection not found for denom ${id}`)
  }

  return denom
}

/**
 * Fetch ONFT collection supply.
 */
export const fetchOnftCollectionSupply = async ({
  chainId,
  id,
  owner = '',
}: {
  chainId: string
  id: string
  /**
   * Optionally filter by owner, returning how many are owned by this address.
   */
  owner?: string
}): Promise<number> => {
  const client = await omniflixProtoRpcClientRouter.connect(chainId)
  const { amount } = await client.onft.v1beta1.supply({
    denomId: id,
    owner,
  })

  return Number(amount)
}

/**
 * Fetch paginated ONFTs.
 */
export const fetchPaginatedOnfts = async (
  queryClient: QueryClient,
  {
    chainId,
    id,
    page,
    pageSize,
  }: {
    chainId: string
    id: string
    page: number
    pageSize: number
  }
): Promise<ONFT[]> => {
  const client = await omniflixProtoRpcClientRouter.connect(chainId)
  const { collection } = await client.onft.v1beta1.collection({
    denomId: id,
    pagination: {
      key: new Uint8Array(),
      offset: BigInt((page - 1) * pageSize),
      limit: BigInt(pageSize),
      countTotal: false,
      reverse: false,
    },
  })

  if (!collection) {
    throw new Error(`Collection not found for denom ${id}`)
  }

  // Pre-cache loaded ONFTs.
  collection.onfts.forEach((onft: ONFT) => {
    queryClient.setQueryData(
      omniflixQueries.onft({
        chainId,
        collectionId: id,
        tokenId: onft.id,
      }).queryKey,
      onft
    )
  })

  return collection.onfts
}

/**
 * Fetch all ONFTs.
 */
export const fetchAllOnfts = async (
  queryClient: QueryClient,
  {
    chainId,
    id = '',
    owner,
  }: {
    chainId: string
    /**
     * Optionally filter by collection.
     */
    id?: string
    /**
     * Optionally filter by owner, returning only those owned by this address.
     */
    owner?: string
  }
): Promise<
  {
    collection: OnftCollectionInfo
    onfts: ONFT[]
  }[]
> => {
  const client = await omniflixProtoRpcClientRouter.connect(chainId)

  if (owner) {
    const collections = (
      await getAllRpcResponse(
        client.onft.v1beta1.ownerONFTs,
        {
          denomId: id,
          owner,
        },
        'owner'
      )
    ).flatMap((owner) => owner?.idCollections || [])

    return await Promise.all(
      collections.map(async ({ denomId, onftIds }) => ({
        collection: await queryClient.fetchQuery(
          omniflixQueries.onftCollectionInfo({
            chainId,
            id: denomId,
          })
        ),
        onfts: await Promise.all(
          onftIds.map((tokenId) =>
            queryClient.fetchQuery(
              omniflixQueries.onft({
                chainId,
                collectionId: denomId,
                tokenId,
              })
            )
          )
        ),
      }))
    )
  } else {
    const collections = (
      await getAllRpcResponse(
        client.onft.v1beta1.collection,
        {
          denomId: id,
        },
        'collection'
      )
    ).flatMap((collection) =>
      collection?.denom
        ? {
            collection: collection.denom,
            onfts: collection.onfts,
          }
        : []
    )

    // Pre-cache loaded collections and ONFTs.
    collections.forEach(({ collection, onfts }) => {
      queryClient.setQueryData(
        omniflixQueries.onftCollectionInfo({
          chainId,
          id: collection.id,
        }).queryKey,
        collection
      )
      onfts.forEach((onft) => {
        queryClient.setQueryData(
          omniflixQueries.onft({
            chainId,
            collectionId: collection.id,
            tokenId: onft.id,
          }).queryKey,
          onft
        )
      })
    })

    return collections
  }
}

/**
 * Fetch ONFT.
 */
export const fetchOnft = async ({
  chainId,
  collectionId,
  tokenId,
}: {
  chainId: string
  collectionId: string
  tokenId: string
}): Promise<ONFT> => {
  const client = await omniflixProtoRpcClientRouter.connect(chainId)
  const { onft } = await client.onft.v1beta1.oNFT({
    denomId: collectionId,
    id: tokenId,
  })

  if (!onft) {
    throw new Error(
      `ONFT not found for collection ${collectionId} and token ${tokenId}`
    )
  }

  return onft
}

export const omniflixQueries = {
  /**
   * Fetch ONFT collection info.
   */
  onftCollectionInfo: (
    options: Parameters<typeof fetchOnftCollectionInfo>[0]
  ) =>
    queryOptions({
      queryKey: ['omniflix', 'onftCollectionInfo', options],
      queryFn: () => fetchOnftCollectionInfo(options),
    }),
  /**
   * Fetch ONFT collection supply.
   */
  onftCollectionSupply: (
    /**
     * If undefined, returns loading state.
     */
    options?: Parameters<typeof fetchOnftCollectionSupply>[0]
  ) =>
    queryOptions({
      queryKey: ['omniflix', 'onftCollectionSupply', options],
      queryFn: options ? () => fetchOnftCollectionSupply(options) : skipToken,
    }),
  /**
   * Fetch paginated ONFTs.
   */
  paginatedOnfts: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchPaginatedOnfts>[1]
  ) =>
    queryOptions({
      queryKey: ['omniflix', 'paginatedOnfts', options],
      queryFn: () => fetchPaginatedOnfts(queryClient, options),
    }),
  /**
   * Fetch all ONFTs.
   */
  allOnfts: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchAllOnfts>[1]
  ) =>
    queryOptions({
      queryKey: ['omniflix', 'allOnfts', options],
      queryFn: () => fetchAllOnfts(queryClient, options),
    }),
  /**
   * Fetch ONFT.
   */
  onft: (options: Parameters<typeof fetchOnft>[0]) =>
    queryOptions({
      queryKey: ['omniflix', 'onft', options],
      queryFn: () => fetchOnft(options),
    }),
}
