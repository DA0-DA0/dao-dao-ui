import {
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  Cw721BaseSelectors,
  CwdCoreV2Selectors,
  nativeAndStargazeCollectionInfoSelector,
  nftTokenUriDataSelector,
  refreshWalletStargazeNftsAtom,
} from '@dao-dao/state'
import { NftCardInfo, WithChainId } from '@dao-dao/types'
import { NftInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { NativeStargazeCollectionInfo, StargazeNft } from '@dao-dao/types/nft'
import {
  STARGAZE_PROFILE_API_TEMPLATE,
  STARGAZE_URL_BASE,
  getNftName,
  parseNftUriResponse,
} from '@dao-dao/utils'

export const walletStargazeNftCardInfosSelector = selectorFamily<
  NftCardInfo[],
  string
>({
  key: 'walletStargazeNftCardInfos',
  get:
    (walletAddress: string) =>
    async ({ get }) => {
      get(refreshWalletStargazeNftsAtom(walletAddress))

      const stargazeNfts: StargazeNft[] = await (
        await fetch(
          STARGAZE_PROFILE_API_TEMPLATE.replace('ADDRESS', walletAddress)
        )
      ).json()

      if (!Array.isArray(stargazeNfts)) {
        return []
      }

      const nftCardInfos = stargazeNfts.map(
        ({ collection, tokenId, image, name }): NftCardInfo => ({
          collection: {
            address: collection.contractAddress,
            name: collection.name,
          },
          tokenId,
          externalLink: {
            href: `${STARGAZE_URL_BASE}/media/${collection.contractAddress}/${tokenId}`,
            name: 'Stargaze',
          },
          imageUrl: image,
          // floorPrice: {
          //   amount: 0,
          //   denom: '',
          // }
          name: getNftName(collection.name, name || tokenId),
        })
      )

      return nftCardInfos
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
      const { native, stargaze } = get(
        nativeAndStargazeCollectionInfoSelector({
          nativeCollectionAddress: collection,
          chainId,
        })
      )
      const tokenInfo = get(
        Cw721BaseSelectors.nftInfoSelector({
          contractAddress: collection,
          chainId,
          params: [{ tokenId }],
        })
      )
      const tokenData = get(
        tokenInfo.token_uri
          ? nftTokenUriDataSelector(tokenInfo.token_uri)
          : constSelector(undefined)
      )

      const info: NftCardInfo = {
        collection: {
          address: stargaze?.address ?? native.address,
          name: stargaze?.info.name ?? native.info.name,
        },
        tokenId,
        externalLink: stargaze?.address.startsWith('stars')
          ? {
              href: `${STARGAZE_URL_BASE}/media/${stargaze.address}/${tokenId}`,
              name: 'Stargaze',
            }
          : undefined,
        imageUrl: tokenInfo.token_uri ?? '',
        name: '',
      }

      const { name, imageUrl, externalLink } = parseNftUriResponse(
        tokenData || '',
        info.collection.name
      )
      info.name = name || info.name
      info.imageUrl = imageUrl || info.imageUrl
      info.externalLink = externalLink || info.externalLink

      return info
    },
})

export const nftCardInfosSelector = selectorFamily<
  NftCardInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'nftCardInfos',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const nftCollectionAddresses = get(
        CwdCoreV2Selectors.allCw721TokenListSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      // Ignore errors by waiting for all to settle, and then ignoring any that
      // do not have a value.
      const nftCollectionInfos = get(
        waitForAllSettled(
          nftCollectionAddresses.map((collectionAddress) =>
            nativeAndStargazeCollectionInfoSelector({
              nativeCollectionAddress: collectionAddress,
              chainId,
            })
          )
        )
      )

      const nftCollectionTokenIds = get(
        waitForAll(
          nftCollectionAddresses.map((collectionAddress) =>
            Cw721BaseSelectors.allTokensForOwnerSelector({
              contractAddress: collectionAddress,
              chainId,
              owner: coreAddress,
            })
          )
        )
      )

      const collectionsWithTokens = nftCollectionInfos
        .map((collectionInfoLoadable, index) => {
          // Don't filter undefined infos out until inside this map so we can
          // use the index to zip with token IDs.

          if (collectionInfoLoadable.state !== 'hasValue') {
            return
          }

          const tokenIds = nftCollectionTokenIds[index]

          const infos = get(
            waitForAll(
              tokenIds.map((tokenId) =>
                Cw721BaseSelectors.nftInfoSelector({
                  contractAddress:
                    collectionInfoLoadable.contents.native.address,
                  chainId,
                  params: [{ tokenId }],
                })
              )
            )
          )

          const uriDataResponses = get(
            waitForAll(
              infos.map(({ token_uri } = { token_uri: undefined }) =>
                token_uri
                  ? nftTokenUriDataSelector(token_uri)
                  : constSelector(undefined)
              )
            )
          )

          return {
            collectionInfo: collectionInfoLoadable.contents,
            tokens: tokenIds
              .map((tokenId, index) => ({
                tokenId,
                info: infos[index],
                uriDataResponse: uriDataResponses[index],
              }))
              .filter(
                ({ info, uriDataResponse }) => !!info && !!uriDataResponse
              ) as {
              tokenId: string
              info: NftInfoResponse
              uriDataResponse: string
            }[],
          }
        })
        .filter(Boolean) as {
        collectionInfo: NativeStargazeCollectionInfo
        tokens: {
          tokenId: string
          info: NftInfoResponse
          uriDataResponse: string
        }[]
      }[]

      const infos: NftCardInfo[] = collectionsWithTokens
        .flatMap(
          ({
            collectionInfo: { native: nativeInfo, stargaze: stargazeInfo },
            tokens,
          }) =>
            tokens.map(
              ({
                tokenId,
                info: nftInfo,
                uriDataResponse,
              }): NftCardInfo | undefined => {
                const info: NftCardInfo = {
                  collection: {
                    address: stargazeInfo?.address ?? nativeInfo.address,
                    name: stargazeInfo?.info.name ?? nativeInfo.info.name,
                  },
                  tokenId,
                  externalLink: stargazeInfo?.address.startsWith('stars')
                    ? {
                        href: `${STARGAZE_URL_BASE}/media/${stargazeInfo.address}/${tokenId}`,
                        name: 'Stargaze',
                      }
                    : undefined,
                  imageUrl: nftInfo.token_uri ?? '',
                  // floorPrice?: {
                  //   amount: number
                  //   denom: string
                  // }
                  name: '',
                }

                const { name, imageUrl, externalLink } = parseNftUriResponse(
                  uriDataResponse,
                  info.collection.name
                )
                info.name = name || info.name
                info.imageUrl = imageUrl || info.imageUrl
                info.externalLink = externalLink || info.externalLink

                return info
              }
            )
        )
        .filter(Boolean) as NftCardInfo[]

      return infos
    },
})
