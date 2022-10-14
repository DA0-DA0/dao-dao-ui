import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/tstypes'
import { ProposalModule } from '@dao-dao/tstypes/dao'

import { fetchProposalModules } from '../../utils'
import { cosmWasmClientForChainSelector } from './chain'
import { contractVersionSelector } from './contract'

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

export const cwCoreProposalModulesSelector = selectorFamily<
  ProposalModule[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'cwCoreProposalModules',
  get:
    ({ coreAddress, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      const coreVersion = get(
        contractVersionSelector({
          contractAddress: coreAddress,
          chainId,
        })
      )

      return await fetchProposalModules(client, coreAddress, coreVersion)
    },
})
