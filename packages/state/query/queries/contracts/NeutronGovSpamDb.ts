import { UseQueryOptions, queryOptions } from '@tanstack/react-query'

import { getCosmWasmClientForChainId } from '@dao-dao/utils'

export type NeutronGovSpamDbListResponse = string[]

export const neutronGovSpamDbQueryKeys = {
  contract: [
    {
      contract: 'neutronGovSpamDb',
    },
  ] as const,
  address: (chainId: string, contractAddress: string) =>
    [
      {
        ...neutronGovSpamDbQueryKeys.contract[0],
        chainId,
        address: contractAddress,
      },
    ] as const,
  list: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronGovSpamDbQueryKeys.address(chainId, contractAddress)[0],
        method: 'list',
        args,
      },
    ] as const,
}
export const neutronGovSpamDbQueries = {
  list: <TData = NeutronGovSpamDbListResponse>({
    chainId,
    contractAddress,
    options,
  }: NeutronGovSpamDbListQuery<TData>) =>
    queryOptions<NeutronGovSpamDbListResponse, Error, TData>({
      queryKey: neutronGovSpamDbQueryKeys.list(chainId, contractAddress),
      queryFn: async () => {
        const client = await getCosmWasmClientForChainId(chainId)
        const list: NeutronGovSpamDbListResponse =
          await client.queryContractSmart(contractAddress, {
            list: {},
          })
        return list
      },
      ...options,
    }),
}
export interface NeutronGovSpamDbReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface NeutronGovSpamDbListQuery<TData>
  extends NeutronGovSpamDbReactQuery<NeutronGovSpamDbListResponse, TData> {}
