import { fetchPreProposeModule, queryIndexer } from '@dao-dao/state'
import { Feature, FetchPreProposeFunction } from '@dao-dao/types'
import {
  cosmWasmClientRouter,
  getRpcForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { DaoProposalSingleV2QueryClient } from '../contracts/DaoProposalSingle.v2.client'

export const fetchPrePropose: FetchPreProposeFunction = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  if (!version || !isFeatureSupportedByVersion(Feature.PrePropose, version)) {
    return null
  }

  // Try indexer first.
  let creationPolicy
  try {
    creationPolicy = await queryIndexer({
      type: 'contract',
      address: proposalModuleAddress,
      formula: 'daoProposalSingle/creationPolicy',
      chainId,
      required: true,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!creationPolicy) {
    const client = new DaoProposalSingleV2QueryClient(
      await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
      proposalModuleAddress
    )

    creationPolicy = await client.proposalCreationPolicy()
  }

  const preProposeAddress =
    creationPolicy && 'Module' in creationPolicy && creationPolicy.Module.addr
      ? creationPolicy.Module.addr
      : creationPolicy &&
        'module' in creationPolicy &&
        creationPolicy.module.addr
      ? creationPolicy.module.addr
      : null

  if (!preProposeAddress) {
    return null
  }

  return await fetchPreProposeModule(chainId, preProposeAddress)
}
