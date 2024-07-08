import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import { NullableString } from '@dao-dao/types/contracts/PolytoneNote'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { PolytoneNoteQueryClient } from '../../../contracts/PolytoneNote'
import { indexerQueries } from '../indexer'

export const polytoneNoteQueryKeys = {
  contract: [
    {
      contract: 'polytoneNote',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...polytoneNoteQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  remoteAddress: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...polytoneNoteQueryKeys.address(contractAddress)[0],
        method: 'remote_address',
        ...(args && { args }),
      },
    ] as const,
}
export const polytoneNoteQueries = {
  remoteAddress: <TData = NullableString>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: PolytoneNoteRemoteAddressQuery<TData>
  ): UseQueryOptions<NullableString, Error, TData> => ({
    queryKey: polytoneNoteQueryKeys.remoteAddress(contractAddress, args),
    queryFn: async () => {
      try {
        return await queryClient.fetchQuery(
          indexerQueries.queryContract<NullableString>(queryClient, {
            chainId,
            contractAddress,
            formula: 'polytone/note/remoteAddress',
            args: {
              address: args.localAddress,
            },
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new PolytoneNoteQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).remoteAddress({
        localAddress: args.localAddress,
      })
    },
    ...options,
  }),
}
export interface PolytoneNoteReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface PolytoneNoteRemoteAddressQuery<TData>
  extends PolytoneNoteReactQuery<NullableString, TData> {
  args: {
    localAddress: string
  }
}
