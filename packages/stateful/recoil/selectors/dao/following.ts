import uniq from 'lodash.uniq'
import { atomFamily, selectorFamily, waitForAll } from 'recoil'

import { refreshFollowingDaosAtom } from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'
import { ProposalModule, WithChainId } from '@dao-dao/types'
import { FOLLOWING_DAOS_API_BASE } from '@dao-dao/utils'

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
  { following: string[]; pending: string[] },
  WithChainId<{
    walletAddress: string
  }>
>({
  key: 'followingDaos',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      get(refreshFollowingDaosAtom)

      const temporary = get(temporaryFollowingDaosAtom(walletAddress))

      const response = await fetch(
        FOLLOWING_DAOS_API_BASE + `/following/${chainId}/${walletAddress}`
      )

      if (response.ok) {
        const { following: _following, pending: _pending } =
          (await response.json()) as {
            following: string[]
            pending: string[]
          }

        const following = uniq(
          [..._following, ...temporary.following].filter(
            (address) => !temporary.unfollowing.includes(address)
          )
        )

        const pending = _pending.filter(
          (address) =>
            !following.includes(address) &&
            !temporary.unfollowing.includes(address)
        )

        return {
          following,
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

export const followingDaoDropdownInfosSelector = selectorFamily<
  DaoDropdownInfo[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'followingDaoDropdownInfos',
  get:
    (params) =>
    ({ get }) => {
      const { following } = get(followingDaosSelector(params))
      return get(
        waitForAll(
          following.map((coreAddress) =>
            daoDropdownInfoSelector({
              coreAddress,
              chainId: params.chainId,
            })
          )
        )
      ).filter(Boolean) as DaoDropdownInfo[]
    },
})

export const followingDaosWithProposalModulesSelector = selectorFamily<
  {
    coreAddress: string
    proposalModules: ProposalModule[]
  }[],
  WithChainId<{ walletAddress: string }>
>({
  key: 'followingDaosWithProposalModules',
  get:
    (params) =>
    ({ get }) => {
      const { following } = get(followingDaosSelector(params))
      const proposalModules = get(
        waitForAll(
          following.map((coreAddress) =>
            daoCoreProposalModulesSelector({
              coreAddress,
              chainId: params.chainId,
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
