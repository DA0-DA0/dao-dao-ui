import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { StatusResponse } from '@dao-dao/types/contracts/CwTokenSwap'

import { CwTokenSwapQueryClient } from '../../../contracts/CwTokenSwap'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwTokenSwapQueryClient,
  QueryClientParams
>({
  key: 'cwTokenSwapQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwTokenSwapQueryClient(client, contractAddress)
    },
})
export const statusSelector = selectorFamily<
  StatusResponse,
  QueryClientParams & {
    params: Parameters<CwTokenSwapQueryClient['status']>
  }
>({
  key: 'cwTokenSwapStatus',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.status(...params)
    },
})
