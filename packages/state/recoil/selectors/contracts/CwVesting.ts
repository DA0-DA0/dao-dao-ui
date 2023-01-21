import { selectorFamily } from 'recoil'

import { Uint128, WithChainId } from '@dao-dao/types'
import {
  OwnershipForAddr,
  VestingPayment,
} from '@dao-dao/types/contracts/CwVesting'

import {
  CwVestingClient,
  CwVestingQueryClient,
} from '../../../contracts/CwVesting'
import { signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<CwVestingQueryClient, QueryClientParams>({
  key: 'cwVestingQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwVestingQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwVestingClient | undefined,
  ExecuteClientParams
>({
  key: 'cwVestingExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwVestingClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const infoSelector = selectorFamily<
  VestingPayment,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['info']>
  }
>({
  key: 'cwVestingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cwVesting/info',
        })
      )
      if (info) {
        return info
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
export const ownershipSelector = selectorFamily<
  OwnershipForAddr,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['ownership']>
  }
>({
  key: 'cwVestingOwnership',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.ownership(...params)
    },
})
export const vestedAmountSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['vestedAmount']>
  }
>({
  key: 'cwVestingVestedAmount',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.vestedAmount(...params)
    },
})
