import { selectorFamily } from 'recoil'

import {
  KeplrWalletProfile,
  PfpkWalletProfile,
  WalletProfile,
} from '@dao-dao/tstypes'
import { PFPK_API_BASE, getFallbackImage, processError } from '@dao-dao/utils'

import { refreshWalletProfileAtom } from '../atoms/refresh'
import { cosmWasmClientSelector } from './chain'

export const walletPublicKeySelector = selectorFamily<
  string | undefined,
  string
>({
  key: 'walletPublicKey',
  get:
    (walletAddress) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      const account = await client.getAccount(walletAddress)
      return account?.pubkey?.value ?? undefined
    },
})

export const walletProfileSelector = selectorFamily<WalletProfile, string>({
  key: 'walletProfile',
  get:
    (publicKey) =>
    async ({ get }) => {
      get(refreshWalletProfileAtom(publicKey))

      let profile: WalletProfile = {
        nonce: 0,
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
          // Set root-level `imageUrl` if NFT present.
          if (pfpkProfile.nft) {
            profile.imageUrl = pfpkProfile.nft.imageUrl
          }
        } else {
          console.error(await response.text())
        }
      } catch (err) {
        console.error(processError(err))
      }

      // Use Keplr profile image API (followed by a fallback image) as backup if
      // PFPK not set.
      if (!profile.imageUrl) {
        const keplrProfileImage = get(keplrProfileImageSelector(publicKey))
        profile.imageUrl = keplrProfileImage ?? getFallbackImage(publicKey)
      }

      return profile
    },
})

export const keplrProfileImageSelector = selectorFamily<
  string | undefined,
  string
>({
  key: 'keplrProfileImage',
  get: (publicKey) => async () => {
    const response = await fetch(
      `https://api.kube-uw2.keplr-prod.manythings.xyz/v1/user/${publicKey}/profile`
    )
    if (!response.ok) {
      console.error(await response.text())
      return undefined
    }

    const { profile }: KeplrWalletProfile = await response.json()
    return 'imageUrl' in profile ? profile.imageUrl : undefined
  },
})
