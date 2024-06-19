import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import { Addr, IndexerDumpState } from '@dao-dao/types'
import {
  AdminNominationResponse,
  AdminResponse,
  ConfigResponse,
  Cw20BalancesResponse,
  DaoURIResponse,
  DumpStateResponse,
  GetItemResponse,
  InfoResponse,
  ListAllSubDaosResponse,
  ListItemsResponse,
  ListSubDaosResponse,
  PauseInfoResponse,
  ProposalModulesResponse,
  SubDao,
  SubDaoWithChainId,
  TotalPowerAtHeightResponse,
  VotingModuleResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { DaoCoreV2QueryClient } from '../../../contracts/DaoCore.v2'
import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'
import { polytoneQueries } from '../polytone'

export const daoDaoCoreQueryKeys = {
  contract: [
    {
      contract: 'daoDaoCore',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...daoDaoCoreQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  admin: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'admin',
        ...(args && { args }),
      },
    ] as const,
  adminNomination: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'admin_nomination',
        ...(args && { args }),
      },
    ] as const,
  config: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'config',
        ...(args && { args }),
      },
    ] as const,
  cw20Balances: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'cw20_balances',
        ...(args && { args }),
      },
    ] as const,
  cw20TokenList: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'cw20_token_list',
        ...(args && { args }),
      },
    ] as const,
  cw721TokenList: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'cw721_token_list',
        ...(args && { args }),
      },
    ] as const,
  dumpState: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'dump_state',
        ...(args && { args }),
      },
    ] as const,
  getItem: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'get_item',
        ...(args && { args }),
      },
    ] as const,
  listItems: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'list_items',
        ...(args && { args }),
      },
    ] as const,
  listAllItems: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'list_all_items',
        ...(args && { args }),
      },
    ] as const,
  info: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'info',
        ...(args && { args }),
      },
    ] as const,
  proposalModules: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'proposal_modules',
        ...(args && { args }),
      },
    ] as const,
  activeProposalModules: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'active_proposal_modules',
        ...(args && { args }),
      },
    ] as const,
  proposalModuleCount: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'proposal_module_count',
        ...(args && { args }),
      },
    ] as const,
  pauseInfo: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'pause_info',
        ...(args && { args }),
      },
    ] as const,
  votingModule: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'voting_module',
        ...(args && { args }),
      },
    ] as const,
  listSubDaos: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'list_sub_daos',
        ...(args && { args }),
      },
    ] as const,
  listAllSubDaos: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'list_all_sub_daos',
        ...(args && { args }),
      },
    ] as const,
  daoURI: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'dao_u_r_i',
        ...(args && { args }),
      },
    ] as const,
  votingPowerAtHeight: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'voting_power_at_height',
        ...(args && { args }),
      },
    ] as const,
  totalPowerAtHeight: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoDaoCoreQueryKeys.address(contractAddress)[0],
        method: 'total_power_at_height',
        ...(args && { args }),
      },
    ] as const,
}
export const daoDaoCoreQueries = {
  admin: <TData = AdminResponse>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: DaoDaoCoreAdminQuery<TData>
  ): UseQueryOptions<AdminResponse, Error, TData> => ({
    queryKey: daoDaoCoreQueryKeys.admin(contractAddress),
    queryFn: async () => {
      try {
        return await queryClient.fetchQuery(
          indexerQueries.queryContract<string | null>(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoCore/admin',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).admin()
    },
    ...options,
  }),
  adminNomination: <TData = AdminNominationResponse>({
    chainId,
    contractAddress,
    options,
  }: DaoDaoCoreAdminNominationQuery<TData>): UseQueryOptions<
    AdminNominationResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.adminNomination(contractAddress),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).adminNomination(),
    ...options,
  }),
  config: <TData = ConfigResponse>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: DaoDaoCoreConfigQuery<TData>
  ): UseQueryOptions<ConfigResponse, Error, TData> => ({
    queryKey: daoDaoCoreQueryKeys.config(contractAddress),
    queryFn: async () => {
      try {
        const config = await queryClient.fetchQuery(
          indexerQueries.queryContract<ConfigResponse>(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoCore/config',
          })
        )
        if (config) {
          return config
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).config()
    },
    ...options,
  }),
  cw20Balances: <TData = Cw20BalancesResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreCw20BalancesQuery<TData>): UseQueryOptions<
    Cw20BalancesResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.cw20Balances(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).cw20Balances({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  cw20TokenList: <TData = Addr[]>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreCw20TokenListQuery<TData>): UseQueryOptions<
    Addr[],
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.cw20TokenList(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).cw20TokenList({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  cw721TokenList: <TData = Addr[]>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreCw721TokenListQuery<TData>): UseQueryOptions<
    Addr[],
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.cw721TokenList(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).cw721TokenList({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  dumpState: <TData = DumpStateResponse | IndexerDumpState>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: DaoDaoCoreDumpStateQuery<TData>
  ): UseQueryOptions<DumpStateResponse | IndexerDumpState, Error, TData> => ({
    queryKey: daoDaoCoreQueryKeys.dumpState(contractAddress),
    queryFn: async () => {
      try {
        const indexerState = await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoCore/dumpState',
          })
        )
        if (indexerState) {
          return indexerState
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).dumpState()
    },
    ...options,
  }),
  getItem: <TData = GetItemResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreGetItemQuery<TData>): UseQueryOptions<
    GetItemResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.getItem(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).getItem({
        key: args.key,
      }),
    ...options,
  }),
  listItems: <TData = ListItemsResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreListItemsQuery<TData>): UseQueryOptions<
    ListItemsResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.listItems(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listItems({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  listAllItems: <TData = ListItemsResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoDaoCoreListAllItemsQuery<TData>
  ): UseQueryOptions<ListItemsResponse, Error, TData> => ({
    queryKey: daoDaoCoreQueryKeys.listAllItems(contractAddress, args),
    queryFn: async () => {
      let items: ListItemsResponse | undefined

      try {
        const indexerItems = await queryClient.fetchQuery(
          indexerQueries.queryContract<ListItemsResponse>(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoCore/listItems',
          })
        )
        if (indexerItems) {
          items = indexerItems
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      if (!items) {
        items = []
        const limit = 30
        while (true) {
          const page = await queryClient.fetchQuery(
            daoDaoCoreQueries.listItems({
              chainId,
              contractAddress,
              args: {
                limit,
                startAfter: items.length
                  ? items[items.length - 1]?.[0]
                  : undefined,
              },
            })
          )
          if (!page.length) {
            break
          }

          items.push(...page)

          // If we have less than the limit of items, we've exhausted them.
          if (page.length < limit) {
            break
          }
        }
      }

      // If we have a prefix, filter out items that don't start with it, and
      // then remove the prefix from each key.
      if (args?.prefix) {
        items = items.flatMap(([key, value]) =>
          key.startsWith(args.prefix!)
            ? [[key.substring(args.prefix!.length), value]]
            : []
        )
      }

      return items
    },
    ...options,
  }),
  info: <TData = InfoResponse>({
    chainId,
    contractAddress,
    options,
  }: DaoDaoCoreInfoQuery<TData>): UseQueryOptions<
    InfoResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.info(contractAddress),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).info(),
    ...options,
  }),
  proposalModules: <TData = ProposalModulesResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreProposalModulesQuery<TData>): UseQueryOptions<
    ProposalModulesResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.proposalModules(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).proposalModules({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  activeProposalModules: <TData = ProposalModulesResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreActiveProposalModulesQuery<TData>): UseQueryOptions<
    ProposalModulesResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.activeProposalModules(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).activeProposalModules({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  pauseInfo: <TData = PauseInfoResponse>({
    chainId,
    contractAddress,
    options,
  }: DaoDaoCorePauseInfoQuery<TData>): UseQueryOptions<
    PauseInfoResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.pauseInfo(contractAddress),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).pauseInfo(),
    ...options,
  }),
  votingModule: <TData = VotingModuleResponse>({
    chainId,
    contractAddress,
    options,
  }: DaoDaoCoreVotingModuleQuery<TData>): UseQueryOptions<
    VotingModuleResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.votingModule(contractAddress),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).votingModule(),
    ...options,
  }),
  listSubDaos: <TData = ListSubDaosResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreListSubDaosQuery<TData>): UseQueryOptions<
    ListSubDaosResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.listSubDaos(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listSubDaos({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  listAllSubDaos: <TData = ListAllSubDaosResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoDaoCoreListAllSubDaosQuery<TData>
  ): UseQueryOptions<ListAllSubDaosResponse, Error, TData> => ({
    queryKey: daoDaoCoreQueryKeys.listAllSubDaos(contractAddress, args),
    queryFn: async () => {
      let subDaos: SubDao[] | undefined

      try {
        const indexerSubDaos = await queryClient.fetchQuery(
          indexerQueries.queryContract<SubDao[]>(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoCore/listSubDaos',
          })
        )
        if (indexerSubDaos) {
          subDaos = indexerSubDaos
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      if (!subDaos) {
        subDaos = []
        const limit = 30
        while (true) {
          const page = await queryClient.fetchQuery(
            daoDaoCoreQueries.listSubDaos({
              chainId,
              contractAddress,
              args: {
                limit,
                startAfter: subDaos.length
                  ? subDaos[subDaos.length - 1]?.addr
                  : undefined,
              },
            })
          )
          if (!page.length) {
            break
          }

          subDaos.push(...page)

          // If we have less than the limit of subDaos, we've exhausted them.
          if (page.length < limit) {
            break
          }
        }
      }

      const subDaosWithChainId = (
        await Promise.all(
          subDaos.map(async (subDao): Promise<SubDaoWithChainId | []> => {
            const [isDao, isPolytoneProxy] = await Promise.all([
              queryClient.fetchQuery(
                contractQueries.isDao(queryClient, {
                  chainId,
                  address: subDao.addr,
                })
              ),
              queryClient.fetchQuery(
                contractQueries.isPolytoneProxy(queryClient, {
                  chainId,
                  address: subDao.addr,
                })
              ),
            ])

            if (isDao) {
              // Filter SubDAO by admin if specified.
              if (args?.onlyAdmin) {
                const admin = await queryClient.fetchQuery(
                  daoDaoCoreQueries.admin(queryClient, {
                    chainId,
                    contractAddress: subDao.addr,
                  })
                )

                if (admin !== contractAddress) {
                  return []
                }
              }

              return {
                ...subDao,
                chainId,
              }
            }

            // Reverse lookup polytone proxy and verify it's a DAO, as long as
            // not filtering by admin, since polytone proxies do not have admins
            // and live on other chains.
            if (isPolytoneProxy && !args?.onlyAdmin) {
              try {
                const { chainId: remoteChainId, remoteAddress } =
                  await queryClient.fetchQuery(
                    polytoneQueries.reverseLookupProxy(queryClient, {
                      chainId,
                      address: subDao.addr,
                    })
                  )

                return {
                  chainId: remoteChainId,
                  addr: remoteAddress,
                  charter: subDao.charter,
                }
              } catch (error) {
                console.error(error)
              }
            }

            return []
          })
        )
      ).flat()

      return subDaosWithChainId
    },
    ...options,
  }),
  daoURI: <TData = DaoURIResponse>({
    chainId,
    contractAddress,
    options,
  }: DaoDaoCoreDaoURIQuery<TData>): UseQueryOptions<
    DaoURIResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.daoURI(contractAddress),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).daoURI(),
    ...options,
  }),
  votingPowerAtHeight: <TData = VotingPowerAtHeightResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreVotingPowerAtHeightQuery<TData>): UseQueryOptions<
    VotingPowerAtHeightResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.votingPowerAtHeight(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).votingPowerAtHeight({
        address: args.address,
        height: args.height,
      }),
    ...options,
  }),
  totalPowerAtHeight: <TData = TotalPowerAtHeightResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: DaoDaoCoreTotalPowerAtHeightQuery<TData>): UseQueryOptions<
    TotalPowerAtHeightResponse,
    Error,
    TData
  > => ({
    queryKey: daoDaoCoreQueryKeys.totalPowerAtHeight(contractAddress, args),
    queryFn: async () =>
      new DaoCoreV2QueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).totalPowerAtHeight({
        height: args.height,
      }),
    ...options,
  }),
}

export interface DaoDaoCoreReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface DaoDaoCoreTotalPowerAtHeightQuery<TData>
  extends DaoDaoCoreReactQuery<TotalPowerAtHeightResponse, TData> {
  args: {
    height?: number
  }
}
export interface DaoDaoCoreVotingPowerAtHeightQuery<TData>
  extends DaoDaoCoreReactQuery<VotingPowerAtHeightResponse, TData> {
  args: {
    address: string
    height?: number
  }
}
export interface DaoDaoCoreDaoURIQuery<TData>
  extends DaoDaoCoreReactQuery<DaoURIResponse, TData> {}
export interface DaoDaoCoreListSubDaosQuery<TData>
  extends DaoDaoCoreReactQuery<ListSubDaosResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreListAllSubDaosQuery<TData>
  extends DaoDaoCoreReactQuery<ListAllSubDaosResponse, TData> {
  args?: {
    /**
     * Only include SubDAOs that this DAO is the admin of, meaning this DAO can
     * execute on behalf of the SubDAO. Defaults to false.
     */
    onlyAdmin?: boolean
  }
}
export interface DaoDaoCoreVotingModuleQuery<TData>
  extends DaoDaoCoreReactQuery<VotingModuleResponse, TData> {}
export interface DaoDaoCorePauseInfoQuery<TData>
  extends DaoDaoCoreReactQuery<PauseInfoResponse, TData> {}
export interface DaoDaoCoreActiveProposalModulesQuery<TData>
  extends DaoDaoCoreReactQuery<ProposalModulesResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreProposalModulesQuery<TData>
  extends DaoDaoCoreReactQuery<ProposalModulesResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreInfoQuery<TData>
  extends DaoDaoCoreReactQuery<InfoResponse, TData> {}
export interface DaoDaoCoreListItemsQuery<TData>
  extends DaoDaoCoreReactQuery<ListItemsResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreListAllItemsQuery<TData>
  extends DaoDaoCoreReactQuery<ListItemsResponse, TData> {
  args?: {
    /**
     * Optionally specify a prefix to filter results by and then remove from
     * each returned key.
     */
    prefix?: string
  }
}
export interface DaoDaoCoreGetItemQuery<TData>
  extends DaoDaoCoreReactQuery<GetItemResponse, TData> {
  args: {
    key: string
  }
}
export interface DaoDaoCoreDumpStateQuery<TData>
  extends DaoDaoCoreReactQuery<DumpStateResponse, TData> {}
export interface DaoDaoCoreCw721TokenListQuery<TData>
  extends DaoDaoCoreReactQuery<Addr[], TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreCw20TokenListQuery<TData>
  extends DaoDaoCoreReactQuery<Addr[], TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreCw20BalancesQuery<TData>
  extends DaoDaoCoreReactQuery<Cw20BalancesResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface DaoDaoCoreConfigQuery<TData>
  extends DaoDaoCoreReactQuery<ConfigResponse, TData> {}
export interface DaoDaoCoreAdminNominationQuery<TData>
  extends DaoDaoCoreReactQuery<AdminNominationResponse, TData> {}
export interface DaoDaoCoreAdminQuery<TData>
  extends DaoDaoCoreReactQuery<AdminResponse, TData> {}
