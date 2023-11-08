import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'
import {
  ActiveThresholdResponse,
  Boolean,
  ClaimsResponse,
  Config,
  DenomResponse,
  GetHooksResponse,
  ListStakersResponse,
  NullableAddr,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingTokenStaked'

import {
  DaoVotingTokenStakedClient,
  DaoVotingTokenStakedQueryClient,
} from '../../../contracts/DaoVotingTokenStaked'
import {
  refreshClaimsIdAtom,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  DaoVotingTokenStakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingTokenStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingTokenStakedQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  DaoVotingTokenStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'daoVotingTokenStakedExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new DaoVotingTokenStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const getConfigSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['getConfig']>
  }
>({
  key: 'daoVotingTokenStakedGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/config',
        })
      )
      if (config) {
        return config
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getConfig(...params)
    },
})
export const denomSelector = selectorFamily<
  DenomResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['denom']>
  }
>({
  key: 'daoVotingTokenStakedDenom',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const denom = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/denom',
        })
      )
      if (denom) {
        return { denom }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.denom(...params)
    },
})
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['claims']>
  }
>({
  key: 'daoVotingTokenStakedClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshClaimsIdAtom(params[0].address))

      const claimsResponse = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/claims',
          args: params[0],
          id,
        })
      )
      if (claimsResponse) {
        return claimsResponse
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['listStakers']>
  }
>({
  key: 'daoVotingTokenStakedListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const stakersResponse = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/listStakers',
          args: params[0],
        })
      )
      if (stakersResponse) {
        return stakersResponse
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})
export const activeThresholdSelector = selectorFamily<
  ActiveThresholdResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['activeThreshold']>
  }
>({
  key: 'daoVotingTokenStakedActiveThreshold',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.activeThreshold(...params)
    },
})
export const getHooksSelector = selectorFamily<
  GetHooksResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['getHooks']>
  }
>({
  key: 'daoVotingTokenStakedGetHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getHooks(...params)
    },
})
export const tokenContractSelector = selectorFamily<
  NullableAddr,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['tokenContract']>
  }
>({
  key: 'daoVotingTokenStakedTokenContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const tokenIssuerContract = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/tokenIssuerContract',
        })
      )
      if (tokenIssuerContract) {
        return tokenIssuerContract
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.tokenContract(...params)
    },
})
export const isActiveSelector = selectorFamily<
  Boolean,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['isActive']>
  }
>({
  key: 'daoVotingTokenStakedIsActive',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(undefined))
      const client = get(queryClient(queryClientParams))
      return await client.isActive(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingTokenStakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const votingPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/votingPower',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (votingPower && !isNaN(votingPower)) {
        return {
          power: votingPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingTokenStakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id =
        get(refreshWalletBalancesIdAtom(undefined)) +
        get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      const totalPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/totalPower',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (totalPower && !isNaN(totalPower)) {
        return {
          power: totalPower,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const daoSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<DaoVotingTokenStakedQueryClient['dao']>
  }
>({
  key: 'daoVotingTokenStakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingTokenStaked/dao',
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
export const infoSelector = contractInfoSelector
