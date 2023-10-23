import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  AllowanceResponse,
  AllowancesResponse,
  AllowlistResponse,
  BeforeSendHookInfo,
  DenomResponse,
  DenylistResponse,
  IsFrozenResponse,
  OwnershipForAddr,
  StatusResponse,
} from '@dao-dao/types/contracts/CwTokenfactoryIssuer'

import { CwTokenfactoryIssuerQueryClient } from '../../../contracts/CwTokenfactoryIssuer'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwTokenfactoryIssuerQueryClient,
  QueryClientParams
>({
  key: 'cwTokenfactoryIssuerQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwTokenfactoryIssuerQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const isFrozenSelector = selectorFamily<
  IsFrozenResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['isFrozen']>
  }
>({
  key: 'cwTokenfactoryIssuerIsFrozen',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.isFrozen(...params)
    },
})
export const denomSelector = selectorFamily<
  DenomResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['denom']>
  }
>({
  key: 'cwTokenfactoryIssuerDenom',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.denom(...params)
    },
})
export const ownershipSelector = selectorFamily<
  OwnershipForAddr,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['ownership']>
  }
>({
  key: 'cwTokenfactoryIssuerOwnership',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.ownership(...params)
    },
})
export const burnAllowanceSelector = selectorFamily<
  AllowanceResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['burnAllowance']>
  }
>({
  key: 'cwTokenfactoryIssuerBurnAllowance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.burnAllowance(...params)
    },
})
export const burnAllowancesSelector = selectorFamily<
  AllowancesResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['burnAllowances']>
  }
>({
  key: 'cwTokenfactoryIssuerBurnAllowances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.burnAllowances(...params)
    },
})
export const mintAllowanceSelector = selectorFamily<
  AllowanceResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['mintAllowance']>
  }
>({
  key: 'cwTokenfactoryIssuerMintAllowance',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.mintAllowance(...params)
    },
})
export const mintAllowancesSelector = selectorFamily<
  AllowancesResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['mintAllowances']>
  }
>({
  key: 'cwTokenfactoryIssuerMintAllowances',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.mintAllowances(...params)
    },
})
export const isDeniedSelector = selectorFamily<
  StatusResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['isDenied']>
  }
>({
  key: 'cwTokenfactoryIssuerIsDenied',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.isDenied(...params)
    },
})
export const denylistSelector = selectorFamily<
  DenylistResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['denylist']>
  }
>({
  key: 'cwTokenfactoryIssuerDenylist',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.denylist(...params)
    },
})
export const isAllowedSelector = selectorFamily<
  StatusResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['isAllowed']>
  }
>({
  key: 'cwTokenfactoryIssuerIsAllowed',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.isAllowed(...params)
    },
})
export const allowlistSelector = selectorFamily<
  AllowlistResponse,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['allowlist']>
  }
>({
  key: 'cwTokenfactoryIssuerAllowlist',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.allowlist(...params)
    },
})
export const beforeSendHookInfoSelector = selectorFamily<
  BeforeSendHookInfo,
  QueryClientParams & {
    params: Parameters<CwTokenfactoryIssuerQueryClient['beforeSendHookInfo']>
  }
>({
  key: 'cwTokenfactoryIssuerBeforeSendHookInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.beforeSendHookInfo(...params)
    },
})
