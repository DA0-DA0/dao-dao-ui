import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
} from '@dao-dao/tstypes'
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
import { CwCoreV0_1_0Selectors, CwCoreV0_2_0Selectors } from './clients'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from './contract'
import { daoTvlSelector } from './price'
import { cwCoreProposalModulesSelector } from './proposal'

export const daoDropdownInfoSelector: (
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

      const subdaoAddresses: string[] =
        version === ContractVersion.V0_2_0
          ? get(
              CwCoreV0_2_0Selectors.listAllSubDaosSelector({
                contractAddress: coreAddress,
              })
            ).map(({ addr }) => addr)
          : []

      return {
        coreAddress,
        imageUrl: config.image_url || undefined,
        name: config.name,
        subdaos: get(
          waitForAll(
            subdaoAddresses.map((subdaoAddress) =>
              daoDropdownInfoSelector(subdaoAddress)
            )
          )
        ),
      }
    },
})

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo,
  { coreAddress: string; daoUrlPrefix: string }
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, daoUrlPrefix }) =>
    ({ get }) => {
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

      // Get parent DAO if exists.
      let parentDao: DaoCardInfo['parentDao']
      if (
        admin &&
        // A DAO without a parent DAO may be its own admin.
        admin !== coreAddress &&
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
        parentDao,
        lazyData: { loading: true },
      }
    },
})

export const daoCardInfoLazyDataSelector = selectorFamily<
  DaoCardInfoLazyData,
  { coreAddress: string; walletAddress?: string }
>({
  key: 'daoCardInfoLazyData',
  get:
    ({ coreAddress, walletAddress }) =>
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

      const proposalModules = get(cwCoreProposalModulesSelector(coreAddress))
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector(address)
          )
        )
      ).filter(Boolean) as number[]

      return {
        isMember: walletVotingWeight > 0,
        tokenBalance: tvl,
        tokenSymbol: 'USDC',
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
      }
    },
})

export const subDaoCardInfosSelector = selectorFamily<
  DaoCardInfo[],
  { coreAddress: string; daoUrlPrefix: string }
>({
  key: 'subDaoCardInfos',
  get:
    ({ coreAddress, daoUrlPrefix }) =>
    ({ get }) => {
      const subdaos = get(
        CwCoreV0_2_0Selectors.listAllSubDaosSelector({
          contractAddress: coreAddress,
        })
      )

      return get(
        waitForAll(
          subdaos.map(({ addr }) =>
            daoCardInfoSelector({
              coreAddress: addr,
              daoUrlPrefix,
            })
          )
        )
      )
    },
})
