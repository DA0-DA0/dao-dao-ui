import uniq from 'lodash.uniq'
import {
  RecoilValueReadOnly,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoVotingCw20StakedSelectors,
  PolytoneProxySelectors,
  accountsSelector,
  addressIsModuleSelector,
  contractInfoSelector,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isDaoSelector,
  queryContractIndexerSelector,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import {
  ContractVersion,
  ContractVersionInfo,
  DaoInfo,
  DaoPageMode,
  DaoWithDropdownVetoableProposalList,
  DaoWithVetoableProposals,
  Feature,
  IndexerDaoWithVetoableProposals,
  ProposalModule,
  StatefulProposalLineProps,
  WithChainId,
} from '@dao-dao/types'
import {
  DAO_CORE_CONTRACT_NAMES,
  DaoVotingCw20StakedAdapterId,
  POLYTONE_CONFIG_PER_CHAIN,
  VETOABLE_DAOS_ITEM_KEY_PREFIX,
  getChainForChainId,
  getDaoProposalPath,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  getSupportedChainConfig,
  getSupportedFeatures,
  isValidContractAddress,
} from '@dao-dao/utils'

import { fetchProposalModules } from '../../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../../voting-module-adapter'
import { daoDropdownInfoSelector } from './cards'

export const daoCoreProposalModulesSelector = selectorFamily<
  ProposalModule[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCoreProposalModules',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(chainId, coreAddress, coreVersion)
    },
})

// Gets CW20 governance token address if this DAO uses the cw20-staked voting
// module adapter.
export const daoCw20GovernanceTokenAddressSelector = selectorFamily<
  string | undefined,
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoCw20GovernanceTokenAddress',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const votingModuleAddress = get(
        DaoCoreV2Selectors.votingModuleSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      const votingModuleInfo = votingModuleAddress
        ? get(
            contractInfoSelector({
              contractAddress: votingModuleAddress,
              chainId,
            })
          )
        : undefined

      let usesCw20VotingModule
      try {
        usesCw20VotingModule =
          !!votingModuleInfo &&
          matchVotingModuleAdapter(votingModuleInfo.info.contract)?.id ===
            DaoVotingCw20StakedAdapterId
      } catch {
        usesCw20VotingModule = false
      }

      const cw20GovernanceTokenAddress =
        votingModuleAddress && usesCw20VotingModule
          ? get(
              DaoVotingCw20StakedSelectors.tokenContractSelector({
                contractAddress: votingModuleAddress,
                chainId,
                params: [],
              })
            )
          : undefined

      return cw20GovernanceTokenAddress
    },
})

// Retrieve all potential SubDAOs of the DAO from the indexer.
export const daoPotentialSubDaosSelector = selectorFamily<
  string[],
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoPotentialSubDaos',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const potentialSubDaos: {
        contractAddress: string
        info: ContractVersionInfo
      }[] = get(
        queryContractIndexerSelector({
          chainId,
          contractAddress: coreAddress,
          formula: 'daoCore/potentialSubDaos',
          required: true,
        })
      )

      // Filter out those that do not appear to be DAO contracts and also the
      // contract itself since it is probably its own admin.
      return potentialSubDaos
        .filter(
          ({ contractAddress, info }) =>
            contractAddress !== coreAddress &&
            DAO_CORE_CONTRACT_NAMES.some((name) => info.contract.includes(name))
        )
        .map(({ contractAddress }) => contractAddress)
    },
})

export const daoInfoSelector: (param: {
  chainId: string
  coreAddress: string
  ignoreAdmins?: string[] | undefined
}) => RecoilValueReadOnly<DaoInfo> = selectorFamily({
  key: 'daoInfo',
  get:
    ({ chainId, coreAddress, ignoreAdmins }) =>
    ({ get }) => {
      const dumpState = get(
        DaoCoreV2Selectors.dumpStateSelector({
          contractAddress: coreAddress,
          chainId,
          params: [],
        })
      )
      if (!dumpState) {
        throw new Error('DAO failed to dump state.')
      }

      const [
        // Non-loadables
        [
          coreVersion,
          votingModuleInfo,
          proposalModules,
          created,
          _items,
          polytoneProxies,
          accounts,
        ],
        // Loadables
        [isActiveResponse, activeThresholdResponse],
      ] = get(
        waitForAll([
          // Non-loadables
          waitForAll([
            contractVersionSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            contractInfoSelector({
              contractAddress: dumpState.voting_module,
              chainId,
            }),
            daoCoreProposalModulesSelector({
              coreAddress,
              chainId,
            }),
            contractInstantiateTimeSelector({
              address: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.listAllItemsSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            DaoCoreV2Selectors.polytoneProxiesSelector({
              contractAddress: coreAddress,
              chainId,
            }),
            accountsSelector({
              address: coreAddress,
              chainId,
            }),
          ]),
          // Loadables
          waitForAllSettled([
            // All voting modules use the same active threshold queries, so it's
            // safe to use the cw20-staked selector.
            DaoVotingCw20StakedSelectors.isActiveSelector({
              contractAddress: dumpState.voting_module,
              chainId,
              params: [],
            }),
            DaoVotingCw20StakedSelectors.activeThresholdSelector({
              contractAddress: dumpState.voting_module,
              chainId,
              params: [],
            }),
          ]),
        ])
      )

      const votingModuleContractName =
        votingModuleInfo?.info.contract || 'fallback'

      // Some voting modules don't support the isActive query, so if the query
      // fails, assume active.
      const isActive =
        isActiveResponse.state === 'hasError' ||
        (isActiveResponse.state === 'hasValue' &&
          isActiveResponse.contents.active)
      const activeThreshold =
        (activeThresholdResponse.state === 'hasValue' &&
          activeThresholdResponse.contents.active_threshold) ||
        null

      // Convert items list into map.
      const items = _items.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {} as Record<string, string>
      )

      const { admin } = dumpState

      let parentDaoInfo
      let parentSubDaos
      if (admin && admin !== coreAddress) {
        if (
          isValidContractAddress(
            admin,
            getChainForChainId(chainId).bech32_prefix
          ) &&
          get(
            isDaoSelector({
              address: admin,
              chainId,
            })
          ) &&
          !ignoreAdmins?.includes(admin)
        ) {
          parentDaoInfo = get(
            daoInfoSelector({
              chainId,
              coreAddress: admin,
              ignoreAdmins: [...(ignoreAdmins ?? []), coreAddress],
            })
          )

          if (parentDaoInfo.supportedFeatures[Feature.SubDaos]) {
            parentSubDaos = get(
              DaoCoreV2Selectors.listAllSubDaosSelector({
                contractAddress: admin,
                chainId,
              })
            ).map(({ addr }) => addr)
          }
        } else if (
          get(
            addressIsModuleSelector({
              chainId,
              address: admin,
            })
          )
        ) {
          // Chain module account.
          const chainConfig = getSupportedChainConfig(chainId)
          parentDaoInfo = chainConfig && {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            admin: '',
            registeredSubDao: false,
          }
        }
      }

      const daoInfo: DaoInfo = {
        chainId,
        coreAddress,
        coreVersion,
        supportedFeatures: getSupportedFeatures(coreVersion),
        votingModuleAddress: dumpState.voting_module,
        votingModuleContractName,
        proposalModules,
        name: dumpState.config.name,
        description: dumpState.config.description,
        imageUrl: dumpState.config.image_url || null,
        created,
        isActive,
        activeThreshold,
        items,
        polytoneProxies,
        accounts,
        parentDao: parentDaoInfo
          ? {
              chainId: parentDaoInfo.chainId,
              coreAddress: parentDaoInfo.coreAddress,
              coreVersion: parentDaoInfo.coreVersion,
              name: parentDaoInfo.name,
              imageUrl: parentDaoInfo.imageUrl || null,
              parentDao: parentDaoInfo.parentDao,
              admin: parentDaoInfo.admin,
              registeredSubDao: parentSubDaos?.includes(coreAddress) ?? false,
            }
          : null,
        admin,
      }

      return daoInfo
    },
})

export const daoInfoFromPolytoneProxySelector = selectorFamily<
  | {
      chainId: string
      coreAddress: string
      info: DaoInfo
    }
  | undefined,
  WithChainId<{ proxy: string }>
>({
  key: 'daoInfoFromPolytoneProxy',
  get:
    ({ proxy, chainId }) =>
    ({ get }) => {
      // Get voice for this proxy on destination chain.
      const voice = get(
        PolytoneProxySelectors.instantiatorSelector({
          chainId,
          contractAddress: proxy,
          params: [],
        })
      )
      if (!voice) {
        return
      }

      // Get source DAO core address for this voice.
      const coreAddress = get(
        DaoCoreV2Selectors.coreAddressForPolytoneProxySelector({
          chainId,
          voice,
          proxy,
        })
      )
      if (!coreAddress) {
        return
      }

      // Get source chain ID, where the note lives for this voice.
      const srcChainId = POLYTONE_CONFIG_PER_CHAIN.find(([, config]) =>
        Object.entries(config).some(
          ([destChainId, connection]) =>
            destChainId === chainId && connection.voice === voice
        )
      )?.[0]
      if (!srcChainId) {
        return
      }

      // Get DAO info on source chain.
      const info = get(
        daoInfoSelector({
          chainId: srcChainId,
          coreAddress,
        })
      )

      return {
        chainId: srcChainId,
        coreAddress,
        info,
      }
    },
})

/**
 * DAOs this DAO has enabled vetoable proposal listing for.
 */
export const daoVetoableDaosSelector = selectorFamily<
  { chainId: string; coreAddress: string }[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoVetoableDaos',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) =>
      get(
        DaoCoreV2Selectors.listAllItemsWithPrefixSelector({
          chainId,
          contractAddress: coreAddress,
          prefix: VETOABLE_DAOS_ITEM_KEY_PREFIX,
        })
      ).map(([key]) => {
        const [chainId, coreAdress] = key
          .substring(VETOABLE_DAOS_ITEM_KEY_PREFIX.length)
          .split(':')

        return {
          chainId,
          coreAddress: coreAdress,
        }
      }),
})

/**
 * Proposals which this DAO can currently veto.
 */
export const daosWithVetoableProposalsSelector = selectorFamily<
  DaoWithVetoableProposals[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daosWithVetoableProposals',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      // Refresh this when all proposals refresh.
      const id = get(refreshProposalsIdAtom)

      // TODO: use accounts once refactor is complete
      const accounts = [
        [chainId, coreAddress],
        ...Object.entries(
          get(
            DaoCoreV2Selectors.polytoneProxiesSelector({
              chainId,
              contractAddress: coreAddress,
            })
          )
        ),
      ]

      // Load DAOs this DAO has enabled vetoable proposal listing for.
      const vetoableDaos = get(
        daoVetoableDaosSelector({
          chainId,
          coreAddress,
        })
      )

      const daoVetoableProposalsPerChain = (
        get(
          waitForAll(
            accounts.map(([chainId, contractAddress]) =>
              queryContractIndexerSelector({
                chainId,
                contractAddress,
                formula: 'daoCore/vetoableProposals',
                required: true,
                id,
              })
            )
          )
        ) as IndexerDaoWithVetoableProposals[][]
      )
        .flatMap((data, index) =>
          data.map((d) => ({
            chainId: accounts[index][0],
            ...d,
          }))
        )
        .filter(({ chainId, dao }) =>
          vetoableDaos.some(
            (vetoable) =>
              vetoable.chainId === chainId && vetoable.coreAddress === dao
          )
        )

      const uniqueChainsAndDaos = uniq(
        daoVetoableProposalsPerChain.map(
          ({ chainId, dao }) => `${chainId}:${dao}`
        )
      )

      const daoProposalModules = get(
        waitForAllSettled(
          uniqueChainsAndDaos.map((chainAndDao) =>
            daoCoreProposalModulesSelector({
              chainId: chainAndDao.split(':')[0],
              coreAddress: chainAndDao.split(':')[1],
            })
          )
        )
      )

      return uniqueChainsAndDaos.flatMap((chainAndDao, index) => {
        const proposalModules = daoProposalModules[index]

        return proposalModules.state === 'hasValue'
          ? {
              chainId: chainAndDao.split(':')[0],
              dao: chainAndDao.split(':')[1],
              proposalModules: proposalModules.contents,
              proposalsWithModule: daoVetoableProposalsPerChain.find(
                (vetoable) =>
                  `${vetoable.chainId}:${vetoable.dao}` === chainAndDao
              )!.proposalsWithModule,
            }
          : []
      })
    },
})

/**
 * Proposals which this DAO can currently veto grouped by DAO with dropdown
 * info.
 */
export const daosWithDropdownVetoableProposalListSelector = selectorFamily<
  DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>[],
  WithChainId<{ coreAddress: string; daoPageMode: DaoPageMode }>
>({
  key: 'daosWithDropdownVetoableProposalList',
  get:
    ({ daoPageMode, ...params }) =>
    ({ get }) => {
      const daosWithVetoableProposals = get(
        daosWithVetoableProposalsSelector(params)
      )

      const daoDropdownInfos = get(
        waitForAllSettled(
          daosWithVetoableProposals.map(({ chainId, dao }) =>
            daoDropdownInfoSelector({
              chainId,
              coreAddress: dao,
            })
          )
        )
      )

      return daosWithVetoableProposals.flatMap(
        ({
          chainId,
          dao,
          proposalModules,
          proposalsWithModule,
        }):
          | DaoWithDropdownVetoableProposalList<StatefulProposalLineProps>
          | [] => {
          const dropdownInfo = daoDropdownInfos
            .find(
              (info) =>
                info.state === 'hasValue' &&
                info.contents.chainId === chainId &&
                info.contents.coreAddress === dao
            )
            ?.valueMaybe()

          if (!dropdownInfo) {
            return []
          }

          return {
            dao: dropdownInfo,
            proposals: proposalsWithModule.flatMap(
              ({ proposalModule: { prefix }, proposals }) =>
                proposals.map(
                  ({ id }): StatefulProposalLineProps => ({
                    chainId,
                    coreAddress: dao,
                    proposalModules,
                    proposalId: `${prefix}${id}`,
                    proposalViewUrl: getDaoProposalPath(
                      daoPageMode,
                      dao,
                      `${prefix}${id}`
                    ),
                    isPreProposeProposal: false,
                  })
                )
            ),
          }
        }
      )
    },
})
