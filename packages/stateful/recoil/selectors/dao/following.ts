import uniq from 'lodash.uniq'
import {
  atom,
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { DaoDropdownInfo, DaoSource, ProposalModule } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  KVPK_API_BASE,
  MAINNET,
  deserializeDaoSource,
  isConfiguredChainName,
  keepSubDaosInDropdown,
  maybeGetChainForChainId,
  subDaoExistsInDropdown,
} from '@dao-dao/utils'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

// Following API doesn't update right away due to Cloudflare KV Store latency,
// so this serves to keep track of all successful updates for the current
// session. This will be reset on page refresh. Set this right away so the UI
// can update immediately even if the API takes up to a minute or two. Though
// likely it only takes 10 seconds or so.
export const temporaryFollowingDaosAtom = atom<{
  /**
   * Serialized DaoSources.
   */
  following: string[]
  /**
   * Serialized DaoSources.
   */
  unfollowing: string[]
}>({
  key: 'temporaryFollowingDaos',
  default: { following: [], unfollowing: [] },
})

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
          const { network_type } = maybeGetChainForChainId(dao.chainId) ?? {}
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

export const followingDaosWithProposalModulesSelector = selectorFamily<
  (DaoSource & {
    proposalModules: ProposalModule[]
  })[],
  {
    walletPublicKey: string
  }
>({
  key: 'followingDaosWithProposalModules',
  get:
    (params) =>
    ({ get }) => {
      const following = get(followingDaosSelector(params))

      const proposalModules = get(
        waitForAll(
          following.map(({ chainId, coreAddress }) =>
            isConfiguredChainName(chainId, coreAddress)
              ? constSelector([])
              : daoCoreProposalModulesSelector({
                  chainId,
                  coreAddress,
                })
          )
        )
      )

      return following.map((daoSource, index) => ({
        ...daoSource,
        proposalModules: proposalModules[index],
      }))
    },
})
