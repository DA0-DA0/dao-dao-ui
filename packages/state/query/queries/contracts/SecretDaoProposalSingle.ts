/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions } from '@tanstack/react-query'

import {
  Addr,
  Auth,
  Config,
  HooksResponse,
  InfoResponse,
  ProposalCreationPolicy,
  ProposalListResponse,
  ProposalResponse,
  Uint64,
  VoteListResponse,
  VoteResponse,
} from '@dao-dao/types/contracts/SecretDaoProposalSingle'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { SecretDaoProposalSingleQueryClient } from '../../../contracts/SecretDaoProposalSingle'

export const secretDaoProposalSingleQueryKeys = {
  contract: [
    {
      contract: 'secretDaoProposalSingle',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  config: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'config',
        args,
      },
    ] as const,
  proposal: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'proposal',
        args,
      },
    ] as const,
  listProposals: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'list_proposals',
        args,
      },
    ] as const,
  reverseProposals: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'reverse_proposals',
        args,
      },
    ] as const,
  getVote: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'get_vote',
        args,
      },
    ] as const,
  listVotes: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'list_votes',
        args,
      },
    ] as const,
  proposalCount: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'proposal_count',
        args,
      },
    ] as const,
  proposalCreationPolicy: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'proposal_creation_policy',
        args,
      },
    ] as const,
  proposalHooks: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'proposal_hooks',
        args,
      },
    ] as const,
  voteHooks: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'vote_hooks',
        args,
      },
    ] as const,
  dao: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'dao',
        args,
      },
    ] as const,
  info: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'info',
        args,
      },
    ] as const,
  nextProposalId: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...secretDaoProposalSingleQueryKeys.address(contractAddress)[0],
        method: 'next_proposal_id',
        args,
      },
    ] as const,
}
export const secretDaoProposalSingleQueries = {
  config: <TData = Config>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleConfigQuery<TData>): UseQueryOptions<
    Config,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.config(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).config(),
    ...options,
  }),
  proposal: <TData = ProposalResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: SecretDaoProposalSingleProposalQuery<TData>): UseQueryOptions<
    ProposalResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.proposal(contractAddress, args),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).proposal({
        proposalId: args.proposalId,
      }),
    ...options,
  }),
  listProposals: <TData = ProposalListResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: SecretDaoProposalSingleListProposalsQuery<TData>): UseQueryOptions<
    ProposalListResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.listProposals(
      contractAddress,
      args
    ),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listProposals({
        limit: args.limit,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  reverseProposals: <TData = ProposalListResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: SecretDaoProposalSingleReverseProposalsQuery<TData>): UseQueryOptions<
    ProposalListResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.reverseProposals(
      contractAddress,
      args
    ),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).reverseProposals({
        limit: args.limit,
        startBefore: args.startBefore,
      }),
    ...options,
  }),
  getVote: <TData = VoteResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: SecretDaoProposalSingleGetVoteQuery<TData>): UseQueryOptions<
    VoteResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.getVote(contractAddress, args),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).getVote({
        auth: args.auth,
        proposalId: args.proposalId,
      }),
    ...options,
  }),
  listVotes: <TData = VoteListResponse>({
    chainId,
    contractAddress,
    args,
    options,
  }: SecretDaoProposalSingleListVotesQuery<TData>): UseQueryOptions<
    VoteListResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.listVotes(contractAddress, args),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listVotes({
        limit: args.limit,
        proposalId: args.proposalId,
        startAfter: args.startAfter,
      }),
    ...options,
  }),
  proposalCount: <TData = number>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleProposalCountQuery<TData>): UseQueryOptions<
    number,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.proposalCount(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).proposalCount(),
    ...options,
  }),
  proposalCreationPolicy: <TData = ProposalCreationPolicy>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleProposalCreationPolicyQuery<TData>): UseQueryOptions<
    ProposalCreationPolicy,
    Error,
    TData
  > => ({
    queryKey:
      secretDaoProposalSingleQueryKeys.proposalCreationPolicy(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).proposalCreationPolicy(),
    ...options,
  }),
  proposalHooks: <TData = HooksResponse>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleProposalHooksQuery<TData>): UseQueryOptions<
    HooksResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.proposalHooks(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).proposalHooks(),
    ...options,
  }),
  voteHooks: <TData = HooksResponse>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleVoteHooksQuery<TData>): UseQueryOptions<
    HooksResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.voteHooks(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).voteHooks(),
    ...options,
  }),
  dao: <TData = Addr>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleDaoQuery<TData>): UseQueryOptions<
    Addr,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.dao(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).dao(),
    ...options,
  }),
  info: <TData = InfoResponse>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleInfoQuery<TData>): UseQueryOptions<
    InfoResponse,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.info(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).info(),
    ...options,
  }),
  nextProposalId: <TData = Uint64>({
    chainId,
    contractAddress,
    options,
  }: SecretDaoProposalSingleNextProposalIdQuery<TData>): UseQueryOptions<
    Uint64,
    Error,
    TData
  > => ({
    queryKey: secretDaoProposalSingleQueryKeys.nextProposalId(contractAddress),
    queryFn: async () =>
      new SecretDaoProposalSingleQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).nextProposalId(),
    ...options,
  }),
}
export interface SecretDaoProposalSingleReactQuery<
  TResponse,
  TData = TResponse
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
export interface SecretDaoProposalSingleNextProposalIdQuery<TData>
  extends SecretDaoProposalSingleReactQuery<Uint64, TData> {}
export interface SecretDaoProposalSingleInfoQuery<TData>
  extends SecretDaoProposalSingleReactQuery<InfoResponse, TData> {}
export interface SecretDaoProposalSingleDaoQuery<TData>
  extends SecretDaoProposalSingleReactQuery<Addr, TData> {}
export interface SecretDaoProposalSingleVoteHooksQuery<TData>
  extends SecretDaoProposalSingleReactQuery<HooksResponse, TData> {}
export interface SecretDaoProposalSingleProposalHooksQuery<TData>
  extends SecretDaoProposalSingleReactQuery<HooksResponse, TData> {}
export interface SecretDaoProposalSingleProposalCreationPolicyQuery<TData>
  extends SecretDaoProposalSingleReactQuery<ProposalCreationPolicy, TData> {}
export interface SecretDaoProposalSingleProposalCountQuery<TData>
  extends SecretDaoProposalSingleReactQuery<number, TData> {}
export interface SecretDaoProposalSingleListVotesQuery<TData>
  extends SecretDaoProposalSingleReactQuery<VoteListResponse, TData> {
  args: {
    limit?: number
    proposalId: number
    startAfter?: string
  }
}
export interface SecretDaoProposalSingleGetVoteQuery<TData>
  extends SecretDaoProposalSingleReactQuery<VoteResponse, TData> {
  args: {
    auth: Auth
    proposalId: number
  }
}
export interface SecretDaoProposalSingleReverseProposalsQuery<TData>
  extends SecretDaoProposalSingleReactQuery<ProposalListResponse, TData> {
  args: {
    limit?: number
    startBefore?: number
  }
}
export interface SecretDaoProposalSingleListProposalsQuery<TData>
  extends SecretDaoProposalSingleReactQuery<ProposalListResponse, TData> {
  args: {
    limit?: number
    startAfter?: number
  }
}
export interface SecretDaoProposalSingleProposalQuery<TData>
  extends SecretDaoProposalSingleReactQuery<ProposalResponse, TData> {
  args: {
    proposalId: number
  }
}
export interface SecretDaoProposalSingleConfigQuery<TData>
  extends SecretDaoProposalSingleReactQuery<Config, TData> {}