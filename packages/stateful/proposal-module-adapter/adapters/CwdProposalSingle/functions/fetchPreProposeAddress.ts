import { ContractVersion, FetchPreProposeAddressFunction } from '@dao-dao/types'
import { queryIndexer } from '@dao-dao/utils'

export const fetchPreProposeAddress: FetchPreProposeAddressFunction = async (
  proposalModuleAddress,
  version
) => {
  // v1 does not support pre-propose.
  if (version === ContractVersion.V1) {
    return null
  }

  let preProposeAddress: string | null = null

  const creationPolicy = await queryIndexer(
    proposalModuleAddress,
    'daoProposalSingle/creationPolicy'
  )
  if ('Module' in creationPolicy && creationPolicy.Module.addr) {
    preProposeAddress = creationPolicy.Module.addr
  }

  return preProposeAddress
}
