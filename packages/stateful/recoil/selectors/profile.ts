import { selectorFamily } from 'recoil'

import { refreshWalletProfileAtom } from '@dao-dao/state/recoil'
import { PfpkWalletProfile, WalletProfile } from '@dao-dao/types'
import { PFPK_API_BASE, processError } from '@dao-dao/utils'

import { nftCardInfoSelector } from './nft'

export const pfpkProfileSelector = selectorFamily<WalletProfile, string>({
  key: 'pfpkProfile',
  get:
    (publicKey) =>
    async ({ get }) => {
      get(refreshWalletProfileAtom(publicKey))

      let profile: WalletProfile = {
        // Disallows editing if we don't have correct nonce from server.
        nonce: -1,
        name: null,
        imageUrl: '',
        nft: null,
      }

      // Load profile from PFPK API.
      let response
      try {
        response = await fetch(PFPK_API_BASE + `/${publicKey}`)
        if (response.ok) {
          const pfpkProfile: PfpkWalletProfile = await response.json()
          profile.nonce = pfpkProfile.nonce
          profile.name = pfpkProfile.name
          profile.nft = pfpkProfile.nft

          // Get NFT info from data to extract image.
          if (pfpkProfile.nft) {
            const nftInfo = get(
              nftCardInfoSelector({
                collection: pfpkProfile.nft.collectionAddress,
                tokenId: pfpkProfile.nft.tokenId,
                chainId: pfpkProfile.nft.chainId,
              })
            )

            // Set `imageUrl` if NFT present.
            if (nftInfo?.imageUrl) {
              profile.imageUrl = nftInfo.imageUrl
            }
          }
        } else {
          console.error(await response.json())
        }
      } catch (err) {
        console.error(processError(err))
      }

      return profile
    },
  // Allow overriding imageUrl with Keplr fallback.
  dangerouslyAllowMutability: true,
})
