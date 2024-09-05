/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import {
  DistributionState,
  DistributionsResponse,
  InfoResponse,
  OwnershipForAddr,
  PendingRewardsResponse,
} from '@dao-dao/types/contracts/DaoRewardsDistributor'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { DaoRewardsDistributorQueryClient } from '../../../contracts/DaoRewardsDistributor'
import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'

export const daoRewardsDistributorQueryKeys = {
  contract: [
    {
      contract: 'daoRewardsDistributor',
    },
  ] as const,
  address: (chainId: string, contractAddress: string) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.contract[0],
        chainId,
        address: contractAddress,
      },
    ] as const,
  info: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.address(chainId, contractAddress)[0],
        method: 'info',
        args,
      },
    ] as const,
  ownership: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.address(chainId, contractAddress)[0],
        method: 'ownership',
        args,
      },
    ] as const,
  pendingRewards: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.address(chainId, contractAddress)[0],
        method: 'pending_rewards',
        args,
      },
    ] as const,
  distribution: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.address(chainId, contractAddress)[0],
        method: 'distribution',
        args,
      },
    ] as const,
  distributions: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoRewardsDistributorQueryKeys.address(chainId, contractAddress)[0],
        method: 'distributions',
        args,
      },
    ] as const,
}
export const daoRewardsDistributorQueries = {
  info: contractQueries.info,
  ownership: <TData = OwnershipForAddr>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      options,
    }: DaoRewardsDistributorOwnershipQuery<TData>
  ): UseQueryOptions<OwnershipForAddr, Error, TData> => ({
    queryKey: daoRewardsDistributorQueryKeys.ownership(
      chainId,
      contractAddress
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoRewardsDistributor/ownership',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoRewardsDistributorQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).ownership()
    },
    ...options,
  }),
  pendingRewards: <TData = PendingRewardsResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoRewardsDistributorPendingRewardsQuery<TData>): UseQueryOptions<
    PendingRewardsResponse,
    Error,
    TData
  > => ({
    queryKey: daoRewardsDistributorQueryKeys.pendingRewards(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      return new DaoRewardsDistributorQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).pendingRewards({
        address: args.address,
        limit: args.limit,
        startAfter: args.startAfter,
      })
    },
    ...options,
  }),
  distribution: <TData = DistributionState>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoRewardsDistributorDistributionQuery<TData>
  ): UseQueryOptions<DistributionState, Error, TData> => ({
    queryKey: daoRewardsDistributorQueryKeys.distribution(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoRewardsDistributor/distribution',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoRewardsDistributorQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).distribution({
        id: args.id,
      })
    },
    ...options,
  }),
  distributions: <TData = DistributionsResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoRewardsDistributorDistributionsQuery<TData>
  ): UseQueryOptions<DistributionsResponse, Error, TData> => ({
    queryKey: daoRewardsDistributorQueryKeys.distributions(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoRewardsDistributor/distributions',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoRewardsDistributorQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).distributions({
        limit: args.limit,
        startAfter: args.startAfter,
      })
    },
    ...options,
  }),
}
export interface DaoRewardsDistributorReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface DaoRewardsDistributorDistributionsQuery<TData>
  extends DaoRewardsDistributorReactQuery<DistributionsResponse, TData> {
  args: {
    limit?: number
    startAfter?: number
  }
}
export interface DaoRewardsDistributorDistributionQuery<TData>
  extends DaoRewardsDistributorReactQuery<DistributionState, TData> {
  args: {
    id: number
  }
}
export interface DaoRewardsDistributorPendingRewardsQuery<TData>
  extends DaoRewardsDistributorReactQuery<PendingRewardsResponse, TData> {
  args: {
    address: string
    limit?: number
    startAfter?: number
  }
}
export interface DaoRewardsDistributorOwnershipQuery<TData>
  extends DaoRewardsDistributorReactQuery<OwnershipForAddr, TData> {}
export interface DaoRewardsDistributorInfoQuery<TData>
  extends DaoRewardsDistributorReactQuery<InfoResponse, TData> {}
