import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  DaoCoreV2Selectors,
  addressIsModuleSelector,
  contractInfoSelector,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  daoTvlSelector,
  isDaoSelector,
} from '@dao-dao/state'
import {
  ContractVersion,
  DaoCardInfo,
  DaoCardInfoLazyData,
  DaoDropdownInfo,
  DaoInfo,
  Feature,
  IndexerDumpState,
  WithChainId,
} from '@dao-dao/types'
import {
  ConfigResponse as CwCoreV1ConfigResponse,
  DumpStateResponse as CwCoreV1DumpStateResponse,
} from '@dao-dao/types/contracts/CwCore.v1'
import {
  ConfigResponse as DaoCoreV2ConfigResponse,
  DumpStateResponse as DaoCoreV2DumpStateResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import {
  CHAIN_SUBDAOS,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getSupportedChainConfig,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { proposalModuleAdapterProposalCountSelector } from '../../../proposal-module-adapter'
import {
  daoCoreProposalModulesSelector,
  daoCw20GovernanceTokenAddressSelector,
  daoInfoSelector,
} from './misc'

export const daoCardInfoSelector = selectorFamily<
  DaoCardInfo | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCardInfo',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const dumpedState:
        | CwCoreV1DumpStateResponse
        | IndexerDumpState
        | DaoCoreV2DumpStateResponse
        | undefined = get(
        // Both v1 and v2 have a dump_state query.
        DaoCoreV2Selectors.dumpStateSelector({
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

      // Indexer may return a createdAt string, in which case don't query again.
      const established: Date | undefined =
        'createdAt' in dumpedState &&
        (dumpedState as IndexerDumpState).createdAt
          ? new Date((dumpedState as IndexerDumpState).createdAt)
          : get(
              contractInstantiateTimeSelector({ address: coreAddress, chainId })
            )

      const polytoneProxies = get(
        DaoCoreV2Selectors.polytoneProxiesSelector({
          chainId,
          contractAddress: coreAddress,
        })
      )

      // Get parent DAO if exists.
      let parentDao: DaoCardInfo['parentDao']
      if (
        admin &&
        // A DAO without a parent DAO may be its own admin.
        admin !== coreAddress
      ) {
        if (
          // If address is a DAO contract.
          get(
            isDaoSelector({
              address: admin,
              chainId,
            })
          )
        ) {
          // Indexer may return `adminInfo`, in which case don't query again. If
          // null, there is no admin to load. Otherwise. If not null, query
          // chain.
          if ('adminInfo' in dumpedState) {
            const { adminInfo } = dumpedState as IndexerDumpState
            if (adminInfo) {
              const {
                admin: adminAdmin,
                info,
                config: { name, image_url },
                registeredSubDao = false,
              } = adminInfo
              const coreVersion = info && parseContractVersion(info.version)

              if (coreVersion) {
                parentDao = {
                  chainId,
                  coreAddress: admin,
                  coreVersion,
                  name,
                  imageUrl: image_url || getFallbackImage(admin),
                  admin: adminAdmin ?? '',
                  registeredSubDao,
                }
              }
            }

            // If indexer didn't return adminInfo, query chain.
          } else {
            const adminAdmin = get(
              DaoCoreV2Selectors.adminSelector({
                contractAddress: admin,
                chainId,
                params: [],
              })
            )
            const {
              info: { version },
            } = get(
              contractInfoSelector({
                contractAddress: admin,
                chainId,
              })
            )
            const adminVersion = parseContractVersion(version)

            if (adminVersion) {
              const {
                name,
                image_url,
              }: CwCoreV1ConfigResponse | DaoCoreV2ConfigResponse = get(
                // Both v1 and v2 have a config query.
                DaoCoreV2Selectors.configSelector({
                  contractAddress: admin,
                  chainId,
                  params: [],
                })
              )

              // Check if admin has registered the current DAO as a SubDAO.
              const registeredSubDao = isFeatureSupportedByVersion(
                Feature.SubDaos,
                adminVersion
              )
                ? get(
                    DaoCoreV2Selectors.listAllSubDaosSelector({
                      contractAddress: admin,
                      chainId,
                    })
                  ).some(({ addr }) => addr === coreAddress)
                : false

              parentDao = {
                chainId,
                coreAddress: admin,
                coreVersion: adminVersion,
                name,
                imageUrl: image_url || getFallbackImage(admin),
                admin: adminAdmin ?? '',
                registeredSubDao,
              }
            }
          }
        } else if (
          get(
            addressIsModuleSelector({
              chainId,
              address: admin,
              moduleName: 'gov',
            })
          )
        ) {
          // Chain module account.
          const chainConfig = getSupportedChainConfig(chainId)
          parentDao = chainConfig && {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            admin: '',
            registeredSubDao: !!CHAIN_SUBDAOS[chainId]?.includes(coreAddress),
          }
        }
      }

      return {
        chainId,
        coreAddress,
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        polytoneProxies,
        established,
        parentDao,
        tokenDecimals: 6,
        tokenSymbol: '',
        showingEstimatedUsdValue: true,
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
              DaoCoreV2Selectors.votingPowerAtHeightSelector({
                contractAddress: coreAddress,
                chainId,
                params: [{ address: walletAddress }],
              })
            ).power
          )
        : 0

      const proposalModules = get(
        daoCoreProposalModulesSelector({
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
      const subDaos = get(
        DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
          chainId,
        })
      )

      return get(
        waitForAll(
          subDaos.map(({ chainId, addr }) =>
            daoCardInfoSelector({
              chainId,
              coreAddress: addr,
            })
          )
        )
      ).filter(Boolean) as DaoCardInfo[]
    },
})

export const subDaoInfosSelector = selectorFamily<
  DaoInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'subDaoInfos',
  get:
    ({ coreAddress: contractAddress, chainId }) =>
    ({ get }) => {
      const subDaos = get(
        DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress,
          chainId,
        })
      )

      return get(
        waitForAll(
          subDaos.map(({ chainId, addr }) =>
            daoInfoSelector({
              chainId,
              coreAddress: addr,
            })
          )
        )
      )
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
        DaoCoreV2Selectors.configSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )

      const subDaos = isFeatureSupportedByVersion(Feature.SubDaos, version)
        ? get(
            DaoCoreV2Selectors.listAllSubDaosSelector({
              contractAddress: coreAddress,
              chainId,
            })
          )
        : []

      return {
        chainId,
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        name: config.name,
        subDaos: noSubDaos
          ? []
          : get(
              waitForAll(
                subDaos.map(({ chainId, addr: subDaoAddress }) =>
                  daoDropdownInfoSelector({
                    chainId,
                    coreAddress: subDaoAddress,
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
