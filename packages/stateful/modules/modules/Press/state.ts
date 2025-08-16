import { queryOptions } from '@tanstack/react-query'

import { cw721BaseQueries, nftQueries } from '@dao-dao/state/query'
import { IQueryClient } from '@dao-dao/types'

import { Post, PostVersion } from './types'

/**
 * Fetch press posts.
 */
export const fetchPressPosts = async (
  queryClient: IQueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<Post[]> => {
  const tokenIds = await queryClient.fetchQuery(
    nftQueries.unpaginatedAllTokenIds({
      address,
      chainId,
    })
  )

  const tokenInfos = await Promise.all(
    tokenIds.map((tokenId) =>
      queryClient.fetchQuery(
        cw721BaseQueries.nftInfo({
          chainId,
          contractAddress: address,
          args: {
            tokenId,
          },
        })
      )
    )
  )

  const posts = await Promise.all(
    tokenInfos.map((tokenInfo, index) =>
      tokenInfo.token_uri
        ? queryClient.fetchQuery(
            pressQueries.post({
              id: tokenIds[index],
              metadataUri: tokenInfo.token_uri,
            })
          )
        : undefined
    )
  )

  return posts.filter((post): post is Post => !!post)
}

/**
 * Fetch a single press post.
 */
export const fetchPressPost = async (
  queryClient: IQueryClient,
  { id, metadataUri }: { id: string; metadataUri: string }
): Promise<Post> => {
  const data = await queryClient
    .fetchQuery(nftQueries.metadataFromUri({ tokenUri: metadataUri }))
    .catch(() => undefined)
  if (!data || !('properties' in data)) {
    throw new Error('Invalid token info')
  }

  const created = new Date(data.properties.created)
  const pastVersions: PostVersion[] = (data.properties.pastVersions || []).map(
    ({
      created,
      ...version
    }: {
      id: string
      created: string
    }): PostVersion => ({
      ...version,
      created: new Date(created),
    })
  )

  return {
    id,
    title: data.name || id,
    description: data.description,
    content: data.properties.content,
    // Use `image` field directly since we want it to use IPFS protocol.
    // `data.imageUrl` is processed into `https`, so don't use it.
    image: data.image,
    created,
    pastVersions,
    initiallyCreated:
      pastVersions.length > 0 ? pastVersions[0].created : created,
  }
}

export const pressQueries = {
  /**
   * Fetch press posts.
   */
  posts: (options: Parameters<typeof fetchPressPosts>[1]) =>
    queryOptions({
      queryKey: ['press', 'posts', options],
      queryFn: (ctx) => fetchPressPosts(ctx.client, options),
    }),
  /**
   * Fetch a single press post.
   */
  post: (options: Parameters<typeof fetchPressPost>[1]) =>
    queryOptions({
      queryKey: ['press', 'post', options],
      queryFn: (ctx) => fetchPressPost(ctx.client, options),
    }),
}
