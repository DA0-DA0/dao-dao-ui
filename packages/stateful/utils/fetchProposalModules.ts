import {
  CwCoreV1QueryClient,
  CwdCoreV2QueryClient,
} from '@dao-dao/state/contracts'
import {
  ContractVersion,
  FetchPreProposeAddressFunction,
  ProposalModule,
} from '@dao-dao/types'
import {
  ContractVersionInfo,
  InfoResponse,
} from '@dao-dao/types/contracts/common'
import { ProposalModule as ProposalModuleRespose } from '@dao-dao/types/contracts/CwdCore.v2'
import {
  cosmWasmClientRouter,
  getRpcForChainId,
  indexToProposalModulePrefix,
  parseContractVersion,
  queryIndexer,
} from '@dao-dao/utils'

import { matchAdapter } from '../proposal-module-adapter'

type ProposalModuleWithInfo = ProposalModuleRespose & {
  info: ContractVersionInfo
}

export const fetchProposalModules = async (
  chainId: string,
  coreAddress: string,
  coreVersion: ContractVersion
): Promise<ProposalModule[]> => {
  let activeProposalModules: ProposalModuleWithInfo[] | undefined
  // Try indexer first.
  try {
    activeProposalModules = await queryIndexer(
      coreAddress,
      'daoCore/activeProposalModules'
    )
  } catch (err) {
    // Ignore error.
    console.error(err)
  }
  // If indexer fails, fallback to querying chain.
  if (!activeProposalModules) {
    activeProposalModules = await getProposalModulesFromChain(
      chainId,
      coreAddress,
      coreVersion
    )
  }

  const proposalModules: ProposalModule[] = await Promise.all(
    activeProposalModules.map(async ({ info, address, prefix }, index) => {
      const version = parseContractVersion(info.version) ?? null

      // Get pre-propose address if exists.
      const fetchPreProposeAddress = getFetchPreProposeAddress(info.contract)
      const preProposeAddress =
        (await fetchPreProposeAddress?.(chainId, address, version)) ?? null

      return {
        address,
        prefix:
          // V1 DAOs don't have a prefix, so we need to compute it
          // deterministically using its index.
          coreVersion === ContractVersion.V1
            ? indexToProposalModulePrefix(index)
            : prefix,
        contractName: info.contract,
        version,
        preProposeAddress,
      }
    })
  )

  return proposalModules
}

// Find adapter for contract name and get pre-propose fetch function.
const getFetchPreProposeAddress = (
  proposalModuleContractName: string
): FetchPreProposeAddressFunction | undefined => {
  const adapter = matchAdapter(proposalModuleContractName)
  if (!adapter) {
    return
  }

  return adapter.functions.fetchPreProposeAddress
}

const LIMIT = 10
const getProposalModulesFromChain = async (
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
      await new CwdCoreV2QueryClient(
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
