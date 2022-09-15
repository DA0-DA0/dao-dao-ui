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
      getAdapters().find(({ contractName }) =>
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
      const client = get(cosmWasmClientSelector)
      const adapter = get(proposalModuleAdapterSelector(contractAddress))
      if (!adapter) {
        return
      }

      return await client.queryContractSmart(
        contractAddress,
        adapter.queries.proposalCount
      )
    },
})
