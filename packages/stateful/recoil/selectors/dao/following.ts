import uniq from 'lodash.uniq'
import { atom, selector, selectorFamily, waitForAll } from 'recoil'

import { refreshFollowingDaosAtom, walletAddressAtom } from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'
import { WithChainId } from '@dao-dao/types'
import { CHAIN_ID, FOLLOWING_DAOS_API_BASE } from '@dao-dao/utils'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

// Following API doesn't update right away, so this serves to keep track of all
// successful updates for the current session. This will be reset on page
// refresh.
export const temporaryFollowingDaosAtom = atom<{
  following: string[]
  unfollowing: string[]
}>({
  key: 'temporaryFollowingDaos',
  default: { following: [], unfollowing: [] },
})

export const followingDaosSelector = selectorFamily<
  { following: string[]; pending: string[]; pendingAddress?: boolean },
  WithChainId<{}>
>({
  key: 'followingDaos',
  get:
    ({ chainId = CHAIN_ID }) =>
    async ({ get }) => {
      get(refreshFollowingDaosAtom)

      const walletAddress = get(walletAddressAtom)
      if (!walletAddress) {
        return {
          following: [],
          pending: [],
          pendingAddress: true,
        }
      }

      const temporary = get(temporaryFollowingDaosAtom)

      const response = await fetch(
        FOLLOWING_DAOS_API_BASE + `/following/${chainId}/${walletAddress}`
      )

      if (response.ok) {
        const { following, pending } = (await response.json()) as {
          following: string[]
          pending: string[]
        }

        return {
          following: uniq(
            [...following, ...temporary.following].filter(
              (address) => !temporary.unfollowing.includes(address)
            )
          ),
          pending,
        }
      } else {
        throw new Error(
          `Failed to fetch following daos: ${response.status}/${
            response.statusText
          } ${await response.text().catch(() => '')}`.trim()
        )
      }
    },
})

export const followingDaoDropdownInfosSelector = selector<DaoDropdownInfo[]>({
  key: 'followingDaoDropdownInfos',
  get: ({ get }) => {
    const { following } = get(followingDaosSelector({}))
    return get(
      waitForAll(
        following.map((coreAddress) => daoDropdownInfoSelector({ coreAddress }))
      )
    ).filter(Boolean) as DaoDropdownInfo[]
  },
})

export const followingDaosWithProposalModulesSelector = selector({
  key: 'followingDaosWithProposalModules',
  get: ({ get }) => {
    const { following } = get(followingDaosSelector({}))
    const proposalModules = get(
      waitForAll(
        following.map((coreAddress) =>
          daoCoreProposalModulesSelector({ coreAddress })
        )
      )
    )

    return following.map((coreAddress, index) => ({
      coreAddress,
      proposalModules: proposalModules[index],
    }))
  },
})
