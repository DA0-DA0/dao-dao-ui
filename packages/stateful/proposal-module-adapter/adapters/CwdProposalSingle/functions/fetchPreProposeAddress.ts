import { ContractVersion, FetchPreProposeAddressFunction } from '@dao-dao/types'

import { CwdProposalSingleV2QueryClient } from '../contracts/CwdProposalSingle.v2.client'

export const fetchPreProposeAddress: FetchPreProposeAddressFunction = async (
  cwClient,
  proposalModuleAddress,
  version
) => {
  // v1 does not support pre-propose.
  if (version === ContractVersion.V1) {
    return null
  }

  let preProposeAddress: string | null = null

  const client = new CwdProposalSingleV2QueryClient(
    cwClient,
    proposalModuleAddress
  )

  const creationPolicy = await client.proposalCreationPolicy()
  if ('Module' in creationPolicy && creationPolicy.Module.addr) {
    preProposeAddress = creationPolicy.Module.addr
  }

  return preProposeAddress
}
