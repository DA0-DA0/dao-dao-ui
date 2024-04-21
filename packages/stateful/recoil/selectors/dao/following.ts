import uniq from 'lodash.uniq'
import {
  atomFamily,
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { DaoDropdownInfo, ProposalModule, WithChainId } from '@dao-dao/types'
import {
  FOLLOWING_DAOS_PREFIX,
  KVPK_API_BASE,
  isConfiguredChainName,
  keepSubDaosInDropdown,
  subDaoExistsInDropdown,
} from '@dao-dao/utils'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

// Following API doesn't update right away due to Cloudflare KV Store latency,
// so this serves to keep track of all successful updates for the current
// session. This will be reset on page refresh. Set this right away so the UI
// can update immediately even if the API takes up to a minute or two. Though
// likely it only takes 10 seconds or so.
export const temporaryFollowingDaosAtom = atomFamily<
  {
    following: string[]
    unfollowing: string[]
  },
  string
>({
  key: 'temporaryFollowingDaos',
  default: { following: [], unfollowing: [] },
})

export const followingDaosSelector = selectorFamily<
  string[],
  WithChainId<{
    walletPublicKey: string
  }>
>({
  key: 'followingDaos',
  get:
    ({ walletPublicKey, chainId }) =>
    async ({ get }) => {
      get(refreshFollowingDaosAtom)

      const temporary = get(temporaryFollowingDaosAtom(walletPublicKey))

      const response = await fetch(
        KVPK_API_BASE +
          `/list/${walletPublicKey}/${FOLLOWING_DAOS_PREFIX}${chainId}:`
      )

      if (response.ok) {
        const { items } = (await response.json()) as {
          items: {
            key: string
            value: number | null
          }[]
        }

        const _following = items.map(({ key }) => key.split(':').slice(-1)[0])
        const following = uniq(
          [..._following, ...temporary.following].filter(
            (address) => !temporary.unfollowing.includes(address)
          )
        )

        return following
      } else {
        throw new Error(
          `Failed to fetch following daos: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

export const followingDaoDropdownInfosSelector = selectorFamily<
  DaoDropdownInfo[],
  WithChainId<{
    walletPublicKey: string
    /**
     * Whether or not to remove DAOs from the top-level that already exist as
     * SubDAOs (at any level of nesting) in another top-level DAO.
     */
    removeTopLevelSubDaos: boolean
  }>
>({
  key: 'followingDaoDropdownInfos',
  get:
    ({ removeTopLevelSubDaos, ...params }) =>
    ({ get }) => {
      const following = get(followingDaosSelector(params))

      const daos = get(
        waitForAllSettled(
          following.map((coreAddress) =>
            daoDropdownInfoSelector({
              coreAddress,
              chainId: params.chainId,
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
  {
    coreAddress: string
    proposalModules: ProposalModule[]
  }[],
  WithChainId<{ walletPublicKey: string }>
>({
  key: 'followingDaosWithProposalModules',
  get:
    (params) =>
    ({ get }) => {
      const following = get(followingDaosSelector(params))

      const proposalModules = get(
        waitForAll(
          following.map((coreAddress) =>
            isConfiguredChainName(params.chainId, coreAddress)
              ? constSelector([])
              : daoCoreProposalModulesSelector({
                  chainId: params.chainId,
                  coreAddress,
                })
          )
        )
      )

      return following.map((coreAddress, index) => ({
        coreAddress,
        proposalModules: proposalModules[index],
      }))
    },
})
