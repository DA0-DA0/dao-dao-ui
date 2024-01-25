import { selectorFamily } from 'recoil'

import { Addr, Binary, WithChainId } from '@dao-dao/types'
import {
  Config,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/NeutronCwdSubdaoPreProposeSingle'

import { NeutronCwdSubdaoPreProposeSingleQueryClient } from '../../../contracts/NeutronCwdSubdaoPreProposeSingle'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  NeutronCwdSubdaoPreProposeSingleQueryClient,
  QueryClientParams
>({
  key: 'neutronCwdSubdaoPreProposeSingleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new NeutronCwdSubdaoPreProposeSingleQueryClient(
        client,
        contractAddress
      )
    },
  dangerouslyAllowMutability: true,
})

export const proposalModuleSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdSubdaoPreProposeSingleQueryClient['proposalModule']
    >
  }
>({
  key: 'neutronCwdSubdaoPreProposeSingleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdSubdaoPreProposeSingle/proposalModule',
        })
      )
      if (proposalModule) {
        return proposalModule
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.proposalModule(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<NeutronCwdSubdaoPreProposeSingleQueryClient['dao']>
  }
>({
  key: 'neutronCwdSubdaoPreProposeSingleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdSubdaoPreProposeSingle/dao',
        })
      )
      if (dao) {
        return dao
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.dao(...params)
    },
})
export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<NeutronCwdSubdaoPreProposeSingleQueryClient['config']>
  }
>({
  key: 'neutronCwdSubdaoPreProposeSingleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdSubdaoPreProposeSingle/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const depositInfoSelector = selectorFamily<
  DepositInfoResponse,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdSubdaoPreProposeSingleQueryClient['depositInfo']
    >
  }
>({
  key: 'neutronCwdSubdaoPreProposeSingleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const depositInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdSubdaoPreProposeSingle/depositInfo',
          args: params[0],
        })
      )
      if (depositInfo) {
        return depositInfo
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.depositInfo(...params)
    },
})
export const queryExtensionSelector = selectorFamily<
  Binary,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdSubdaoPreProposeSingleQueryClient['queryExtension']
    >
  }
>({
  key: 'neutronCwdSubdaoPreProposeSingleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const { msg } = params[0]
      if ('timelock_address' in msg) {
        const timelockAddress = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'neutron/cwdSubdaoPreProposeSingle/timelockAddress',
          })
        )
        if (timelockAddress) {
          return timelockAddress
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})
