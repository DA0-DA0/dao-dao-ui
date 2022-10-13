import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import { proposalModuleAdapterProposalCountSelector } from '@dao-dao/proposal-module-adapter'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
} from '@dao-dao/tstypes'
import {
  ConfigResponse as CwCoreV1ConfigResponse,
  DumpStateResponse as CwCoreV1DumpStateResponse,
} from '@dao-dao/tstypes/contracts/CwCore.v1'
import {
  ConfigResponse as CwdCoreV2ConfigResponse,
  DumpStateResponse as CwdCoreV2DumpStateResponse,
} from '@dao-dao/tstypes/contracts/CwdCore.v2'
import { DaoDropdownInfo } from '@dao-dao/ui'
import {
  CWCOREV1_CONTRACT_NAME,
  CWCOREV2_CONTRACT_NAME,
  getFallbackImage,
} from '@dao-dao/utils'

import { CwCoreV1Selectors, CwdCoreV2Selectors } from '../clients'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from '../contract'
import { daoTvlSelector } from '../price'
import { cwCoreProposalModulesSelector } from '../proposal'

export const daoDropdownInfoSelector: (
  coreAddress: string
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const version = get(contractVersionSelector(coreAddress))
      const config =
        version === ContractVersion.V0_1_0
          ? get(
              CwCoreV1Selectors.configSelector({
                contractAddress: coreAddress,
              })
            )
          : get(
              CwdCoreV2Selectors.configSelector({
                contractAddress: coreAddress,
                params: [],
              })
            )

      const subdaoAddresses: string[] =
        version === ContractVersion.V0_1_0
          ? []
          : get(
              CwdCoreV2Selectors.listAllSubDaosSelector({
                contractAddress: coreAddress,
              })
            ).map(({ addr }) => addr)

      return {
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
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
  DaoCardInfo | undefined,
  string
>({
  key: 'daoCardInfo',
  get:
    (coreAddress) =>
    ({ get }) => {
      const dumpedState:
        | CwCoreV1DumpStateResponse
        | CwdCoreV2DumpStateResponse
        | undefined = get(
        // Both v1 and v2 have a dump_state query.
        CwdCoreV2Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          params: [],
        })
      )
      // If undefined, probably invalid contract address.
      if (!dumpedState) {
        return
      }

      const {
        config,
        created_timestamp, // Only present for v2.
        admin,
      } = dumpedState

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
        (get(
          isContractSelector({
            contractAddress: admin,
            name: CWCOREV1_CONTRACT_NAME,
          })
        ) ||
          get(
            isContractSelector({
              contractAddress: admin,
              name: CWCOREV2_CONTRACT_NAME,
            })
          ))
      ) {
        const {
          name,
          image_url,
        }: CwCoreV1ConfigResponse | CwdCoreV2ConfigResponse = get(
          // Both v1 and v2 have a config query.
          CwdCoreV2Selectors.configSelector({
            contractAddress: admin,
            params: [],
          })
        )

        parentDao = {
          coreAddress: admin,
          name,
          imageUrl: image_url || getFallbackImage(admin),
        }
      }

      return {
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        established,
        parentDao,
        tokenSymbol: 'USDC',
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
              CwdCoreV2Selectors.votingPowerAtHeightSelector({
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
        proposalCount: proposalModuleCounts.reduce(
          (acc, curr) => acc + curr,
          0
        ),
      }
    },
})

export const subDaoCardInfosSelector = selectorFamily<DaoCardInfo[], string>({
  key: 'subDaoCardInfos',
  get:
    (contractAddress) =>
    ({ get }) => {
      const subdaos = get(
        CwdCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
        })
      )

      return get(
        waitForAll(subdaos.map(({ addr }) => daoCardInfoSelector(addr)))
      ).filter(Boolean) as DaoCardInfo[]
    },
})
