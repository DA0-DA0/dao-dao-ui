import {
  DaoProposalSingleV2QueryClient,
  fetchPreProposeModule,
  queryIndexer,
} from '@dao-dao/state'
import { Feature, FetchPreProposeFunction } from '@dao-dao/types'
import {
  getCosmWasmClientForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

export const fetchPrePropose: FetchPreProposeFunction = async (
  queryClient,
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
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!creationPolicy) {
    const client = new DaoProposalSingleV2QueryClient(
      await getCosmWasmClientForChainId(chainId),
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

  return await fetchPreProposeModule(queryClient, chainId, preProposeAddress)
}
