import uniq from 'lodash.uniq'
import { noWait, selectorFamily, waitForAll } from 'recoil'

import {
  ChainId,
  PfpkProfile,
  ResolvedProfile,
  UnifiedProfile,
  WithChainId,
} from '@dao-dao/types'
import {
  EMPTY_PFPK_PROFILE,
  MAINNET,
  PFPK_API_BASE,
  STARGAZE_NAMES_CONTRACT,
  getChainForChainId,
  makeEmptyUnifiedProfile,
  objectMatchesStructure,
  processError,
  toBech32Hash,
  transformBech32Address,
} from '@dao-dao/utils'

import { refreshWalletProfileAtom } from '../atoms/refresh'
import { cosmWasmClientForChainSelector } from './chain'
import { nftCardInfoSelector } from './nft'

export const searchProfilesByNamePrefixSelector = selectorFamily<
  ResolvedProfile[],
  WithChainId<{ namePrefix: string }>
>({
  key: 'searchProfilesByNamePrefix',
  get:
    ({ namePrefix, chainId }) =>
    async ({ get }) => {
      if (namePrefix.length < 3) {
        return []
      }

      // Load profiles from PFPK API.
      let profiles: ResolvedProfile[] = []
      try {
        const response = await fetch(
          PFPK_API_BASE + `/search/${chainId}/${namePrefix}`
        )
        if (response.ok) {
          const { profiles: _profiles } = (await response.json()) as {
            profiles: ResolvedProfile[]
          }
          profiles = _profiles
        } else {
          console.error(await response.json())
        }
      } catch (err) {
        console.error(processError(err))
      }

      // Add refresher dependencies.
      if (profiles.length > 0) {
        get(
          waitForAll(
            profiles.map((hit) =>
              refreshWalletProfileAtom(toBech32Hash(hit.address))
            )
          )
        )
      }

      return profiles
    },
})

/**
 * Get profile from PFPK given a wallet address on any chain.
 */
export const pfpkProfileSelector = selectorFamily<PfpkProfile, string>({
  key: 'pfpkProfile',
  get:
    (walletAddress) =>
    ({ get }) =>
      get(
        pfpkProfileForBech32HashSelector(
          walletAddress && toBech32Hash(walletAddress)
        )
      ),
})

/**
 * Get profile from PFPK given a wallet address's bech32 hash.
 */
export const pfpkProfileForBech32HashSelector = selectorFamily<
  PfpkProfile,
  string
>({
  key: 'pfpkProfileForBech32Hash',
  get:
    (bech32Hash) =>
    async ({ get }) => {
      if (!bech32Hash) {
        return { ...EMPTY_PFPK_PROFILE }
      }

      get(refreshWalletProfileAtom(bech32Hash))

      try {
        const response = await fetch(PFPK_API_BASE + `/bech32/${bech32Hash}`)
        if (response.ok) {
          const profile: PfpkProfile = await response.json()

          // If profile found, add refresher dependencies for the other chains
          // in the profile. This ensures that the profile will update for all
          // other chains when any of the other chains update the profile.
          if (profile?.chains) {
            get(
              waitForAll(
                uniq(
                  Object.values(profile.chains).map(({ address }) =>
                    toBech32Hash(address)
                  )
                ).map((bech32Hash) => refreshWalletProfileAtom(bech32Hash))
              )
            )
          }

          return profile
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

export const profileSelector = selectorFamily<
  UnifiedProfile,
  WithChainId<{ address: string }>
>({
  key: 'profile',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      const profile = makeEmptyUnifiedProfile(chainId, address)
      if (!address) {
        return profile
      }

      get(refreshWalletProfileAtom(toBech32Hash(address)))

      const pfpkProfile = get(pfpkProfileSelector(address))
      if (pfpkProfile) {
        profile.uuid = pfpkProfile.uuid
        profile.nonce = pfpkProfile.nonce
        profile.name = pfpkProfile.name
        profile.nft = pfpkProfile.nft
        profile.chains = pfpkProfile.chains
      }

      // Load Stargaze name as backup if no PFPK name set.
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

      // Set `imageUrl` to PFPK image, defaulting to fallback image.
      profile.imageUrl = pfpkProfile?.nft?.imageUrl || profile.backupImageUrl

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

        // Load Stargaze name image if no PFPK image.
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

      return profile
    },
})
