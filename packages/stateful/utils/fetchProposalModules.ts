import {
  ContractVersion,
  FetchPreProposeAddressFunction,
  ProposalModule,
} from '@dao-dao/types'
import { ContractVersionInfo } from '@dao-dao/types/contracts/common'
import { ProposalModule as ProposalModuleRespose } from '@dao-dao/types/contracts/CwdCore.v2'
import {
  indexToProposalModulePrefix,
  parseContractVersion,
  queryIndexer,
} from '@dao-dao/utils'

import { matchAdapter } from '../proposal-module-adapter'

export const fetchProposalModules = async (
  coreAddress: string,
  coreVersion: ContractVersion
): Promise<ProposalModule[]> => {
  const activeProposalModules = await queryIndexer<
    (ProposalModuleRespose & { info: ContractVersionInfo })[]
  >(coreAddress, 'dao/activeProposalModules')

  const proposalModules: ProposalModule[] = await Promise.all(
    activeProposalModules.map(async ({ info, address, prefix }, index) => {
      const version = parseContractVersion(info.version) ?? null

      // Get pre-propose address if exists.
      const fetchPreProposeAddress = getFetchPreProposeAddress(info.contract)
      const preProposeAddress =
        (await fetchPreProposeAddress?.(address, version)) ?? null

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
