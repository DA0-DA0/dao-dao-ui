import { noWait, selectorFamily } from 'recoil'

import {
  keplrProfileImageSelector,
  refreshWalletProfileAtom,
} from '@dao-dao/state/recoil'
import {
  PfpkWalletProfile,
  WalletProfile,
  WalletProfileData,
  WithChainId,
} from '@dao-dao/types'
import { PFPK_API_BASE, getFallbackImage, toBech32Hash } from '@dao-dao/utils'

import { nftCardInfoSelector } from './nft'

export const EMPTY_WALLET_PROFILE: WalletProfile = {
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  imageUrl: '',
  nft: null,
}

// Get profile from PFPK API.
export const pfpkProfileSelector = selectorFamily<
  PfpkWalletProfile | null,
  string
>({
  key: 'pfpkProfile',
  get:
    (walletAddress) =>
    async ({ get }) => {
      if (!walletAddress) {
        return null
      }

      get(refreshWalletProfileAtom(walletAddress))

      try {
        const response = await fetch(
          PFPK_API_BASE + `/address/${walletAddress}`
        )
        if (response.ok) {
          return await response.json()
        } else {
          console.error(await response.json().catch(() => response.statusText))
        }
      } catch (err) {
        console.error(err)
      }

      return null
    },
})

// This selector returns the profile for a wallet with some helpful metadata,
// such as its loading state and a backup image. It is designed to not wait for
// any data, returning a default profile immediately and filling in data as it
// comes in. Thus, it should be safe to use in any component without suspending
// it.
export const walletProfileDataSelector = selectorFamily<
  WalletProfileData,
  WithChainId<{
    address: string
  }>
>({
  key: 'walletProfileData',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      let profile = { ...EMPTY_WALLET_PROFILE }

      if (!address) {
        return {
          loading: false,
          address,
          profile,
          backupImageUrl: getFallbackImage(),
        }
      }

      get(refreshWalletProfileAtom(address))

      const pfpkProfileLoadable = get(noWait(pfpkProfileSelector(address)))
      const pfpkProfile =
        pfpkProfileLoadable.state === 'hasValue'
          ? pfpkProfileLoadable.contents
          : null
      if (pfpkProfile) {
        profile.nonce = pfpkProfile.nonce
        profile.name = pfpkProfile.name
        profile.nft = pfpkProfile.nft
      }

      const keplrProfileImage = get(
        noWait(
          keplrProfileImageSelector({
            address,
            chainId,
          })
        )
      )
      const backupImageUrl =
        (keplrProfileImage.state === 'hasValue' &&
          keplrProfileImage.contents) ||
        getFallbackImage(toBech32Hash(address))

      // Set `imageUrl` to PFPK image, defaulting to fallback image.
      profile.imageUrl = pfpkProfile?.nft?.imageUrl || backupImageUrl

      // If NFT present from PFPK, get image from token.
      if (pfpkProfile?.nft) {
        // Don't wait for NFT info to load. When it loads, it will update.
        const nftInfoLoadable = get(
          noWait(
            nftCardInfoSelector({
              collection: pfpkProfile.nft.collectionAddress,
              tokenId: pfpkProfile.nft.tokenId,
              chainId: pfpkProfile.nft.chainId,
            })
          )
        )

        // Set `imageUrl` if defined, overriding PFPK image and backup.
        if (
          nftInfoLoadable.state === 'hasValue' &&
          nftInfoLoadable.contents?.imageUrl
        ) {
          profile.imageUrl = nftInfoLoadable.contents.imageUrl
        }
      }

      return {
        loading: pfpkProfileLoadable.state === 'loading',
        address,
        profile,
        backupImageUrl,
      }
    },
})
