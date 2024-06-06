import { useQueryClient } from '@tanstack/react-query'
import uniq from 'lodash.uniq'
import { useCallback } from 'react'

import { useUpdatingRef } from '@dao-dao/stateless'
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
) => {
  const queryClient = useQueryClient()

  // Stabilize reference so callback doesn't change. The latest values will be
  // used when refresh is called.
  const addressRef = useUpdatingRef(address)
  const profileRef = useUpdatingRef(profile)

  return useCallback(() => {
    // Refresh all hashes in the profile(s). This ensures updates made by
    // one public key propagate to the other public keys in the profile(s).
    const hashes = uniq(
      [
        ...[addressRef.current].flat(),
        ...(profileRef.current.loading
          ? []
          : [profileRef.current.data]
              .flat()
              .flatMap((profile) =>
                Object.values(profile.chains).map(({ address }) => address)
              )),
      ].flatMap((address) => toBech32Hash(address) || [])
    )

    hashes.forEach((bech32Hash) =>
      queryClient.invalidateQueries({
        queryKey: [
          {
            category: 'profile',
            options: {
              bech32Hash,
            },
          },
        ],
      })
    )
  }, [addressRef, profileRef, queryClient])
}
