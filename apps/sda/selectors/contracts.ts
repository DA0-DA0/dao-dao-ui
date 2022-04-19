import { selectorFamily } from 'recoil'

import { WasmExtension } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@cosmjs/stargate'
import { QueryContractsByCodeResponse } from 'cosmjs-types/cosmwasm/wasm/v1/query'

import { cosmWasmClient } from 'selectors/cosm'

export const contractsByCodeId = selectorFamily({
  key: 'contractsByCodeId',
  get:
    (codeId: number) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) {
        return []
      }
      let contracts = await client.getContracts(codeId)
      return contracts
    },
})

export const allContractsByCodeId = selectorFamily({
  key: 'contractsByCodeId',
  get:
    (codeId: number) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) {
        return []
      }

      const queryClient: QueryClient & WasmExtension = (
        client as any
      ).forceGetQueryClient()

      const all = []

      try {
        let startAtKey: Uint8Array | undefined = undefined
        do {
          const response: QueryContractsByCodeResponse =
            await queryClient.wasm.listContractsByCodeId(codeId, startAtKey)
          const { contracts, pagination } = response

          all.unshift(...contracts)
          startAtKey = pagination?.nextKey
        } while (startAtKey?.length !== 0)
      } catch (_e: any) {
        return get(contractsByCodeId(codeId))
      }

      return all
    },
})

export const contractInstantiateTime = selectorFamily<Date, string>({
  key: 'contractInstantiateTimeSelector',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      if (!client) {
        return new Date()
      }

      const events = await client.searchTx({
        tags: [{ key: 'instantiate._contract_address', value: address }],
      })
      if (events.length == 0) {
        return new Date()
      }
      // The timestamp field is avaliable when running this query via the
      // command line but is not avaliable from CosmJS so we need to run a
      // second query to get the block info.
      const height = events[0].height
      const block = await client.getBlock(height)
      return new Date(Date.parse(block.header.time))
    },
})

interface IPagedContractsByCodeId {
  contracts: string[]
  total: number
}

export const pagedContractsByCodeId = selectorFamily<
  IPagedContractsByCodeId,
  { codeId: number; page: number; limit: number }
>({
  key: 'pagedContractsByCodeId',
  get:
    ({ codeId, page, limit }) =>
    async ({ get }) => {
      const allContracts = get(allContractsByCodeId(codeId))
      const total = allContracts.length
      const offset = (page - 1) * limit
      let contracts: string[]

      if (offset > allContracts.length) {
        contracts = []
      } else if (page * limit > allContracts.length) {
        contracts = allContracts.slice(offset, allContracts.length)
      } else {
        contracts = allContracts.slice(offset, limit + offset)
      }

      return { contracts, total } as IPagedContractsByCodeId
    },
})
