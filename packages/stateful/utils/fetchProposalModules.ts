import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { CwCoreV1QueryClient, CwdCoreV2QueryClient } from '@dao-dao/state'
import {
  ContractVersion,
  FetchPreProposeAddressFunction,
  ProposalModule,
} from '@dao-dao/types'
import { InfoResponse } from '@dao-dao/types/contracts/common'
import {
  indexToProposalModulePrefix,
  parseContractVersion,
} from '@dao-dao/utils'

import { matchAdapter } from '../proposal-module-adapter'

export const fetchProposalModules = async (
  cwClient: CosmWasmClient,
  coreAddress: string,
  coreVersion: ContractVersion
): Promise<ProposalModule[]> => {
  const proposalModules: ProposalModule[] = []
  let paginationStart: string | undefined
  const limit = 10

  const getV1ProposalModules = async () =>
    (
      await new CwCoreV1QueryClient(cwClient, coreAddress).proposalModules({
        startAt: paginationStart,
        limit,
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
        const version = parseContractVersion(info.version) ?? null

        // Get pre-propose address if exists.
        const fetchPreProposeAddress = getFetchPreProposeAddress(info.contract)
        const preProposeAddress =
          (await fetchPreProposeAddress?.(cwClient, address, version)) ?? null

        return {
          contractName: info.contract,
          version,
          address,
          prefix: indexToProposalModulePrefix(index),
          preProposeAddress,
        }
      })

  const getV2ProposalModules = async () =>
    (
      await new CwdCoreV2QueryClient(
        cwClient,
        coreAddress
      ).activeProposalModules({
        startAfter: paginationStart,
        limit,
      })
    ).map(async (data) => {
      // All InfoResponses are the same, so just use core's.
      const { info }: InfoResponse = await cwClient.queryContractSmart(
        data.address,
        {
          info: {},
        }
      )
      const version = parseContractVersion(info.version) ?? null

      // Get pre-propose address if exists.
      const fetchPreProposeAddress = getFetchPreProposeAddress(info.contract)
      const preProposeAddress =
        (await fetchPreProposeAddress?.(cwClient, data.address, version)) ??
        null

      return {
        contractName: info.contract,
        version,
        preProposeAddress,
        ...data,
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

    if (_proposalModules.length < limit) {
      break
    }
  }

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
