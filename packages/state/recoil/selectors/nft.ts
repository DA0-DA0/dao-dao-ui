import { selectorFamily } from 'recoil'

import { NftCardInfo } from '@dao-dao/tstypes'
import { StargazeNft } from '@dao-dao/tstypes/nft'
import {
  STARGAZE_PROFILE_API_TEMPLATE,
  STARGAZE_URL_BASE,
  getNftName,
} from '@dao-dao/utils'

import { refreshWalletStargazeNftsAtom } from '../atoms/refresh'

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
          name: getNftName(collection.name, name),
        })
      )

      return nftCardInfos
    },
})
