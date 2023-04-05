import { fromBech32 } from '@cosmjs/encoding'
import { RecoilValueReadOnly, selectorFamily } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoVotingCw20StakedSelectors,
  contractInstantiateTimeSelector,
  contractVersionSelector,
  queryContractIndexerSelector,
} from '@dao-dao/state'
import {
  ContractVersion,
  ContractVersionInfo,
  DaoInfo,
  ProposalModule,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_ID,
  CHAIN_PREFIX_ID_MAP,
  DaoVotingCw20StakedAdapterId,
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

      return await fetchProposalModules(
        chainId ?? CHAIN_ID,
        coreAddress,
        coreVersion
      )
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
      // All `info` queries are the same, so just use core's info query.
      const votingModuleInfo = votingModuleAddress
        ? get(
            DaoCoreV2Selectors.infoSelector({
              contractAddress: votingModuleAddress,
              chainId,
              params: [],
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
  coreAddress: string
  ignoreAdmins?: string[] | undefined
}) => RecoilValueReadOnly<DaoInfo> = selectorFamily({
  key: 'daoInfo',
  get:
    ({ coreAddress, ignoreAdmins }) =>
    ({ get }) => {
      // Get chain for the DAO based on its address prefix.
      const bech32Prefix = fromBech32(coreAddress).prefix

      // If address prefix is not recognized, error. We'll retrieve the chain ID
      // from the DAO's address prefix, so if the prefix is not recognized, we
      // can't get the chain ID.
      if (!(bech32Prefix in CHAIN_PREFIX_ID_MAP)) {
        throw new Error(`DAO address prefix ${bech32Prefix} is not recognized.`)
      }
      const chainId =
        CHAIN_PREFIX_ID_MAP[bech32Prefix as keyof typeof CHAIN_PREFIX_ID_MAP]

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

      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      // All `info` queries are the same, so just use DAO core's info query.
      const votingModuleInfo = get(
        DaoCoreV2Selectors.infoSelector({
          contractAddress: dumpState.voting_module,
          chainId,
          params: [],
        })
      )
      const votingModuleContractName =
        votingModuleInfo?.info.contract || 'fallback'

      const proposalModules = get(
        daoCoreProposalModulesSelector({
          coreAddress,
          chainId,
        })
      )

      const created = get(
        contractInstantiateTimeSelector({
          address: coreAddress,
          chainId,
        })
      )

      const _items = get(
        DaoCoreV2Selectors.listAllItemsSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )
      // Convert items list into map.
      const items = _items.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {} as Record<string, string>
      )

      let parentDaoInfo
      let parentSubDaos
      if (
        dumpState.admin &&
        dumpState.admin !== coreAddress &&
        isValidContractAddress(dumpState.admin, bech32Prefix) &&
        !ignoreAdmins?.includes(dumpState.admin)
      ) {
        parentDaoInfo = get(
          daoInfoSelector({
            coreAddress: dumpState.admin,
            ignoreAdmins: [...(ignoreAdmins ?? []), coreAddress],
          })
        )

        // Only v2 DAOs can have SubDAOs.
        if (parentDaoInfo.coreVersion !== ContractVersion.V1) {
          parentSubDaos = get(
            DaoCoreV2Selectors.listAllSubDaosSelector({
              contractAddress: dumpState.admin,
              chainId,
            })
          ).map(({ addr }) => addr)
        }
      }

      return {
        chainId,
        bech32Prefix,
        coreAddress,
        coreVersion,
        votingModuleAddress: dumpState.voting_module,
        votingModuleContractName,
        proposalModules,
        name: dumpState.config.name,
        description: dumpState.config.description,
        imageUrl: dumpState.config.image_url || null,
        created,
        items,
        parentDao: parentDaoInfo
          ? {
              coreAddress: dumpState.admin,
              coreVersion: parentDaoInfo.coreVersion,
              name: parentDaoInfo.name,
              imageUrl: parentDaoInfo.imageUrl || null,
              parentDao: parentDaoInfo.parentDao,
              registeredSubDao: parentSubDaos?.includes(coreAddress) ?? false,
            }
          : null,
      }
    },
})
