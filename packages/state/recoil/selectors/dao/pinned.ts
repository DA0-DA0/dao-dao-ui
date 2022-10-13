import { selector, selectorFamily, waitForAll } from 'recoil'

import { DaoCardInfo } from '@dao-dao/tstypes'
import { DaoDropdownInfo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '../../atoms'
import { cwCoreProposalModulesSelector } from '../proposal'
import { daoCardInfoSelector, daoDropdownInfoSelector } from './dao'

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

export const pinnedDaoCardInfosSelector = selectorFamily<
  DaoCardInfo[],
  { daoUrlPrefix: string }
>({
  key: 'pinnedDaoCardInfos',
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
      ).filter(Boolean) as DaoCardInfo[]
    },
})

export const pinnedDaosWithProposalModulesSelector = selector({
  key: 'pinnedDaosWithProposalModules',
  get: ({ get }) => {
    const daoAddresses = get(pinnedAddressesAtom)
    const proposalModules = get(
      waitForAll(
        daoAddresses.map((coreAddress) =>
          cwCoreProposalModulesSelector(coreAddress)
        )
      )
    )
    return daoAddresses.map((coreAddress, index) => ({
      coreAddress,
      proposalModules: proposalModules[index],
    }))
  },
})
