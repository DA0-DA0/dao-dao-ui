import { selector, selectorFamily, waitForAll } from 'recoil'

import {
  openProposalsSelector,
  refreshFollowingDaosAtom,
  walletAddressAtom,
} from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'
import { DaoWithOpenProposals, WithChainId } from '@dao-dao/types'
import { CHAIN_ID, FOLLOWING_DAOS_API_BASE } from '@dao-dao/utils'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

export const followingDaosSelector = selectorFamily<
  { following: string[]; pending: string[] },
  WithChainId<{}>
>({
  key: 'followingDaos',
  get:
    ({ chainId = CHAIN_ID }) =>
    async ({ get }) => {
      get(refreshFollowingDaosAtom)

      const walletAddress = get(walletAddressAtom)
      const response = await fetch(
        FOLLOWING_DAOS_API_BASE + `/following/${chainId}/${walletAddress}`
      )

      if (response.ok) {
        return await response.json()
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

export const followingDaosWithOpenProposalsSelector = selectorFamily<
  DaoWithOpenProposals[],
  WithChainId<{ walletAddress?: string }>
>({
  key: 'followingDaosWithOpenProposals',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const followingDaosWithProposalModules = get(
        followingDaosWithProposalModulesSelector
      )

      const openProposalsPerDao = get(
        waitForAll(
          followingDaosWithProposalModules.map(({ coreAddress }) =>
            openProposalsSelector({
              coreAddress,
              address: walletAddress,
              chainId,
            })
          )
        )
      )

      return followingDaosWithProposalModules.map(
        ({ coreAddress, proposalModules }, index): DaoWithOpenProposals => {
          const proposalModulesWithOpenProposals = openProposalsPerDao[index]

          return {
            coreAddress,
            proposalModules,
            openProposals: proposalModules.flatMap(
              (proposalModule) =>
                proposalModulesWithOpenProposals
                  .find(
                    ({ proposalModuleAddress }) =>
                      proposalModuleAddress === proposalModule.address
                  )
                  ?.proposals.map(({ id, voted }) => ({
                    proposalModule,
                    proposalNumber: id,
                    voted,
                  })) ?? []
            ),
          }
        }
      )
    },
})
