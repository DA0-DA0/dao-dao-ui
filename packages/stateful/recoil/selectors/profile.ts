import { noWait, selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  refreshWalletProfileAtom,
} from '@dao-dao/state/recoil'
import {
  ChainId,
  PfpkWalletProfile,
  WalletProfile,
  WalletProfileData,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  PFPK_API_BASE,
  STARGAZE_NAMES_CONTRACT,
  getChainForChainId,
  getFallbackImage,
  toBech32Hash,
  transformBech32Address,
} from '@dao-dao/utils'

import { nftCardInfoSelector } from './nft'

export const EMPTY_WALLET_PROFILE: WalletProfile = {
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  nameSource: 'pfpk',
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

// Get name for address from Stargaze Names.
export const stargazeNameSelector = selectorFamily<string | undefined, string>({
  key: 'stargazeName',
  get:
    (walletAddress) =>
    async ({ get }) => {
      if (!walletAddress) {
        return
      }

      const chainId = MAINNET
        ? ChainId.StargazeMainnet
        : ChainId.StargazeTestnet
      const stargazeWalletAddress = transformBech32Address(
        walletAddress,
        chainId
      )
      get(refreshWalletProfileAtom(stargazeWalletAddress))

      const client = get(cosmWasmClientForChainSelector(chainId))

      try {
        return await client.queryContractSmart(STARGAZE_NAMES_CONTRACT, {
          name: { address: stargazeWalletAddress },
        })
      } catch {}
    },
})

export const makeDefaultWalletProfileData = (
  address: string,
  loading = false
): WalletProfileData => ({
  loading,
  address,
  profile: { ...EMPTY_WALLET_PROFILE },
  backupImageUrl: getFallbackImage(),
})

// This selector returns the profile for a wallet with some helpful metadata,
// such as its loading state and a backup image. It is designed to not wait for
// any data, returning a default profile immediately and filling in data as it
// comes in. Thus, it should be safe to use in any component without suspending
// it.
export const walletProfileDataSelector = selectorFamily<
  WalletProfileData,
  WithChainId<{ address: string }>
>({
  key: 'walletProfileData',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      if (!address) {
        return makeDefaultWalletProfileData(address)
      }

      get(refreshWalletProfileAtom(address))

      let profile = { ...EMPTY_WALLET_PROFILE }

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

      const backupImageUrl = getFallbackImage(toBech32Hash(address))

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

      // Load Stargaze name as backup if no PFPK set.
      if (!profile.name) {
        const stargazeNameLoadable = get(noWait(stargazeNameSelector(address)))
        if (
          stargazeNameLoadable.state === 'hasValue' &&
          stargazeNameLoadable.contents
        ) {
          profile.name =
            stargazeNameLoadable.contents +
            '.' +
            getChainForChainId(chainId).bech32_prefix
          profile.nameSource = 'stargaze'
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
