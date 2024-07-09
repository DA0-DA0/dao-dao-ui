import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import { AdminListResponse } from '@dao-dao/types/contracts/Cw1Whitelist'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { Cw1WhitelistQueryClient } from '../../../contracts/Cw1Whitelist'
import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'

export const cw1WhitelistQueryKeys = {
  contract: [
    {
      contract: 'cw1Whitelist',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...cw1WhitelistQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  adminList: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...cw1WhitelistQueryKeys.address(contractAddress)[0],
        method: 'admin_list',
        ...(args && { args }),
      },
    ] as const,
  /**
   * If this is a cw1-whitelist, return the admins. Otherwise, return null.
   */
  adminsIfCw1Whitelist: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...cw1WhitelistQueryKeys.address(contractAddress)[0],
        method: 'adminsIfCw1Whitelist',
        ...(args && { args }),
      },
    ] as const,
}
export const cw1WhitelistQueries = {
  adminList: <TData = AdminListResponse>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: Cw1WhitelistAdminListQuery<TData>
  ): UseQueryOptions<AdminListResponse, Error, TData> => ({
    queryKey: cw1WhitelistQueryKeys.adminList(contractAddress),
    queryFn: async () => {
      let indexerNonExistent = false
      try {
        const adminList = await queryClient.fetchQuery(
          indexerQueries.queryContract<AdminListResponse>(queryClient, {
            chainId,
            contractAddress,
            formula: 'cw1Whitelist/adminList',
          })
        )
        if (adminList) {
          return adminList
        } else {
          indexerNonExistent = true
        }
      } catch (error) {
        console.error(error)
      }

      if (indexerNonExistent) {
        throw new Error('Admin list not found')
      }

      // If indexer query fails, fallback to contract query.
      return new Cw1WhitelistQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).adminList()
    },
    ...options,
  }),
  /**
   * If this is a cw1-whitelist, return the admins. Otherwise, return null.
   */
  adminsIfCw1Whitelist: <TData = string[] | null>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      options,
    }: Cw1WhitelistAdminsIfCw1WhitelistQuery<TData>
  ): UseQueryOptions<string[] | null, Error, TData> => ({
    queryKey: cw1WhitelistQueryKeys.adminsIfCw1Whitelist(contractAddress),
    queryFn: async () => {
      const isCw1Whitelist = await queryClient.fetchQuery(
        contractQueries.isCw1Whitelist(queryClient, {
          chainId,
          address: contractAddress,
        })
      )
      if (!isCw1Whitelist) {
        return null
      }

      return (
        await queryClient.fetchQuery(
          cw1WhitelistQueries.adminList(queryClient, {
            chainId,
            contractAddress,
          })
        )
      ).admins
    },
    ...options,
  }),
}
export interface Cw1WhitelistReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface Cw1WhitelistAdminListQuery<TData>
  extends Cw1WhitelistReactQuery<AdminListResponse, TData> {}

export interface Cw1WhitelistAdminsIfCw1WhitelistQuery<TData>
  extends Cw1WhitelistReactQuery<string[] | null, TData> {}
