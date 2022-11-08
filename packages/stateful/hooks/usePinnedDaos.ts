import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { pinnedAddressesAtom } from '@dao-dao/state'

export const usePinnedDaos = () => {
  const [pinnedAddresses, setPinnedAddresses] =
    useRecoilState(pinnedAddressesAtom)

  const isPinned = useCallback(
    (coreAddress: string) => pinnedAddresses.includes(coreAddress),
    [pinnedAddresses]
  )
  const setPinned = useCallback(
    (coreAddress: string) => {
      setPinnedAddresses((pinned) => pinned.concat([coreAddress]))
    },
    [setPinnedAddresses]
  )
  const setUnpinned = useCallback(
    (coreAddress: string) => {
      setPinnedAddresses((pinned) => pinned.filter((a) => a !== coreAddress))
    },
    [setPinnedAddresses]
  )

  return {
    pinnedAddresses,
    // Helpers
    isPinned,
    setPinned,
    setUnpinned,
  }
}
