import { selectorFamily, waitForAll } from 'recoil'

import { ResolvedProfile, WithChainId } from '@dao-dao/types'
import { PFPK_API_BASE, processError } from '@dao-dao/utils'

import { refreshWalletProfileAtom } from '../atoms/refresh'

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
            profiles.map((hit) => refreshWalletProfileAtom(hit.address))
          )
        )
      }

      return profiles
    },
})
