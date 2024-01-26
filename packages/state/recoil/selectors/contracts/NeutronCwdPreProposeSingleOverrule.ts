import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Addr,
  Config,
  DepositInfoResponse,
} from '@dao-dao/types/contracts/NeutronCwdPreProposeSingleOverrule'

import { NeutronCwdPreProposeSingleOverruleQueryClient } from '../../../contracts/NeutronCwdPreProposeSingleOverrule'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  NeutronCwdPreProposeSingleOverruleQueryClient,
  QueryClientParams
>({
  key: 'neutronCwdPreProposeSingleOverruleQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new NeutronCwdPreProposeSingleOverruleQueryClient(
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
      NeutronCwdPreProposeSingleOverruleQueryClient['proposalModule']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleProposalModule',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const proposalModule = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdPreProposeSingleOverrule/proposalModule',
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
    params: Parameters<NeutronCwdPreProposeSingleOverruleQueryClient['dao']>
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdPreProposeSingleOverrule/dao',
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
    params: Parameters<NeutronCwdPreProposeSingleOverruleQueryClient['config']>
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdPreProposeSingleOverrule/config',
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
      NeutronCwdPreProposeSingleOverruleQueryClient['depositInfo']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleDepositInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const depositInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'neutron/cwdPreProposeSingleOverrule/depositInfo',
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
  string | number,
  QueryClientParams & {
    params: Parameters<
      NeutronCwdPreProposeSingleOverruleQueryClient['queryExtension']
    >
  }
>({
  key: 'neutronCwdPreProposeSingleOverruleQueryExtension',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const { msg } = params[0]
      if ('overrule_proposal_id' in msg) {
        const overruleProposalId = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'neutron/cwdPreProposeSingleOverrule/overruleProposalId',
            args: {
              timelockAddress: msg.overrule_proposal_id.timelock_address,
              subdaoProposalId: msg.overrule_proposal_id.subdao_proposal_id,
            },
          })
        )
        if (typeof overruleProposalId === 'number') {
          return overruleProposalId
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.queryExtension(...params)
    },
})
