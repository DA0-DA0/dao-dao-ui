import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  CwCoreV0_1_0QueryClient,
  CwCoreV0_2_0QueryClient,
} from '@dao-dao/state/clients'
import { InfoResponse } from '@dao-dao/state/clients/cw-core/0.1.0'

export enum CwCoreVersion {
  V0_1_0 = '0.1.0',
  V0_2_0 = '0.2.0',
}

export enum ProposalModuleType {
  CwProposalSingle = 'CwProposalSingle',
  CwProposalMultiple = 'CwProposalMultiple',
}

export interface ProposalModule {
  contractName: string
  address: string
  prefix: string
}

export const parseCoreVersion = (version: string): CwCoreVersion | undefined =>
  version === CwCoreVersion.V0_1_0
    ? CwCoreVersion.V0_1_0
    : version === CwCoreVersion.V0_2_0
    ? CwCoreVersion.V0_2_0
    : undefined

export const indexToProposalModulePrefix = (index: number) => {
  index += 1
  let prefix = ''
  while (index > 0) {
    const letterIndex = (index - 1) % 26
    // capital A = 65, Z = 90
    prefix = String.fromCharCode(65 + letterIndex) + prefix
    index = ((index - letterIndex) / 26) | 0
  }

  return prefix
}

export const fetchProposalModules = async (
  cwClient: CosmWasmClient,
  coreAddress: string,
  coreVersion: CwCoreVersion
): Promise<ProposalModule[]> => {
  const coreV0_1_0Client = new CwCoreV0_1_0QueryClient(cwClient, coreAddress)
  const coreV0_2_0Client = new CwCoreV0_2_0QueryClient(cwClient, coreAddress)

  const proposalModules: ProposalModule[] = []
  let paginationStart: string | undefined
  const limit = 10

  const getV0_1_0ProposalModules = async () =>
    (
      await coreV0_1_0Client.proposalModules({
        startAt: paginationStart,
        limit,
        // Ignore first address if startAt was set.
      })
    )
      .slice(paginationStart !== undefined ? 1 : 0)
      .map(async (address, index) => {
        // All InfoResponses are the same, so just use cw-core's.
        const {
          info: { contract: contractName },
        }: InfoResponse = await cwClient.queryContractSmart(address, {
          info: {},
        })

        return {
          contractName,
          address,
          prefix: indexToProposalModulePrefix(index),
        }
      })

  const getV0_2_0ProposalModules = async () =>
    (
      await coreV0_2_0Client.proposalModules({
        startAfter: paginationStart,
        limit,
      })
    ).map(async (data) => {
      // All InfoResponses are the same, so just use cw-core's.
      const {
        info: { contract: contractName },
      }: InfoResponse = await cwClient.queryContractSmart(data.address, {
        info: {},
      })

      return {
        contractName,
        ...data,
      }
    })

  while (true) {
    const _proposalModules = await Promise.all(
      coreVersion === CwCoreVersion.V0_1_0
        ? await getV0_1_0ProposalModules()
        : await getV0_2_0ProposalModules()
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
