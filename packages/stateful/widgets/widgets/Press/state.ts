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
            content: data.properties.content,
            headerImage: data.imageUrl,
            lastUpdated: new Date(data.properties.created),
          }
        : undefined
    },
})
