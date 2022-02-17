import { cosmWasmClient, stargateClient } from 'selectors/cosm'
import { selector, selectorFamily } from 'recoil'
import { WasmExtension } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@cosmjs/stargate'
import { QueryContractsByCodeResponse } from 'cosmjs-types/cosmwasm/wasm/v1/query'
import { Member } from '@dao-dao/types/contracts/cw3-multisig'
import { FEATURED_DAOS_ADDR } from 'util/constants'

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

export const featuredDaosSelector = selector<string[]>({
  key: 'featuredDaosSelector',
  get: async ({ get }) => {
    const client = get(cosmWasmClient)
    if (!client) {
      return []
    }

    const featuredListAddress = FEATURED_DAOS_ADDR
    if (!featuredListAddress) {
      return []
    }

    const contracts = (
      await client.queryContractSmart(featuredListAddress, {
        list_members: {},
      })
    ).members as Member[]

    return contracts.map(({ addr }) => addr)
  },
})
