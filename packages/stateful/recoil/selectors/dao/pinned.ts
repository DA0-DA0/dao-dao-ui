import { selector, selectorFamily, waitForAll } from 'recoil'

import { openProposalsSelector, pinnedAddressesAtom } from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'
import { DaoWithOpenUnvotedProposals, WithChainId } from '@dao-dao/types'

import { daoDropdownInfoSelector } from './cards'
import { daoCoreProposalModulesSelector } from './misc'

export const pinnedDaoDropdownInfosSelector = selector<DaoDropdownInfo[]>({
  key: 'pinnedDaoDropdownInfo',
  get: ({ get }) => {
    const pinnedAddresses = get(pinnedAddressesAtom)
    return get(
      waitForAll(
        pinnedAddresses.map((coreAddress) =>
          daoDropdownInfoSelector({ coreAddress })
        )
      )
    ).filter(Boolean) as DaoDropdownInfo[]
  },
})

export const pinnedDaosWithProposalModulesSelector = selector({
  key: 'pinnedDaosWithProposalModules',
  get: ({ get }) => {
    const daoAddresses = get(pinnedAddressesAtom)
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

export const pinnedDaosWithOpenUnvotedProposalsSelector = selectorFamily<
  DaoWithOpenUnvotedProposals[],
  WithChainId<{ walletAddress?: string }>
>({
  key: 'pinnedDaosWithOpenUnvotedProposals',
  get:
    ({ walletAddress, chainId }) =>
    ({ get }) => {
      const pinnedDaosWithProposalModules = get(
        pinnedDaosWithProposalModulesSelector
      )

      const openProposalsPerDao = get(
        waitForAll(
          pinnedDaosWithProposalModules.map(({ coreAddress }) =>
            openProposalsSelector({
              coreAddress,
              address: walletAddress,
              chainId,
            })
          )
        )
      )

      return pinnedDaosWithProposalModules.map(
        (
          { coreAddress, proposalModules },
          index
        ): DaoWithOpenUnvotedProposals => {
          const proposalModulesWithOpenProposals = openProposalsPerDao[index]

          return {
            coreAddress,
            proposalModules,
            openUnvotedProposals: proposalModules.flatMap(
              (proposalModule) =>
                proposalModulesWithOpenProposals
                  .find(
                    ({ proposalModuleAddress }) =>
                      proposalModuleAddress === proposalModule.address
                  )
                  ?.proposals.map(({ id }) => ({
                    proposalModule,
                    proposalNumber: id,
                  })) ?? []
            ),
          }
        }
      )
    },
})
