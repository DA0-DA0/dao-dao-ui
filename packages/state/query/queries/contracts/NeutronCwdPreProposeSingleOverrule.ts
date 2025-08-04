import { UseQueryOptions, queryOptions } from '@tanstack/react-query'

import {
  Addr,
  Config,
  DepositInfoResponse,
  QueryExt,
} from '@dao-dao/types/contracts/NeutronCwdPreProposeSingleOverrule'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { NeutronCwdPreProposeSingleOverruleQueryClient } from '../../../contracts'
import { indexerQueries } from '../indexer'

export const neutronCwdPreProposeSingleOverruleQueryKeys = {
  contract: [
    {
      contract: 'neutronCwdPreProposeSingleOverrule',
    },
  ] as const,
  address: (chainId: string, contractAddress: string) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.contract[0],
        chainId,
        contractAddress,
      },
    ] as const,
  proposalModule: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.address(
          chainId,
          contractAddress
        ),
        method: 'proposalModule',
        args,
      },
    ] as const,
  dao: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.address(
          chainId,
          contractAddress
        ),
        method: 'dao',
        args,
      },
    ] as const,
  config: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.address(
          chainId,
          contractAddress
        ),
        method: 'config',
        args,
      },
    ] as const,
  depositInfo: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.address(
          chainId,
          contractAddress
        ),
        method: 'depositInfo',
        args,
      },
    ] as const,
  queryExtension: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...neutronCwdPreProposeSingleOverruleQueryKeys.address(
          chainId,
          contractAddress
        ),
        method: 'queryExtension',
        args,
      },
    ] as const,
}

export const neutronCwdPreProposeSingleOverruleQueries = {
  proposalModule: <TData = Addr>({
    chainId,
    contractAddress,
    options,
  }: NeutronCwdPreProposeSingleOverruleProposalModulesQuery<TData>) =>
    queryOptions({
      queryKey: neutronCwdPreProposeSingleOverruleQueryKeys.proposalModule(
        chainId,
        contractAddress
      ),
      queryFn: async (ctx) => {
        try {
          // Attempt to fetch data from the indexer.
          return await ctx.client.fetchQuery(
            indexerQueries.queryContract({
              chainId,
              contractAddress,
              formula: 'neutron/cwdPreProposeSingleOverrule/proposalModule',
            })
          )
        } catch (error) {
          console.error(error)
        }

        // If indexer query fails, fallback to contract query.
        return new NeutronCwdPreProposeSingleOverruleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          contractAddress
        ).proposalModule()
      },
      ...options,
    }),
  dao: <TData = Addr>({
    chainId,
    contractAddress,
    options,
  }: NeutronCwdPreProposeSingleOverruleDaoQuery<TData>) =>
    queryOptions({
      queryKey: neutronCwdPreProposeSingleOverruleQueryKeys.dao(
        chainId,
        contractAddress
      ),
      queryFn: async (ctx) => {
        try {
          // Attempt to fetch data from the indexer.
          return await ctx.client.fetchQuery(
            indexerQueries.queryContract({
              chainId,
              contractAddress,
              formula: 'neutron/cwdPreProposeSingleOverrule/dao',
            })
          )
        } catch (error) {
          console.error(error)
        }

        // If indexer query fails, fallback to contract query.
        return new NeutronCwdPreProposeSingleOverruleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          contractAddress
        ).dao()
      },
      ...options,
    }),
  config: <TData = Config>({
    chainId,
    contractAddress,
    options,
  }: NeutronCwdPreProposeSingleOverruleConfigQuery<TData>) =>
    queryOptions({
      queryKey: neutronCwdPreProposeSingleOverruleQueryKeys.config(
        chainId,
        contractAddress
      ),
      queryFn: async (ctx) => {
        try {
          // Attempt to fetch data from the indexer.
          return await ctx.client.fetchQuery(
            indexerQueries.queryContract({
              chainId,
              contractAddress,
              formula: 'neutron/cwdPreProposeSingleOverrule/config',
            })
          )
        } catch (error) {
          console.error(error)
        }

        // If indexer query fails, fallback to contract query.
        return new NeutronCwdPreProposeSingleOverruleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          contractAddress
        ).config()
      },
      ...options,
    }),
  depositInfo: <TData = DepositInfoResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: NeutronCwdPreProposeSingleOverruleDepositInfoQuery<TData>) =>
    queryOptions({
      queryKey: neutronCwdPreProposeSingleOverruleQueryKeys.depositInfo(
        chainId,
        contractAddress,
        args
      ),
      queryFn: async (ctx) => {
        try {
          // Attempt to fetch data from the indexer.
          return await ctx.client.fetchQuery(
            indexerQueries.queryContract({
              chainId,
              contractAddress,
              formula: 'neutron/cwdPreProposeSingleOverrule/depositInfo',
              args,
            })
          )
        } catch (error) {
          console.error(error)
        }

        // If indexer query fails, fallback to contract query.
        return new NeutronCwdPreProposeSingleOverruleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          contractAddress
        ).depositInfo(args)
      },
      ...options,
    }),
  queryExtension: <TData = any>({
    chainId,
    contractAddress,
    args,
    options,
  }: NeutronCwdPreProposeSingleOverruleQueryExtensionQuery<TData>) =>
    queryOptions({
      queryKey: neutronCwdPreProposeSingleOverruleQueryKeys.queryExtension(
        chainId,
        contractAddress,
        args
      ),
      queryFn: async (ctx) => {
        try {
          // Attempt to fetch data from the indexer.
          const query = args.msg
          if ('overrule_proposal_id' in query) {
            const overruleProposalId = await ctx.client.fetchQuery(
              indexerQueries.queryContract({
                chainId,
                contractAddress,
                formula:
                  'neutron/cwdPreProposeSingleOverrule/overruleProposalId',
                args: {
                  timelockAddress: query.overrule_proposal_id.timelock_address,
                  subdaoProposalId:
                    query.overrule_proposal_id.subdao_proposal_id,
                },
              })
            )
            if (typeof overruleProposalId === 'number') {
              return overruleProposalId
            }
          }
        } catch (error) {
          console.error(error)
        }

        // If indexer query fails, fallback to contract query.
        return new NeutronCwdPreProposeSingleOverruleQueryClient(
          await getCosmWasmClientForChainId(chainId),
          contractAddress
        ).queryExtension(args)
      },
      ...options,
    }),
}

export interface NeutronCwdPreProposeSingleOverruleReactQuery<
  TResponse,
  TData = TResponse,
> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface NeutronCwdPreProposeSingleOverruleProposalModulesQuery<TData>
  extends NeutronCwdPreProposeSingleOverruleReactQuery<Addr, TData> {}
export interface NeutronCwdPreProposeSingleOverruleDaoQuery<TData>
  extends NeutronCwdPreProposeSingleOverruleReactQuery<Addr, TData> {}
export interface NeutronCwdPreProposeSingleOverruleConfigQuery<TData>
  extends NeutronCwdPreProposeSingleOverruleReactQuery<Config, TData> {}
export interface NeutronCwdPreProposeSingleOverruleDepositInfoQuery<TData>
  extends NeutronCwdPreProposeSingleOverruleReactQuery<
    DepositInfoResponse,
    TData
  > {
  args: {
    proposalId: number
  }
}
export interface NeutronCwdPreProposeSingleOverruleQueryExtensionQuery<TData>
  extends NeutronCwdPreProposeSingleOverruleReactQuery<any, TData> {
  args: {
    msg: QueryExt
  }
}
