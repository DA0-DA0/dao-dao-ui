import { constSelector, selectorFamily, waitForAll } from 'recoil'

import { Cw721BaseSelectors, nftUriDataSelector } from '@dao-dao/state/recoil'
import { WithChainId } from '@dao-dao/types'

import { Post, PostVersion } from './types'

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
      if (!data || !('properties' in data)) {
        return
      }

      const created = new Date(data.properties.created)
      const pastVersions: PostVersion[] = (
        data.properties.pastVersions || []
      ).map(
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
    },
})
