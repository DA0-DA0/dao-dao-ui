import { selectorFamily } from 'recoil'

import { cosmWasmClientSelector } from './chain'

export const contractInstantiateTimeSelector = selectorFamily<
  Date | undefined,
  string
>({
  key: 'contractInstantiateTime',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

      const events = await client.searchTx({
        tags: [{ key: 'instantiate._contract_address', value: address }],
      })
      if (events.length == 0) return

      // The timestamp field is available when running this query via the
      // command line but is not available from CosmJS, so we need to run a
      // second query to get the block info.
      const height = events[0].height
      const block = await client.getBlock(height)
      return new Date(Date.parse(block.header.time))
    },
})

export const contractAdminSelector = selectorFamily<string | undefined, string>(
  {
    key: 'contractInstantiateTimeSelector',
    get:
      (address: string) =>
      async ({ get }) => {
        const client = get(cosmWasmClientSelector)
        if (!client) {
          return undefined
        }

        try {
          const contract = await client.getContract(address)
          return contract.admin || ''
        } catch (_) {
          return undefined
        }
      },
  }
)
