import { selector, selectorFamily, waitForAll } from 'recoil'

import { DaoCardInfo } from '@dao-dao/tstypes'
import { DaoDropdownInfo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '../atoms'
import { daoCardInfoSelector, daoDropdownInfoSelector } from './dao'

export const pinnedDaosDropdownInfoSelector = selector<DaoDropdownInfo[]>({
  key: 'pinnedDaosDropdownInfo',
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
