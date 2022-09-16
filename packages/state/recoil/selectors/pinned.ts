import {
  RecoilValueReadOnly,
  selector,
  selectorFamily,
  waitForAll,
} from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter/recoil'
import { ContractVersion, DaoCardInfo } from '@dao-dao/tstypes'
import { DaoDropdownInfo } from '@dao-dao/ui'
import { CWCORE_CONTRACT_NAME } from '@dao-dao/utils'

import {
  ConfigResponse as CwCoreV0_1_0ConfigResponse,
  DumpStateResponse as CwCoreV0_1_0DumpStateResponse,
} from '../../clients/cw-core/0.1.0'
import {
  ConfigResponse as CwCoreV0_2_0ConfigResponse,
  DumpStateResponse as CwCoreV0_2_0DumpStateResponse,
} from '../../clients/cw-core/0.2.0'
import { pinnedAddressesAtom } from '../atoms'
import { CwCoreV0_1_0Selectors, CwCoreV0_2_0Selectors } from './clients'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from './contract'
import { daoTvlSelector } from './price'
import { cwCoreProposalModulesSelector } from './proposal'

export const pinnedDaosDropdownInfoAtom = selector<DaoDropdownInfo[]>({
  key: 'pinnedDaosDropdownInfo',
  get: ({ get }) => {
    const pinnedAddresses = get(pinnedAddressesAtom)
    return get(
      waitForAll(
        pinnedAddresses.map((coreAddress) => daoDropdownInfoAtom(coreAddress))
      )
    ).filter(Boolean) as DaoDropdownInfo[]
  },
})

export const pinnedDaoCardInfoAtom = selectorFamily<
  DaoCardInfo[],
  { walletAddress?: string; daoUrlPrefix: string }
>({
  key: 'pinnedDaoCardInfo',
  get:
    ({ walletAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const pinnedAddresses = get(pinnedAddressesAtom)
      return get(
        waitForAll(
          pinnedAddresses.map((coreAddress) =>
            daoCardInfoAtom({ coreAddress, walletAddress, daoUrlPrefix })
          )
        )
      )
    },
})

export const daoDropdownInfoAtom: (
  coreAddress: string
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const version = get(contractVersionSelector(coreAddress))
      const config =
        version === ContractVersion.V0_2_0
          ? get(
              CwCoreV0_2_0Selectors.configSelector({
                contractAddress: coreAddress,
                params: [],
              })
            )
          : get(
              CwCoreV0_1_0Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )

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
        ),
      }
    },
})

export const daoCardInfoAtom = selectorFamily<
  DaoCardInfo,
  { coreAddress: string; walletAddress?: string; daoUrlPrefix: string }
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, walletAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const tvl = get(daoTvlSelector(coreAddress))

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              CwCoreV0_2_0Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const {
        config,
        created_timestamp, // Only present for v2.
        admin,
      }: CwCoreV0_1_0DumpStateResponse | CwCoreV0_2_0DumpStateResponse = get(
        // Both v1 and v2 have a dump_state query.
        CwCoreV0_2_0Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          params: [],
        })
      )

      const established =
        typeof created_timestamp === 'number'
          ? new Date(created_timestamp)
          : get(contractInstantiateTimeSelector(coreAddress))

      const proposalModules = get(cwCoreProposalModulesSelector(coreAddress))
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector(address)
          )
        )
      ).filter(Boolean) as number[]

      // Get parent DAO if exists.
      let parentDao: DaoCardInfo['parentDao']
      if (
        admin &&
        get(
          isContractSelector({
            contractAddress: admin,
            name: CWCORE_CONTRACT_NAME,
          })
        )
      ) {
        const {
          image_url,
        }: CwCoreV0_1_0ConfigResponse | CwCoreV0_2_0ConfigResponse = get(
          // Both v1 and v2 have a config query.
          CwCoreV0_2_0Selectors.configSelector({
            contractAddress: admin,
            params: [],
          })
        )

        parentDao = {
          coreAddress,
          imageUrl: image_url || undefined,
          href: daoUrlPrefix + admin,
        }
      }

      return {
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || undefined,
        href: daoUrlPrefix + coreAddress,
        established,
        isMember: walletVotingWeight > 0,
        tokenBalance: tvl,
        tokenSymbol: 'USDC',
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
        parentDao,
      }
    },
})
