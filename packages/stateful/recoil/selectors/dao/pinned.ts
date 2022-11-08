import { selector, waitForAll } from 'recoil'

import { pinnedAddressesAtom } from '@dao-dao/state'
import { DaoDropdownInfo } from '@dao-dao/stateless'

import { daoDropdownInfoSelector } from './cards'
import { cwCoreProposalModulesSelector } from './misc'

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
          cwCoreProposalModulesSelector({ coreAddress })
        )
      )
    )
    return daoAddresses.map((coreAddress, index) => ({
      coreAddress,
      proposalModules: proposalModules[index],
    }))
  },
})
