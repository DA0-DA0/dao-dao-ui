import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  CwdCoreV2Selectors,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  daoTvlSelector,
  isContractSelector,
} from '@dao-dao/state'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
  DaoDropdownInfo,
  WithChainId,
} from '@dao-dao/types'
import { ConfigResponse as CwCoreV1ConfigResponse } from '@dao-dao/types/contracts/CwCore.v1'
import { ConfigResponse as CwdCoreV2ConfigResponse } from '@dao-dao/types/contracts/CwdCore.v2'
import {
  CHAIN_ID,
  CWCOREV1_CONTRACT_NAME,
  CWDCOREV2_CONTRACT_NAME,
  getFallbackImage,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../../proposal-module-adapter'
import {
  cwCoreProposalModulesSelector,
  daoCw20GovernanceTokenAddressSelector,
} from './misc'

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, chainId = CHAIN_ID }) =>
    ({ get }) => {
      const dumpedState = get(
        // Both v1 and v2 have a dump_state query.
        CwdCoreV2Selectors.reducedDumpStateSelector({
          chainId,
          contractAddress: coreAddress,
          params: [],
        })
      )
      // If undefined, probably invalid contract address.
      if (!dumpedState) {
        return
      }

      const { config, admin } = dumpedState

      const established = get(
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

export const daoCardInfoLazyDataSelector = selectorFamily<
  DaoCardInfoLazyData,
  WithChainId<{
    coreAddress: string
    walletAddress?: string
  }>
>({
  key: 'daoCardInfoLazyData',
  get:
    ({ coreAddress, chainId, walletAddress }) =>
    ({ get }) => {
      const cw20GovernanceTokenAddress = get(
        daoCw20GovernanceTokenAddressSelector({
          coreAddress,
          chainId,
        })
      )

      const tvl = get(
        daoTvlSelector({
          coreAddress,
          chainId,
          cw20GovernanceTokenAddress,
        })
      ).amount

      const walletVotingWeight = walletAddress
        ? Number(
            get(
              CwdCoreV2Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                chainId,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(
        cwCoreProposalModulesSelector({
          coreAddress,
          chainId,
        })
      )
      const proposalModuleCounts = get(
        waitForAll(
          proposalModules.map(({ address }) =>
            proposalModuleAdapterProposalCountSelector({
              proposalModuleAddress: address,
              chainId,
            })
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
      const config = get(
        CwdCoreV2Selectors.configSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )

      const subDaoAddresses: string[] =
        version === ContractVersion.V1
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
