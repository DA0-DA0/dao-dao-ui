import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { ResultResponse } from '@dao-dao/types/contracts/PolytoneListener'

import { PolytoneListenerQueryClient } from '../../../contracts/PolytoneListener'
import { refreshPolytoneListenerResultsAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneListenerQueryClient,
  QueryClientParams
>({
  key: 'polytoneListenerQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneListenerQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const noteSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<PolytoneListenerQueryClient['note']>
  }
>({
  key: 'polytoneListenerNote',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const note = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'polytone/listener/note',
        })
      )
      if (note) {
        return note
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.note(...params)
    },
})

export const resultSelector = selectorFamily<
  ResultResponse,
  QueryClientParams & {
    params: Parameters<PolytoneListenerQueryClient['result']>
  }
>({
  key: 'polytoneListenerResult',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshPolytoneListenerResultsAtom)

      const result = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'polytone/listener/result',
          args: params[0],
          id,
        })
      )
      if (result) {
        return result
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.result(...params)
    },
})
