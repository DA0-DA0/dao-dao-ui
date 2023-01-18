import { useMemo, useState } from 'react'

import { SyncFollowingModal as StatelessSyncFollowingModal } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/utils'

import { useFollowingDaos } from '../hooks'
import { EntityDisplay } from './EntityDisplay'

export const SyncFollowingModal = () => {
  const { setFollowing, ready, updatingFollowing } = useFollowingDaos()

  const [updatePinned, setUpdatePinned] = useState(0)
  const clear = () => {
    localStorage.removeItem(CHAIN_ID + ':' + 'pinnedAddresses')
    setUpdatePinned((prev) => prev + 1)
  }
  const pinned = useMemo(
    () =>
      typeof localStorage !== 'undefined'
        ? JSON.parse(
            localStorage.getItem(CHAIN_ID + ':' + 'pinnedAddresses') || 'null'
          )
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatePinned]
  )

  return pinned && ready ? (
    <StatelessSyncFollowingModal
      EntityDisplay={EntityDisplay}
      followedDaos={pinned}
      onDelete={clear}
      onSync={async () => (await setFollowing(pinned)) && clear()}
      syncing={updatingFollowing}
      visible
    />
  ) : null
}
