import uniq from 'lodash.uniq'
import { useRecoilCallback } from 'recoil'

import { refreshWalletProfileAtom } from '@dao-dao/state/recoil'
import { LoadingData, UnifiedProfile } from '@dao-dao/types'
import { toBech32Hash } from '@dao-dao/utils'

/**
 * A hook that generates a function to refresh the given profile(s).
 *
 * @param address The wallet address(es) attached to the profile(s).
 * @param profile The profile(s) loaded for the address(es) that will be
 * refreshed.
 */
export const useRefreshProfile = (
  address: string | string[],
  profile: LoadingData<UnifiedProfile | UnifiedProfile[]>
) =>
  useRecoilCallback(
    ({ set }) =>
      () => {
        // Refresh all hashes in the profile(s). This ensures updates made by
        // one public key propagate to the other public keys in the profile(s).
        const hashes = uniq(
          [
            ...[address].flat(),
            ...(profile.loading
              ? []
              : [profile.data]
                  .flat()
                  .flatMap((profile) =>
                    Object.values(profile.chains).map(({ address }) => address)
                  )),
          ].flatMap((address) => toBech32Hash(address) || [])
        )

        hashes.forEach((hash) =>
          set(refreshWalletProfileAtom(hash), (id) => id + 1)
        )
      },
    [profile]
  )
