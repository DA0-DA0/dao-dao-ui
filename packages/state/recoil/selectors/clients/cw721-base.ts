import { selectorFamily } from 'recoil'

/**
 * This file was automatically generated by cosmwasm-typescript-gen@0.3.7.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the cosmwasm-typescript-gen generate command to regenerate this file.
 */

import {
  AllNftInfoResponse,
  AllOperatorsResponse,
  AllTokensResponse,
  ApprovalResponse,
  ApprovalsResponse,
  ContractInfoResponse,
  Cw721BaseQueryClient,
  MinterResponse,
  NftInfoResponse,
  NumTokensResponse,
  OwnerOfResponse,
  TokensResponse,
} from '../../../clients/cw721-base'
import { cosmWasmClientSelector } from '../chain'

type QueryClientParams = {
  contractAddress: string
}
export const queryClient = selectorFamily<
  Cw721BaseQueryClient,
  QueryClientParams
>({
  key: 'cw721BaseQueryClient',
  get:
    ({ contractAddress }) =>
    ({ get }) => {
      const client = get(cosmWasmClientSelector)
      return new Cw721BaseQueryClient(client, contractAddress)
    },
})
export const ownerOfSelector = selectorFamily<
  OwnerOfResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['ownerOf']>
  }
>({
  key: 'cw721BaseOwnerOf',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.ownerOf(...params)
    },
})
export const approvalSelector = selectorFamily<
  ApprovalResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['approval']>
  }
>({
  key: 'cw721BaseApproval',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.approval(...params)
    },
})
export const approvalsSelector = selectorFamily<
  ApprovalsResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['approvals']>
  }
>({
  key: 'cw721BaseApprovals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.approvals(...params)
    },
})
export const allOperatorsSelector = selectorFamily<
  AllOperatorsResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allOperators']>
  }
>({
  key: 'cw721BaseAllOperators',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.allOperators(...params)
    },
})
export const numTokensSelector = selectorFamily<
  NumTokensResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['numTokens']>
  }
>({
  key: 'cw721BaseNumTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.numTokens(...params)
    },
})
export const contractInfoSelector = selectorFamily<
  ContractInfoResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['contractInfo']>
  }
>({
  key: 'cw721BaseContractInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.contractInfo(...params)
    },
})
export const nftInfoSelector = selectorFamily<
  NftInfoResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['nftInfo']>
  }
>({
  key: 'cw721BaseNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.nftInfo(...params)
    },
})
export const allNftInfoSelector = selectorFamily<
  AllNftInfoResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allNftInfo']>
  }
>({
  key: 'cw721BaseAllNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.allNftInfo(...params)
    },
})
export const tokensSelector = selectorFamily<
  TokensResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['tokens']>
  }
>({
  key: 'cw721BaseTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.tokens(...params)
    },
})
export const allTokensSelector = selectorFamily<
  AllTokensResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allTokens']>
  }
>({
  key: 'cw721BaseAllTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.allTokens(...params)
    },
})
export const minterSelector = selectorFamily<
  MinterResponse | undefined,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['minter']>
  }
>({
  key: 'cw721BaseMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      if (!client) return
      return await client.minter(...params)
    },
})
