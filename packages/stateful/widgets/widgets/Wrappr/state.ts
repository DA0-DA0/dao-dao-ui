import { constSelector, selectorFamily, waitForAll } from 'recoil'

import { CommonNftSelectors, nftUriDataSelector } from '@dao-dao/state/recoil'
import { WithChainId } from '@dao-dao/types'

import { Wrappr, WrapprVersion } from './types'

export const wrapprsSelector = selectorFamily<
Wrappr[],
  WithChainId<{ contractAddress: string }>
>({
  key: 'wrapprTokens',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const tokenIds = get(
        // TODO: query via GMP 
        CommonNftSelectors.allTokensSelector({
          contractAddress,
          chainId,
        })
      )

      const tokenInfos = get(
        // TODO: query via GMP 
        waitForAll(
          tokenIds.map((tokenId) =>
            CommonNftSelectors.nftInfoSelector({
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

      const wrapprs = get(
          // TODO: query via GMP 
        waitForAll(
          tokenInfos.map((tokenInfo, index) =>
            tokenInfo.token_uri
              ? wrapprSelector({
                  id: tokenIds[index],
                  metadataUri: tokenInfo.token_uri,
                })
              : constSelector(undefined)
          )
        )
      )

      return wrapprs.filter((wrappr): wrappr is Wrappr => !!wrappr)
    },
})

export const wrapprSelector = selectorFamily<
  Wrappr | undefined,
  { id: string; metadataUri: string }
>({
  key: 'WrapprToken',
  get:
    ({ id, metadataUri }) =>
    ({ get }) => {
      const data = get(nftUriDataSelector(metadataUri))
      if (!data || !('properties' in data)) {
        return
      }

      const created = new Date(data.properties.created)
      const pastVersions: WrapprVersion[] = (
        data.properties.pastVersions || []
      ).map(
        ({
          created,
          ...version
        }: {
          id: string
          created: string
        }): WrapprVersion => ({
          ...version,
          created: new Date(created),
        })
      )

      return {
        id,
        title: data.name || id,
        description: data.description,
        entity: data.entity,
        jurisdiction: data.jurisdiction,
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
