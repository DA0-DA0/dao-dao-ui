import { DaoProposalMultipleQueryClient, queryIndexer } from '@dao-dao/state'
import { Feature, FetchVetoConfig } from '@dao-dao/types'
import { Config } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  cosmWasmClientRouter,
  getRpcForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

export const fetchVetoConfig: FetchVetoConfig = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  if (!version || !isFeatureSupportedByVersion(Feature.Veto, version)) {
    return null
  }

  // Try indexer first.
  let config: Config | undefined
  try {
    config = await queryIndexer({
      type: 'contract',
      address: proposalModuleAddress,
      formula: 'daoProposalMultiple/config',
      chainId,
      required: true,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!config) {
    const client = new DaoProposalMultipleQueryClient(
      await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
      proposalModuleAddress
    )

    config = await client.config()
  }

  return config?.veto ?? null
}
