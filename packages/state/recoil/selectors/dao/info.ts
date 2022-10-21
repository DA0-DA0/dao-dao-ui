import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import { ContractVersion, DaoCardInfo, WithChainId } from '@dao-dao/types'
import {
  ConfigResponse as CwCoreV1ConfigResponse,
  DumpStateResponse as CwCoreV1DumpStateResponse,
} from '@dao-dao/types/contracts/CwCore.v1'
import {
  ConfigResponse as CwdCoreV2ConfigResponse,
  DumpStateResponse as CwdCoreV2DumpStateResponse,
} from '@dao-dao/types/contracts/CwdCore.v2'
import { DaoDropdownInfo } from '@dao-dao/ui'
import {
  CHAIN_ID,
  CWCOREV1_CONTRACT_NAME,
  CWDCOREV2_CONTRACT_NAME,
  getFallbackImage,
} from '@dao-dao/utils'

import { CwCoreV1Selectors, CwdCoreV2Selectors } from '../clients'
import {
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
} from '../contract'

export const daoDropdownInfoSelector: (
  params: WithChainId<{
    coreAddress: string
    // Catch and prevent cycles.
    parents?: string[]
    noSubDaos?: boolean
  }>
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    ({ coreAddress, chainId, parents, noSubDaos }) =>
    ({ get }) => {
      const version = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )
      const config =
        version === ContractVersion.V0_1_0
          ? get(
              CwCoreV1Selectors.configSelector({
                contractAddress: coreAddress,
                chainId,
              })
            )
          : get(
              CwdCoreV2Selectors.configSelector({
                contractAddress: coreAddress,
                chainId,
                params: [],
              })
            )

      const subDaoAddresses: string[] =
        version === ContractVersion.V0_1_0
          ? []
          : get(
              CwdCoreV2Selectors.listAllSubDaosSelector({
                contractAddress: coreAddress,
                chainId,
              })
            ).map(({ addr }) => addr)

      return {
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        name: config.name,
        subdaos: noSubDaos
          ? []
          : get(
              waitForAll(
                subDaoAddresses.map((subDaoAddress) =>
                  daoDropdownInfoSelector({
                    coreAddress: subDaoAddress,
                    chainId,
                    parents: [...(parents ?? []), coreAddress],
                    // Prevents cycles. If one of our children is also our
                    // ancestor, don't let it load any children, but still load
                    // it so we can see the cycle exists.
                    noSubDaos: !!parents?.includes(subDaoAddress),
                  })
                )
              )
            ),
      }
    },
})

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, chainId = CHAIN_ID }) =>
    ({ get }) => {
      const dumpedState:
        | CwCoreV1DumpStateResponse
        | CwdCoreV2DumpStateResponse
        | undefined = get(
        // Both v1 and v2 have a dump_state query.
        CwdCoreV2Selectors.dumpStateSelector({
          chainId,
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
          : get(
              contractInstantiateTimeSelector({ address: coreAddress, chainId })
            )

      // Get parent DAO if exists.
      let parentDao: DaoCardInfo['parentDao']
      if (
        admin &&
        // A DAO without a parent DAO may be its own admin.
        admin !== coreAddress &&
        (get(
          isContractSelector({
            contractAddress: admin,
            chainId,
            name: CWCOREV1_CONTRACT_NAME,
          })
        ) ||
          get(
            isContractSelector({
              contractAddress: admin,
              chainId,
              name: CWDCOREV2_CONTRACT_NAME,
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
            chainId,
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
        chainId,
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        established,
        parentDao,
        tokenDecimals: 6,
        tokenSymbol: 'USDC',
        lazyData: { loading: true },
      }
    },
})

export const subDaoCardInfosSelector = selectorFamily<
  DaoCardInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'subDaoCardInfos',
  get:
    ({ coreAddress: contractAddress, chainId }) =>
    ({ get }) => {
      const subdaos = get(
        CwdCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
          chainId,
        })
      )

      return get(
        waitForAll(
          subdaos.map(({ addr }) =>
            daoCardInfoSelector({ coreAddress: addr, chainId })
          )
        )
      ).filter(Boolean) as DaoCardInfo[]
    },
})
