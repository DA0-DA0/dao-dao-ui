import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { cosmWasmClientForChainSelector } from './chain'

export const proposalExecutionTXHashSelector = selectorFamily<
  string | undefined,
  WithChainId<{
    contractAddress: string
    proposalId: number
    /**
     * Whether or not this is executed from Neutron's fork SubDAO timelock
     * system. If so, the execute action event attribute is different.
     */
    isNeutronTimelockExecute?: boolean
  }>
>({
  key: 'proposalExecutionTXHash',
  get:
    ({ contractAddress, proposalId, chainId, isNeutronTimelockExecute }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const events = await client.searchTx([
        { key: 'wasm._contract_address', value: contractAddress },
        { key: 'wasm.proposal_id', value: proposalId.toString() },
        {
          key: 'wasm.action',
          value: isNeutronTimelockExecute ? 'execute_proposal' : 'execute',
        },
      ])

      if (events.length > 1) {
        console.error('More than one execution', events)
      }

      return events?.[0]?.hash
    },
})
