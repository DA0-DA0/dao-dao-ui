import { queryIndexer } from '@dao-dao/state/indexer'
import { FetchPreProposeAddressFunction } from '@dao-dao/types'
import { cosmWasmClientRouter, getRpcForChainId } from '@dao-dao/utils'

import { DaoProposalMultipleQueryClient } from '../contracts/DaoProposalMultiple.client'

export const fetchPreProposeAddress: FetchPreProposeAddressFunction = async (
  chainId,
  proposalModuleAddress
) => {
  // Try indexer first.
  let creationPolicy
  try {
    creationPolicy = await queryIndexer({
      type: 'contract',
      address: proposalModuleAddress,
      formula: 'daoProposalMultiple/creationPolicy',
      chainId,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)

    // If indexer fails, fallback to querying chain.
    if (!creationPolicy) {
      const client = new DaoProposalMultipleQueryClient(
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
    : creationPolicy && 'module' in creationPolicy && creationPolicy.module.addr
    ? creationPolicy.module.addr
    : null
}
