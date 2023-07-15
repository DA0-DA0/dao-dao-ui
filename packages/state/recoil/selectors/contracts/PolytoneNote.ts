import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { NullableString } from '@dao-dao/types/contracts/PolytoneNote'

import { PolytoneNoteQueryClient } from '../../../contracts/PolytoneNote'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneNoteQueryClient,
  QueryClientParams
>({
  key: 'polytoneNoteQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneNoteQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const remoteAddressSelector = selectorFamily<
  NullableString,
  QueryClientParams & {
    params: Parameters<PolytoneNoteQueryClient['remoteAddress']>
  }
>({
  key: 'polytoneNoteRemoteAddress',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const remoteAddress = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'polytone/note/remoteAddress',
          args: {
            address: params[0].localAddress,
          },
        })
      )
      if (remoteAddress) {
        return remoteAddress
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.remoteAddress(...params)
    },
})
