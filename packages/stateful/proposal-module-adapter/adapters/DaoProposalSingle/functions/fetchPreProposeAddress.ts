import { queryIndexer } from '@dao-dao/state/indexer'
import { ContractVersion, FetchPreProposeAddressFunction } from '@dao-dao/types'
import { cosmWasmClientRouter, getRpcForChainId } from '@dao-dao/utils'

import { DaoProposalSingleV2QueryClient } from '../contracts/DaoProposalSingle.v2.client'

export const fetchPreProposeAddress: FetchPreProposeAddressFunction = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  // v1 does not support pre-propose.
  if (version === ContractVersion.V1) {
    return null
  }

  // Try indexer first.
  let creationPolicy
  try {
    creationPolicy = await queryIndexer(
      'contract',
      proposalModuleAddress,
      'daoProposalSingle/creationPolicy'
    )
  } catch (err) {
    // Ignore error.
    console.error(err)

    // If indexer fails, fallback to querying chain.
    if (!creationPolicy) {
      const client = new DaoProposalSingleV2QueryClient(
        await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
        proposalModuleAddress
      )

      creationPolicy = await client.proposalCreationPolicy()
    }
  }

  return creationPolicy &&
    'Module' in creationPolicy &&
    creationPolicy.Module.addr
    ? creationPolicy.Module.addr
    : null
}
