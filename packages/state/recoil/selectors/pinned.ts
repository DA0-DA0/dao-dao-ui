import {
  RecoilValueReadOnly,
  selector,
  selectorFamily,
  waitForAll,
} from 'recoil'

import { ContractVersion } from '@dao-dao/tstypes'
import { DaoDropdownInfo } from '@dao-dao/ui'

import { pinnedAddressesAtom } from '../atoms'
import { CwCoreV0_1_0Selectors, CwCoreV0_2_0Selectors } from './clients'
import { contractVersionSelector } from './contract'

export const pinnedDaosDropdownInfoAtom = selector<DaoDropdownInfo[]>({
  key: 'pinnedDaosDropdownInfo',
  get: ({ get }) => {
    const pinnedAddresses = get(pinnedAddressesAtom)
    return pinnedAddresses
      .map((coreAddress) => get(daoDropdownInfoAtom(coreAddress)))
      .filter(Boolean) as DaoDropdownInfo[]
  },
})

export const daoDropdownInfoAtom: (
  coreAddress: string
) => RecoilValueReadOnly<DaoDropdownInfo | undefined> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const version = get(contractVersionSelector(coreAddress))
      const config =
        version === ContractVersion.V0_1_0
          ? get(
              CwCoreV0_1_0Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )
          : version === ContractVersion.V0_2_0
          ? get(
              CwCoreV0_2_0Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )
          : undefined
      if (!config) {
        return
      }

      // TODO: Get v2 SubDAOs.
      const subdaoAddresses: string[] =
        version === ContractVersion.V0_2_0 ? [] : []

      return {
        coreAddress,
        imageUrl: config.image_url || undefined,
        name: config.name,
        subdaos: get(
          waitForAll(
            subdaoAddresses.map((subdaoAddress) =>
              daoDropdownInfoAtom(subdaoAddress)
            )
          )
        ).filter(Boolean) as DaoDropdownInfo[],
      }
    },
})
