import { IndexedTx } from '@cosmjs/stargate'
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
    key: 'contractAdmin',
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

export interface TreasuryTransaction {
  tx: IndexedTx
  events: {
    type: string
    attributes: {
      key: string
      value: string
    }[]
  }[]
}

export const treasuryTransactionsSelector = selectorFamily({
  key: 'treasuryTransactions',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) {
        return undefined
      }

      const txs = await client.searchTx({
        sentFromOrTo: address,
      })

      return txs
        .map((tx) => {
          let events
          try {
            events = JSON.parse(tx.rawLog)[0].events
          } catch {
            return
          }

          return {
            tx,
            events,
          }
        })
        .filter(Boolean) as TreasuryTransaction[]
    },
})
