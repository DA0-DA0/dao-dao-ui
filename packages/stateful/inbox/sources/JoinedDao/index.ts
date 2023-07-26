import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState, waitForAll } from 'recoil'

import {
  inboxApiItemsSelector,
  refreshInboxApiItemsAtom,
} from '@dao-dao/state/recoil'
import { useCachedLoading } from '@dao-dao/stateless'
import { InboxApiItemType, InboxSource } from '@dao-dao/types'
import { getSupportedChains, transformBech32Address } from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { temporaryFollowingDaosAtom } from '../../../recoil/selectors/dao/following'
import { Renderer } from './Renderer'
import { Data } from './types'

export const JoinedDao: InboxSource<Data> = {
  id: 'joined_dao',
  Renderer,
  useData: () => {
    const { address, hexPublicKey } = useWallet({
      loadAccount: true,
    })

    const temporary = useRecoilValue(
      temporaryFollowingDaosAtom(hexPublicKey.loading ? '' : hexPublicKey.data)
    )
    const items = useCachedLoading(
      address
        ? waitForAll(
            getSupportedChains().map(({ chain }) =>
              inboxApiItemsSelector({
                walletAddress: transformBech32Address(address, chain.chain_id),
                chainId: chain.chain_id,
                type: InboxApiItemType.JoinedDao,
              })
            )
          )
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
            .flat()
            // Remove if followed or ignored/unfollowed the DAO.
            .filter(
              ({ data: { dao } }) =>
                !temporary.following.includes(dao) &&
                !temporary.unfollowing.includes(dao)
            )
            .map(
              ({ id: inboxItemId, data: { chainId, dao: coreAddress } }) => ({
                chainId,
                coreAddress,
                items: [
                  {
                    props: {
                      chainId,
                      coreAddress,
                      inboxItemId,
                    },
                    // Order pending following items first in the inbox.
                    order: 0,
                    // All are pending.
                    pending: true,
                  },
                ],
              })
            ),
      refresh,
    }
  },
}
