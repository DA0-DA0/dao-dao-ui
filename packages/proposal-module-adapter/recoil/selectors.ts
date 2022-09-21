import { selectorFamily } from 'recoil'

import { cosmWasmClientSelector, isContractSelector } from '@dao-dao/state'
import { ProposalModuleAdapter } from '@dao-dao/tstypes'

import { getAdapters } from '../core'

// Given a contract address, determine if it corresponds with any of the
// proposal module adapters.
export const proposalModuleAdapterSelector = selectorFamily<
  ProposalModuleAdapter | undefined,
  string
>({
  key: 'proposalModuleAdapter',
  get:
    (contractAddress) =>
    ({ get }) =>
      getAdapters().find(({ id: contractName }) =>
        get(
          isContractSelector({
            contractAddress,
            name: contractName,
          })
        )
      ),
})

// Given a contract address, determine if it corresponds with any of the
// proposal module adapters.
export const proposalModuleAdapterProposalCountSelector = selectorFamily<
  number | undefined,
  string
>({
  key: 'proposalModuleAdapterProposalCount',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const adapter = get(proposalModuleAdapterSelector(contractAddress))
      if (!adapter) {
        return
      }

      const client = get(cosmWasmClientSelector)
      try {
        return await client.queryContractSmart(
          contractAddress,
          adapter.queries.proposalCount
        )
      } catch (err) {
        // v1 cw-core throws error if no proposals have been made, so return 0
        // for backwards compatibility.
        if (err instanceof Error && err.message.includes('u64 not found')) {
          return 0
        }

        throw err
      }
    },
})
