import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import { Addr } from '@dao-dao/types'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { PolytoneProxyQueryClient } from '../../../contracts/PolytoneProxy'
import { indexerQueries } from '../indexer'

export const polytoneProxyQueryKeys = {
  contract: [
    {
      contract: 'polytoneProxy',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...polytoneProxyQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  instantiator: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...polytoneProxyQueryKeys.address(contractAddress)[0],
        method: 'instantiator',
        ...(args && { args }),
      },
    ] as const,
}
export const polytoneProxyQueries = {
  instantiator: <TData = Addr>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: PolytoneProxyInstantiatorQuery<TData>
  ): UseQueryOptions<Addr, Error, TData> => ({
    queryKey: polytoneProxyQueryKeys.instantiator(contractAddress),
    queryFn: async () => {
      let indexerNonExistent = false
      try {
        const instantiator = await queryClient.fetchQuery(
          indexerQueries.queryContract<string>(queryClient, {
            chainId,
            contractAddress,
            formula: 'polytone/proxy/instantiator',
          })
        )
        if (instantiator) {
          return instantiator
        } else {
          indexerNonExistent = true
        }
      } catch (error) {
        console.error(error)
      }

      if (indexerNonExistent) {
        throw new Error('Instantiator not found')
      }

      // If indexer query fails, fallback to contract query.
      return new PolytoneProxyQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).instantiator()
    },
    ...options,
  }),
}
export interface PolytoneProxyReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface PolytoneProxyInstantiatorQuery<TData>
  extends PolytoneProxyReactQuery<Addr, TData> {}
