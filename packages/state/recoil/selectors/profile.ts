import { selectorFamily, waitForAll } from 'recoil'

import { ProfileSearchHit, WithChainId } from '@dao-dao/types'
import { PFPK_API_BASE, getChainForChainId, processError } from '@dao-dao/utils'

import { refreshWalletProfileAtom } from '../atoms/refresh'

export const searchProfilesByNamePrefixSelector = selectorFamily<
  ProfileSearchHit[],
  WithChainId<{ namePrefix: string }>
>({
  key: 'searchProfilesByNamePrefix',
  get:
    ({ namePrefix, chainId }) =>
    async ({ get }) => {
      if (namePrefix.length < 3) {
        return []
      }

      // Load hits from PFPK API.
      let hits: ProfileSearchHit[] = []
      try {
        const response = await fetch(
          PFPK_API_BASE +
            `/search/${getChainForChainId(chainId).bech32_prefix}/${namePrefix}`
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
