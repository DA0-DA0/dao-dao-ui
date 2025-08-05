import { queryOptions } from '@tanstack/react-query'

import { DaoSource } from '@dao-dao/types'

import { maybeGetChainForChainId } from '../../chain'
import { FOLLOWING_DAOS_PREFIX, MAINNET } from '../../constants'
import { deserializeDaoSource, serializeDaoSource } from '../../dao'
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

  async followDao(dao: DaoSource) {
    await this.set({
      key: serializeDaoSource(dao),
      value: 1,
      // Use DAO chain ID for following state to ensure we use the same chain ID
      // when following and unfollowing the DAO.
      chainId: dao.chainId,
    })
  }

  async unfollowDao(dao: DaoSource) {
    await this.delete({
      key: serializeDaoSource(dao),
      // Use DAO chain ID for following state to ensure we use the same chain ID
      // when following and unfollowing the DAO.
      chainId: dao.chainId,
    })
  }

  /**
   * Query to list all following DAOs for a wallet.
   */
  listFollowingDaosQuery(options: { uuid: string }) {
    return queryOptions({
      queryKey: ['followingDaosKvpk', 'list', options],
      queryFn: (ctx) =>
        ctx.client
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
   * List all following DAOs for a wallet.
   */
  listFollowingDaos(options: { uuid: string }) {
    return this.queryClient.fetchQuery(this.listFollowingDaosQuery(options))
  }

  /**
   * Refresh the following DAOs for a wallet.
   */
  async refreshQueries(options: { uuid: string }): Promise<void> {
    await this.queryClient.refetchQueries(this.listFollowingDaosQuery(options))
  }
}
