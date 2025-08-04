import { queryOptions } from '@tanstack/react-query'

import { maybeGetChainForChainId } from '../../chain'
import { FOLLOWING_DAOS_PREFIX, MAINNET } from '../../constants'
import { deserializeDaoSource } from '../../dao'
import { KvpkClient, KvpkClientOptions } from './KvpkClient'

export type FollowingDaosKvpkClientOptions = Omit<
  KvpkClientOptions,
  'onProfileUpdated' | 'defaultSignatureType' | 'flattenData' | 'keyPrefix'
>

export class FollowingDaosKvpkClient extends KvpkClient {
  constructor(options: FollowingDaosKvpkClientOptions) {
    super({
      ...options,
      defaultSignatureType: 'Update Followed DAOs',
      keyPrefix: FOLLOWING_DAOS_PREFIX,
    })
  }

  /**
   * Query to list all following DAOs for a wallet.
   */
  listFollowingDaosQuery(options: { uuid: string }) {
    return queryOptions({
      queryKey: ['followingDaosKvpk', 'list', options],
      queryFn: () =>
        this.queryClient
          .fetchQuery(
            this.listQuery({
              uuid: options.uuid,
            })
          )
          .then((items) =>
            items.flatMap(({ key }) => {
              const dao = deserializeDaoSource(key)

              // Only get followed DAOs that match the current network type.
              const { network_type } =
                maybeGetChainForChainId(dao.chainId)?.chainRegistry ?? {}
              return network_type && (network_type === 'mainnet') === MAINNET
                ? dao
                : []
            })
          ),
    })
  }

  /**
   * Refresh the following DAOs for a wallet.
   */
  async refreshQueries(options: { uuid: string }): Promise<void> {
    // TODO(kvpk): auto dependency tracker
  }
}
