import { InboxSource } from '@dao-dao/types'

import { useFollowingDaos } from '../../../hooks'
import { Renderer } from './Renderer'

export const PendingFollowing: InboxSource<{ coreAddress: string }> = {
  id: 'pending_following',
  Renderer,
  useData: () => {
    const { daos, refreshFollowing: refresh } = useFollowingDaos()

    return {
      loading: daos.loading,
      refreshing: !daos.loading && !!daos.updating,
      daosWithItems: daos.loading
        ? []
        : daos.data.pending.map((coreAddress) => ({
            coreAddress,
            items: [
              {
                props: { coreAddress },
                // Order pending following items first in the inbox.
                order: 0,
                // All are pending.
                pending: true,
              },
            ],
          })),
      refresh,
    }
  },
}
