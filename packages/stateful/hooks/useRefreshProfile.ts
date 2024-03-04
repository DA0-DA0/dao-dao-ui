import uniq from 'lodash.uniq'
import { useRecoilCallback } from 'recoil'

import { refreshWalletProfileAtom } from '@dao-dao/state/recoil'
import { LoadingData, UnifiedProfile } from '@dao-dao/types'
import { toBech32Hash } from '@dao-dao/utils'

/**
 * A hook that generates a function that refreshes the given profile.
 *
 * @param address The wallet address attached to the profile.
 * @param profile The profile loaded for the address that will be refreshed.
 */
export const useRefreshProfile = (
  address: string,
  profile: LoadingData<UnifiedProfile>
) =>
  useRecoilCallback(
    ({ set }) =>
      () => {
        // Refresh all hashes in the profile. This ensures updates made by one
        // public key propagate to the other public keys in the profile.
        const hashes = uniq(
          [
            address,
            ...(profile.loading
              ? []
              : Object.values(profile.data.chains).map(
                  ({ address }) => address
                )),
          ].map((address) => toBech32Hash(address))
        )

        hashes.forEach((hash) =>
          set(refreshWalletProfileAtom(hash), (id) => id + 1)
        )
      },
    [profile]
  )
