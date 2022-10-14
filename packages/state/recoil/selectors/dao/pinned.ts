import { selector, waitForAll } from 'recoil'

import { DaoDropdownInfo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '../../atoms'
import { cwCoreProposalModulesSelector } from '../proposal'
import { daoDropdownInfoSelector } from './info'

// TODO(multichain): Store pinned addresses with their chain ID in one list.
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

// TODO(multichain): Store pinned addresses with their chain ID in one list.
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
