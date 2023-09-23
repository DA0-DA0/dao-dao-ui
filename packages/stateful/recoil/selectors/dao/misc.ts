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
  addressIsModuleSelector,
  contractInfoSelector,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  isContractSelector,
  queryContractIndexerSelector,
} from '@dao-dao/state'
import {
  ContractVersion,
  ContractVersionInfo,
  DaoInfo,
  Feature,
  ProposalModule,
  WithChainId,
} from '@dao-dao/types'
import {
  DaoVotingCw20StakedAdapterId,
  POLYTONE_CONFIG_PER_CHAIN,
  getChainForChainId,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  getSupportedChainConfig,
  getSupportedFeatures,
  isValidContractAddress,
} from '@dao-dao/utils'

import { fetchProposalModules } from '../../../utils/fetchProposalModules'
import { matchAdapter as matchVotingModuleAdapter } from '../../../voting-module-adapter'

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
            [
              // V1
              'cw-core',
              // V2
              'cwd-core',
              'dao-core',
            ].some((name) => info.contract.includes(name))
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
            isContractSelector({
              contractAddress: admin,
              chainId,
              names: [
                // V1
                'cw-core',
                // V2
                'cwd-core',
                'dao-core',
              ],
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
