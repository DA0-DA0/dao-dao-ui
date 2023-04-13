import { constSelector, selectorFamily, waitForAll } from 'recoil'

import { Cw721BaseSelectors, nftUriDataSelector } from '@dao-dao/state/recoil'
import { WithChainId } from '@dao-dao/types'

import { Post } from './types'

export const postsSelector = selectorFamily<
  Post[],
  WithChainId<{ contractAddress: string }>
>({
  key: 'pressPosts',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const tokenIds = get(
        Cw721BaseSelectors.allTokensSelector({
          contractAddress,
          chainId,
        })
      )

      const tokenInfos = get(
        waitForAll(
          tokenIds.map((tokenId) =>
            Cw721BaseSelectors.nftInfoSelector({
              contractAddress,
              chainId,
              params: [
                {
                  tokenId,
                },
              ],
            })
          )
        )
      )

      const posts = get(
        waitForAll(
          tokenInfos.map((tokenInfo, index) =>
            tokenInfo.token_uri
              ? postSelector({
                  id: tokenIds[index],
                  metadataUri: tokenInfo.token_uri,
                })
              : constSelector(undefined)
          )
        )
      )

      return posts.filter((post): post is Post => !!post)
    },
})

export const postSelector = selectorFamily<
  Post | undefined,
  { id: string; metadataUri: string }
>({
  key: 'pressPost',
  get:
    ({ id, metadataUri }) =>
    ({ get }) => {
      const data = get(nftUriDataSelector(metadataUri))

      return data &&
        'properties' in data &&
        'content' in data.properties &&
        'created' in data.properties &&
        data.properties.created
        ? {
            id,
            title: data.name || id,
            description: data.description,
            content: data.properties.content,
            // Use `image` field directly since it should be in IPFS format.
            // `imageUrl` is processed into `https`.
            headerImage: data.image,
            created: new Date(data.properties.created),
            order: data.properties.order,
            pastVersions: data.properties.pastVersions || [],
          }
        : undefined
    },
})
