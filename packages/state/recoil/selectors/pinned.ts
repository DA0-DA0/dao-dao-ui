import { selector, selectorFamily, waitForAll } from 'recoil'

import { DaoCardInfo } from '@dao-dao/tstypes'
import { DaoDropdownInfo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '../atoms'
import { daoCardInfoSelector, daoDropdownInfoSelector } from './dao'
import { cwCoreProposalModulesSelector } from './proposal'

export const pinnedDaoDropdownInfosSelector = selector<DaoDropdownInfo[]>({
  key: 'pinnedDaoDropdownInfo',
  get: ({ get }) => {
    const pinnedAddresses = get(pinnedAddressesAtom)
    return get(
      waitForAll(
        pinnedAddresses.map((coreAddress) =>
          daoDropdownInfoSelector(coreAddress)
        )
      )
    ).filter(Boolean) as DaoDropdownInfo[]
  },
})

export const pinnedDaoCardInfoSelector = selectorFamily<
  DaoCardInfo[],
  { daoUrlPrefix: string }
>({
  key: 'pinnedDaoCardInfo',
  get:
    ({ daoUrlPrefix }) =>
    ({ get }) => {
      const pinnedAddresses = get(pinnedAddressesAtom)
      return get(
        waitForAll(
          pinnedAddresses.map((coreAddress) =>
            daoCardInfoSelector({ coreAddress, daoUrlPrefix })
          )
        )
      )
    },
})

export const pinnedDaosWithProposalModulesSelector = selector({
  key: 'pinnedDaosWithProposalModules',
  get: ({ get }) => {
    const daoDropdownInfos = get(pinnedDaoDropdownInfosSelector)
    const proposalModules = get(
      waitForAll(
        daoDropdownInfos.map(({ coreAddress }) =>
          cwCoreProposalModulesSelector(coreAddress)
        )
      )
    )
    return daoDropdownInfos.map((dao, index) => ({
      dao,
      proposalModules: proposalModules[index],
    }))
  },
})
