import { selectorFamily, waitForAll } from 'recoil'

import {
  KeplrWalletProfile,
  ProfileSearchHit,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  PFPK_API_BASE,
  processError,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import { refreshWalletProfileAtom } from '../atoms/refresh'
import { walletHexPublicKeySelector } from './chain'

export const keplrProfileImageSelector = selectorFamily<
  string | undefined,
  WithChainId<{ address: string }>
>({
  key: 'keplrProfileImage',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const publicKey = get(
        walletHexPublicKeySelector({
          walletAddress: address,
          chainId,
        })
      )

      try {
        const response = await fetch(
          `https://api.kube-uw2.keplr-prod.manythings.xyz/v1/user/${publicKey}/profile`
        )
        if (!response.ok) {
          console.error(await response.text())
          return undefined
        }

        const { profile }: KeplrWalletProfile = await response.json()
        return 'imageUrl' in profile
          ? transformIpfsUrlToHttpsIfNecessary(profile.imageUrl)
          : undefined
      } catch (err) {
        console.error(err)
        // Fail silently.
        return undefined
      }
    },
})

export const searchProfilesByNamePrefixSelector = selectorFamily<
  ProfileSearchHit[],
  WithChainId<{ namePrefix: string }>
>({
  key: 'searchProfilesByNamePrefix',
  get:
    ({ namePrefix }) =>
    async ({ get }) => {
      if (namePrefix.length < 3) {
        return []
      }

      // Load hits from PFPK API.
      let hits: ProfileSearchHit[] = []
      try {
        const response = await fetch(
          PFPK_API_BASE + `/search/${CHAIN_BECH32_PREFIX}/${namePrefix}`
        )
        if (response.ok) {
          const { profiles: _hits } = (await response.json()) as {
            profiles: ProfileSearchHit[]
          }
          hits = _hits
        } else {
          console.error(await response.json())
        }
      } catch (err) {
        console.error(processError(err))
      }

      // Add refresher dependencies.
      if (hits.length > 0) {
        get(
          waitForAll(hits.map((hit) => refreshWalletProfileAtom(hit.address)))
        )
      }

      return hits
    },
})
