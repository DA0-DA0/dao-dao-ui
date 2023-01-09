import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { cosmWasmClientForChainSelector } from './chain'

export const proposalExecutionTXHashSelector = selectorFamily<
  string | undefined,
  WithChainId<{ contractAddress: string; proposalId: number }>
>({
  key: 'proposalExecutionTXHash',
  get:
    ({ contractAddress, proposalId, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const events = await client.searchTx({
        tags: [
          { key: 'wasm._contract_address', value: contractAddress },
          { key: 'wasm.proposal_id', value: proposalId.toString() },
          { key: 'wasm.action', value: 'execute' },
        ],
      })

      if (events.length > 1) {
        console.error('More than one execution', events)
      }

      return events?.[0]?.hash
    },
})
