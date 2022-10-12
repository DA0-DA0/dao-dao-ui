import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { ContractVersion, ProposalModule } from '@dao-dao/tstypes'
import { ProposalCreationPolicyResponse } from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'
import {
  indexToProposalModulePrefix,
  parseContractVersion,
} from '@dao-dao/utils'

import { CwCoreV1QueryClient, CwdCoreV2QueryClient } from '../clients'
import { InfoResponse } from '../clients/CwCoreV1'

export const fetchProposalModules = async (
  cwClient: CosmWasmClient,
  coreAddress: string,
  coreVersion: ContractVersion
): Promise<ProposalModule[]> => {
  const proposalModules: ProposalModule[] = []
  let paginationStart: string | undefined
  const limit = 10

  const getV0_1_0ProposalModules = async () =>
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
        const preProposeAddress = await fetchPreProposeAddress(
          cwClient,
          address,
          version
        )

        return {
          contractName: info.contract,
          version,
          address,
          prefix: indexToProposalModulePrefix(index),
          preProposeAddress,
        }
      })

  const getV0_2_0ProposalModules = async () =>
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
      const preProposeAddress = await fetchPreProposeAddress(
        cwClient,
        data.address,
        version
      )

      return {
        contractName: info.contract,
        version,
        preProposeAddress,
        ...data,
      }
    })

  while (true) {
    const _proposalModules = await Promise.all(
      coreVersion === ContractVersion.V0_1_0
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

const fetchPreProposeAddress = async (
  cwClient: CosmWasmClient,
  proposalModuleAddress: string,
  version: ContractVersion | null
): Promise<string | null> => {
  // TODO: Move this to proposal module adapter somehow
  let preProposeAddress: string | null = null
  if (version !== ContractVersion.V0_1_0) {
    try {
      const response: ProposalCreationPolicyResponse =
        await cwClient.queryContractSmart(proposalModuleAddress, {
          proposal_creation_policy: {},
        })

      if (response && 'Module' in response && response.Module.addr) {
        preProposeAddress = response.Module.addr
      }
    } catch (err) {
      console.error(err)

      // If query does not exist, ignore. Otherwise, rethrow error. Some
      // proposal modules may just not implement this query.
      if (
        !(err instanceof Error) ||
        !err.message.includes('Error parsing into type')
      ) {
        throw err
      }
    }
  }

  return preProposeAddress
}
