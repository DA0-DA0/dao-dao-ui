import {
  CwCoreV1QueryClient,
  DaoCoreV2QueryClient,
} from '@dao-dao/state/contracts'
import { queryIndexer } from '@dao-dao/state/indexer'
import {
  ContractVersion,
  Feature,
  FetchPreProposeFunction,
  ProposalModule,
} from '@dao-dao/types'
import { InfoResponse } from '@dao-dao/types/contracts/common'
import { ProposalModuleWithInfo } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  cosmWasmClientRouter,
  getRpcForChainId,
  indexToProposalModulePrefix,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { matchAdapter } from '../proposal-module-adapter'

export const fetchProposalModules = async (
  chainId: string,
  coreAddress: string,
  coreVersion: ContractVersion,
  // If already fetched (from indexer), use that.
  activeProposalModules?: ProposalModuleWithInfo[]
): Promise<ProposalModule[]> => {
  // Try indexer first.
  if (!activeProposalModules) {
    try {
      activeProposalModules = await queryIndexer({
        type: 'contract',
        address: coreAddress,
        formula: 'daoCore/activeProposalModules',
        chainId,
      })
    } catch (err) {
      // Ignore error.
      console.error(err)
    }
  }
  // If indexer fails, fallback to querying chain.
  if (!activeProposalModules) {
    activeProposalModules = await fetchProposalModulesWithInfoFromChain(
      chainId,
      coreAddress,
      coreVersion
    )
  }

  const proposalModules: ProposalModule[] = await Promise.all(
    activeProposalModules.map(async ({ info, address, prefix }, index) => {
      const version = parseContractVersion(info.version) ?? null

      // Get pre-propose address if exists.
      const fetchPrePropose = getFetchPrePropose(info.contract)
      const prePropose =
        (await fetchPrePropose?.(chainId, address, version)) ?? null

      return {
        address,
        prefix: isFeatureSupportedByVersion(
          Feature.StaticProposalModulePrefixes,
          coreVersion
        )
          ? prefix
          : indexToProposalModulePrefix(index),
        contractName: info.contract,
        version,
        prePropose,
      }
    })
  )

  return proposalModules
}

// Find adapter for contract name and get pre-propose fetch function.
const getFetchPrePropose = (
  proposalModuleContractName: string
): FetchPreProposeFunction | undefined => {
  const adapter = matchAdapter(proposalModuleContractName)
  if (!adapter) {
    return
  }

  return adapter.functions.fetchPrePropose
}

const LIMIT = 10
export const fetchProposalModulesWithInfoFromChain = async (
  chainId: string,
  coreAddress: string,
  coreVersion: ContractVersion
): Promise<ProposalModuleWithInfo[]> => {
  const cwClient = await cosmWasmClientRouter.connect(getRpcForChainId(chainId))

  let paginationStart: string | undefined

  const proposalModules: ProposalModuleWithInfo[] = []
  const getV1ProposalModules = async () =>
    (
      await new CwCoreV1QueryClient(cwClient, coreAddress).proposalModules({
        startAt: paginationStart,
        limit: LIMIT,
        // Ignore first address if startAt was set.
      })
    )
      .slice(paginationStart !== undefined ? 1 : 0)
      .map(async (address, index) => {
        // All InfoResponses are the same, so just use core's.
        const { info }: InfoResponse = await cwClient.queryContractSmart(
          address,
          {
            info: {},
          }
        )

        return {
          address,
          prefix: indexToProposalModulePrefix(index),
          // V1 are all enabled.
          status: 'Enabled' as const,
          info,
        }
      })

  const getV2ProposalModules = async () =>
    (
      await new DaoCoreV2QueryClient(
        cwClient,
        coreAddress
      ).activeProposalModules({
        startAfter: paginationStart,
        limit: LIMIT,
      })
    ).map(async (data) => {
      // All InfoResponses are the same, so just use core's.
      const { info }: InfoResponse = await cwClient.queryContractSmart(
        data.address,
        {
          info: {},
        }
      )

      return {
        ...data,
        info,
      }
    })

  while (true) {
    const _proposalModules = await Promise.all(
      coreVersion === ContractVersion.V1
        ? await getV1ProposalModules()
        : await getV2ProposalModules()
    )
    if (!_proposalModules.length) {
      break
    }

    paginationStart = _proposalModules[_proposalModules.length - 1].address
    proposalModules.push(..._proposalModules)

    if (_proposalModules.length < LIMIT) {
      break
    }
  }

  return proposalModules
}
