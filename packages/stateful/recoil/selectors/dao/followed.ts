import { selector, selectorFamily, waitForAll } from 'recoil'

import {
  openProposalsSelector,
  pinnedAddressesAtom,
  walletMemberOfDaosSelector,
} from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'
import { DaoWithOpenProposals, WithChainId } from '@dao-dao/types'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

export const followedDaosSelector = selector<string[]>({
  key: 'followedDaos',
  get: ({ get }) => {
    const pinnedAddresses = get(pinnedAddressesAtom)
    const walletMemberOfDaos = get(walletMemberOfDaosSelector)

    return Array.from(new Set([...pinnedAddresses, ...walletMemberOfDaos]))
  },
})

export const followedDaoDropdownInfosSelector = selector<DaoDropdownInfo[]>({
  key: 'followedDaoDropdownInfos',
  get: ({ get }) => {
    const pinnedAddresses = get(followedDaosSelector)
    return get(
      waitForAll(
        pinnedAddresses.map((coreAddress) =>
          daoDropdownInfoSelector({ coreAddress })
        )
      )
    ).filter(Boolean) as DaoDropdownInfo[]
  },
})

export const followedDaosWithProposalModulesSelector = selector({
  key: 'followedDaosWithProposalModules',
  get: ({ get }) => {
    const daoAddresses = get(followedDaosSelector)
    const proposalModules = get(
      waitForAll(
        daoAddresses.map((coreAddress) =>
          daoCoreProposalModulesSelector({ coreAddress })
        )
      )
    )
    return daoAddresses.map((coreAddress, index) => ({
      coreAddress,
      proposalModules: proposalModules[index],
    }))
  },
})

export const followedDaosWithOpenProposalsSelector = selectorFamily<
  DaoWithOpenProposals[],
  WithChainId<{ walletAddress?: string }>
>({
  key: 'followedDaosWithOpenProposals',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const followedDaosWithProposalModules = get(
        followedDaosWithProposalModulesSelector
      )

      const openProposalsPerDao = get(
        waitForAll(
          followedDaosWithProposalModules.map(({ coreAddress }) =>
            openProposalsSelector({
              coreAddress,
              address: walletAddress,
              chainId,
            })
          )
        )
      )

      return followedDaosWithProposalModules.map(
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
