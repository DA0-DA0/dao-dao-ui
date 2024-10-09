import uniq from 'lodash.uniq'
import { selectorFamily, waitForAllSettled } from 'recoil'

import { DaoDropdownInfo, DaoSource } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  KVPK_API_BASE,
  MAINNET,
  deserializeDaoSource,
  keepSubDaosInDropdown,
  maybeGetChainForChainId,
  subDaoExistsInDropdown,
} from '@dao-dao/utils'

import { refreshFollowingDaosAtom, temporaryFollowingDaosAtom } from '../atoms'
import { daoDropdownInfoSelector } from './dao'

export const followingDaosSelector = selectorFamily<
  DaoSource[],
  {
    walletPublicKey: string
  }
>({
  key: 'followingDaos',
  get:
    ({ walletPublicKey }) =>
    async ({ get }) => {
      get(refreshFollowingDaosAtom)

      const tmp = get(temporaryFollowingDaosAtom)

      const response = await fetch(
        KVPK_API_BASE + `/list/${walletPublicKey}/${FOLLOWING_DAOS_PREFIX}`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: number | null
          }[]
        }

        // Serialized DaoSources.
        const currentFollowing = items.map(({ key }) =>
          key.slice(FOLLOWING_DAOS_PREFIX.length)
        )

        const following = uniq(
          [...currentFollowing, ...tmp.following].filter(
            (address) => !tmp.unfollowing.includes(address)
          )
        )

        return following.flatMap((daoSource) => {
          const dao = deserializeDaoSource(daoSource)

          // Only get followed DAOs that match the current network type.
          const { network_type } =
            maybeGetChainForChainId(dao.chainId)?.chainRegistry ?? {}
          return network_type && (network_type === 'mainnet') === MAINNET
            ? dao
            : []
        })
      } else {
        throw new Error(
          `Failed to fetch following DAOs for ${walletPublicKey}: ${
            response.status
          }/${response.statusText} ${await response
            .text()
            .catch(() => '')}`.trim()
        )
      }
    },
})

export const followingDaoDropdownInfosSelector = selectorFamily<
  DaoDropdownInfo[],
  {
    walletPublicKey: string
    /**
     * Whether or not to remove DAOs from the top-level that already exist as
     * SubDAOs (at any level of nesting) in another top-level DAO.
     */
    removeTopLevelSubDaos: boolean
  }
>({
  key: 'followingDaoDropdownInfos',
  get:
    ({ walletPublicKey, removeTopLevelSubDaos }) =>
    ({ get }) => {
      const following = get(
        followingDaosSelector({
          walletPublicKey,
        })
      )

      const daos = get(
        waitForAllSettled(
          following.map(({ chainId, coreAddress }) =>
            daoDropdownInfoSelector({
              chainId,
              coreAddress,
            })
          )
        )
      ).flatMap((loadable) => loadable.valueMaybe() || [])

      const infos =
        // Remove SubDAOs that are not being followed.
        keepSubDaosInDropdown(
          // Keep top-level DAOs only if they are not SubDAOs elsewhere. This
          // ensures that a SubDAO is not shown multiple times. If both a parent
          // DAO and SubDAO are followed, the SubDAO will only appear in the
          // parent's dropdown. If the parent isn't followed, the SubDAO will
          // appear in the top level.
          removeTopLevelSubDaos
            ? daos.filter(
                ({ coreAddress }) => !subDaoExistsInDropdown(daos, coreAddress)
              )
            : daos,
          following
        )

      return infos
    },
})
