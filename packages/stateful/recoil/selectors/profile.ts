import { noWait, selectorFamily } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  refreshWalletProfileAtom,
} from '@dao-dao/state/recoil'
import {
  ChainId,
  PfpkProfile,
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
  objectMatchesStructure,
  transformBech32Address,
} from '@dao-dao/utils'

import { nftCardInfoSelector } from './nft'

export const EMPTY_PFPK_PROFILE: PfpkProfile = {
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  nft: null,
  chains: {},
}

export const EMPTY_WALLET_PROFILE: WalletProfile = {
  ...EMPTY_PFPK_PROFILE,
  nameSource: 'pfpk',
  imageUrl: '',
}

// Get profile from PFPK.
export const pfpkProfileSelector = selectorFamily<PfpkProfile, string>({
  key: 'pfpkProfile',
  get:
    (walletAddress) =>
    async ({ get }) => {
      if (!walletAddress) {
        return { ...EMPTY_PFPK_PROFILE }
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

      return { ...EMPTY_PFPK_PROFILE }
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

      get(refreshWalletProfileAtom(walletAddress))

      const client = get(
        cosmWasmClientForChainSelector(
          MAINNET ? ChainId.StargazeMainnet : ChainId.StargazeTestnet
        )
      )

      try {
        return await client.queryContractSmart(STARGAZE_NAMES_CONTRACT, {
          name: { address: walletAddress },
        })
      } catch {}
    },
})

// Get image for address from Stargaze Names.
export const stargazeNameImageForAddressSelector = selectorFamily<
  string | undefined,
  string
>({
  key: 'stargazeNameImageForAddress',
  get:
    (walletAddress) =>
    async ({ get }) => {
      // Get name associated with address.
      const name = get(stargazeNameSelector(walletAddress))
      if (!name) {
        return
      }

      const chainId = MAINNET
        ? ChainId.StargazeMainnet
        : ChainId.StargazeTestnet
      const client = get(cosmWasmClientForChainSelector(chainId))

      // Get NFT associated with name.
      let response
      try {
        response = await client.queryContractSmart(STARGAZE_NAMES_CONTRACT, {
          image_n_f_t: { name },
        })
      } catch {
        return
      }

      // If NFT exists, get image associated with NFT.
      if (
        objectMatchesStructure(response, {
          collection: {},
          token_id: {},
        })
      ) {
        const { imageUrl } = get(
          nftCardInfoSelector({
            chainId,
            collection: response.collection,
            tokenId: response.token_id,
          })
        )

        return imageUrl
      }
    },
})

export const makeDefaultWalletProfileData = (
  address: string,
  loading = false
): WalletProfileData => ({
  loading,
  address,
  profile: { ...EMPTY_WALLET_PROFILE },
  backupImageUrl: getFallbackImage(address),
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
        profile.chains = pfpkProfile.chains
      }

      // Load Stargaze name as backup if no PFPK set.
      if (!profile.name) {
        const stargazeNameLoadable = get(
          noWait(
            stargazeNameSelector(
              // Use profile address for Stargaze if set, falling back to
              // transforming the address (which is unreliable due to different
              // chains using different HD paths).
              profile.chains[ChainId.StargazeMainnet]?.address ||
                transformBech32Address(address, ChainId.StargazeMainnet)
            )
          )
        )
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

      const backupImageUrl = getFallbackImage(address)

      // Set `imageUrl` to PFPK image, defaulting to fallback image.
      profile.imageUrl = pfpkProfile?.nft?.imageUrl || backupImageUrl

      // If NFT present from PFPK, get image from token once loaded.
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

        // Load Stargaze name image if no PFPK.
      } else if (profile.nameSource === 'stargaze') {
        const stargazeNameImageLoadable = get(
          noWait(
            stargazeNameImageForAddressSelector(
              // Use profile address for Stargaze if set, falling back to
              // transforming the address (which is unreliable due to different
              // chains using different HD paths).
              profile.chains[ChainId.StargazeMainnet]?.address ||
                transformBech32Address(address, ChainId.StargazeMainnet)
            )
          )
        )
        if (
          stargazeNameImageLoadable.state === 'hasValue' &&
          stargazeNameImageLoadable.contents
        ) {
          profile.imageUrl = stargazeNameImageLoadable.contents
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
