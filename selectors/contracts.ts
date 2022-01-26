import { cosmWasmClient } from 'selectors/cosm'
import { selectorFamily } from 'recoil'
import { WasmExtension } from '@cosmjs/cosmwasm-stargate'
import { toHex } from '@cosmjs/encoding'
import { QueryClient } from '@cosmjs/stargate'
import {
  QueryCodesResponse,
  QueryContractsByCodeResponse,
} from 'cosmjs-types/cosmwasm/wasm/v1/query'

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
