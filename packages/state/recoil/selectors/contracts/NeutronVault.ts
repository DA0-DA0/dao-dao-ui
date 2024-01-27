/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { selectorFamily, waitForAllSettled } from 'recoil'

import { Addr, GenericToken, TokenType, WithChainId } from '@dao-dao/types'
import {
  ArrayOfTupleOfAddrAndUint128,
  BondingStatusResponse,
  Config,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/NeutronVault'

import {
  NeutronVaultClient,
  NeutronVaultQueryClient,
} from '../../../contracts/NeutronVault'
import {
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'
import { genericTokenSelector } from '../token'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  NeutronVaultQueryClient,
  QueryClientParams
>({
  key: 'neutronVaultQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new NeutronVaultQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  NeutronVaultClient | undefined,
  ExecuteClientParams
>({
  key: 'neutronVaultExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new NeutronVaultClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['config']>
  }
>({
  key: 'neutronVaultConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'neutronVaultVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      // Don't use the indexer because different vaults have different voting
      // power sources.
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'neutronVaultTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      // Don't use the indexer because different vaults have different voting
      // power sources.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const bondingStatusSelector = selectorFamily<
  BondingStatusResponse,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['bondingStatus']>
  }
>({
  key: 'neutronVaultBondingStatus',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(params[0].address))

      // Don't use the indexer because different vaults have different voting
      // power sources.
      const client = get(queryClient(queryClientParams))
      return await client.bondingStatus(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['dao']>
  }
>({
  key: 'neutronVaultDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const nameSelector = selectorFamily<
  String,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['name']>
  }
>({
  key: 'neutronVaultName',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.name(...params)
    },
})
export const descriptionSelector = selectorFamily<
  String,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['description']>
  }
>({
  key: 'neutronVaultDescription',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.description(...params)
    },
})
export const listBondersSelector = selectorFamily<
  ArrayOfTupleOfAddrAndUint128,
  QueryClientParams & {
    params: Parameters<NeutronVaultQueryClient['listBonders']>
  }
>({
  key: 'neutronVaultListBonders',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.listBonders(...params)
    },
})
export const infoSelector = contractInfoSelector

/**
 * Test whether or not this is a virtual vault.
 */
export const isVirtualSelector = selectorFamily<boolean, QueryClientParams>({
  key: 'neutronVaultIsVirtual',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const listBonders = get(
        waitForAllSettled([
          listBondersSelector({
            ...queryClientParams,
            params: [
              {
                limit: 1,
              },
            ],
          }),
        ])
      )[0]

      return (
        listBonders.state === 'hasError' &&
        listBonders.contents instanceof Error &&
        listBonders.contents.message.includes(
          'Bonding is not available for this contract'
        )
      )
    },
})

/**
 * Determine if this vault is real or virtual, and retrieve the bond token if
 * it's real.
 */
export const vaultInfoSelector = selectorFamily<
  // Real vaults have bond tokens.
  | {
      real: true
      bondToken: GenericToken
    }
  // Virtual vaults do not have bond tokens.
  | {
      real: false
    },
  QueryClientParams
>({
  key: 'neutronVaultVaultInfo',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const [isVirtual, _config] = get(
        waitForAllSettled([
          isVirtualSelector(queryClientParams),
          configSelector({
            ...queryClientParams,
            params: [],
          }),
        ])
      )

      if (isVirtual.state === 'hasValue' && isVirtual.contents) {
        return {
          real: false,
        }
      }

      const config = _config.state === 'hasValue' ? _config.contents : undefined
      if (!config || !('denom' in config)) {
        throw new Error('No config or denom for real vault')
      }

      const bondToken = get(
        genericTokenSelector({
          chainId: queryClientParams.chainId,
          type: TokenType.Native,
          denomOrAddress: config.denom,
        })
      )

      return {
        real: true,
        bondToken,
      }
    },
})