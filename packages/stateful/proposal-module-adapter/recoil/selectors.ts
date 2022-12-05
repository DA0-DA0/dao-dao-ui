import { selectorFamily, waitForAll } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  isContractSelector,
  queryIndexerSelector,
} from '@dao-dao/state'
import { ProposalModuleAdapter, WithChainId } from '@dao-dao/types'

import { getAdapters } from '../core'

// Given a contract address, determine if it corresponds with any of the
// proposal module adapters.
export const proposalModuleAdapterSelector = selectorFamily<
  ProposalModuleAdapter | undefined,
  WithChainId<{ proposalModuleAddress: string }>
>({
  key: 'proposalModuleAdapter',
  get:
    ({ proposalModuleAddress, chainId }) =>
    ({ get }) =>
      getAdapters().find(({ contractNames }) =>
        get(
          waitForAll(
            contractNames.map((contractName) =>
              isContractSelector({
                contractAddress: proposalModuleAddress,
                chainId,
                name: contractName,
              })
            )
          )
        ).some(Boolean)
      ),
})

export const proposalModuleAdapterProposalCountSelector = selectorFamily<
  number | undefined,
  WithChainId<{ proposalModuleAddress: string }>
>({
  key: 'proposalModuleAdapterProposalCount',
  get:
    (params) =>
    async ({ get }) => {
      const adapter = get(proposalModuleAdapterSelector(params))
      if (!adapter) {
        return
      }

      let count: number | undefined
      if (adapter.queries.proposalCount.indexerFormula) {
        count =
          get(
            queryIndexerSelector({
              contractAddress: params.proposalModuleAddress,
              chainId: params.chainId,
              formulaName: adapter.queries.proposalCount.indexerFormula,
            })
            // Null when indexer fails.
          ) ?? undefined

        if (typeof count === 'number') {
          return count
        }
      }

      // If indexer formula does not exist or fails to load, fallback to
      // querying the chain.
      const client = get(cosmWasmClientForChainSelector(params.chainId))
      try {
        return await client.queryContractSmart(
          params.proposalModuleAddress,
          adapter.queries.proposalCount
        )
      } catch (err) {
        // v1 core throws error if no proposals have been made, so return 0 for
        // backwards compatibility.
        if (err instanceof Error && err.message.includes('u64 not found')) {
          return 0
        }

        throw err
      }
    },
})
