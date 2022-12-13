import { ChainInfoID } from '@noahsaso/cosmodal'
import { selectorFamily } from 'recoil'

import { NativeStargazeCollectionInfo, WithChainId } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary } from '@dao-dao/utils'

import { Cw721BaseSelectors } from './contracts'

export const nftTokenUriDataSelector = selectorFamily({
  key: 'nftTokenUriData',
  get: (tokenUri: string) => async () => {
    try {
      // Transform IPFS url if necessary.
      const response = await fetch(transformIpfsUrlToHttpsIfNecessary(tokenUri))
      return await response.text()
    } catch (err) {
      console.error(err)
    }
  },
})

export const nativeAndStargazeCollectionInfoSelector = selectorFamily<
  NativeStargazeCollectionInfo,
  WithChainId<{ nativeCollectionAddress: string }>
>({
  key: 'nativeAndStargazeCollectionInfo',
  get:
    ({ nativeCollectionAddress, chainId }) =>
    ({ get }) => {
      const nativeCollectionInfo = get(
        Cw721BaseSelectors.contractInfoSelector({
          contractAddress: nativeCollectionAddress,
          chainId,
          params: [],
        })
      )

      // TODO(ICS721): Identify IBC'd Stargaze NFT collections better.
      const stargazeCollectionAddress = nativeCollectionInfo.name.startsWith(
        'wasm.'
      )
        ? nativeCollectionInfo.name.split('/').pop()
        : undefined
      const stargazeCollectionInfo = stargazeCollectionAddress
        ? get(
            Cw721BaseSelectors.contractInfoSelector({
              contractAddress: stargazeCollectionAddress,
              chainId: ChainInfoID.Stargaze1,
              params: [],
            })
          )
        : undefined

      return {
        native: {
          address: nativeCollectionAddress,
          info: nativeCollectionInfo,
        },
        stargaze:
          stargazeCollectionAddress && stargazeCollectionInfo
            ? {
                address: stargazeCollectionAddress,
                info: stargazeCollectionInfo,
              }
            : undefined,
      }
    },
})
