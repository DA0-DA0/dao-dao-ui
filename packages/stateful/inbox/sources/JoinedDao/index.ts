import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  inboxApiItemsSelector,
  refreshInboxApiItemsAtom,
} from '@dao-dao/state/recoil'
import { useCachedLoading, useChain } from '@dao-dao/stateless'
import { InboxApiItemType, InboxSource } from '@dao-dao/types'

import { useWallet } from '../../../hooks/useWallet'
import { temporaryFollowingDaosAtom } from '../../../recoil/selectors/dao/following'
import { Renderer } from './Renderer'
import { Data } from './types'

export const JoinedDao: InboxSource<Data> = {
  id: 'joined_dao',
  Renderer,
  useData: () => {
    const { chain_id: chainId } = useChain()
    const { address, hexPublicKey } = useWallet({
      loadAccount: true,
    })

    const temporary = useRecoilValue(
      temporaryFollowingDaosAtom(hexPublicKey.loading ? '' : hexPublicKey.data)
    )
    const items = useCachedLoading(
      address
        ? inboxApiItemsSelector({
            walletAddress: address,
            chainId,
            type: InboxApiItemType.JoinedDao,
          })
        : undefined,
      []
    )

    const setRefresh = useSetRecoilState(refreshInboxApiItemsAtom)
    const refresh = useCallback(() => setRefresh((id) => id + 1), [setRefresh])

    return {
      loading: items.loading,
      refreshing: !items.loading && !!items.updating,
      daosWithItems: items.loading
        ? []
        : items.data
            // Remove if followed or ignored/unfollowed the DAO.
            .filter(
              ({ data: { dao } }) =>
                !temporary.following.includes(dao) &&
                !temporary.unfollowing.includes(dao)
            )
            .map(({ id: inboxItemId, data: { dao: coreAddress } }) => ({
              coreAddress,
              items: [
                {
                  props: {
                    coreAddress,
                    inboxItemId,
                  },
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
