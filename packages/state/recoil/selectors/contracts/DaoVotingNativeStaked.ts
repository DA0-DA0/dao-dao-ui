import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ClaimsResponse,
  DaoResponse,
  GetConfigResponse,
  InfoResponse,
  ListStakersResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingNativeStaked'

import {
  DaoVotingNativeStakedClient,
  DaoVotingNativeStakedQueryClient,
} from '../../../contracts/DaoVotingNativeStaked'
import { signingCosmWasmClientAtom } from '../../atoms'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoVotingNativeStakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingNativeStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingNativeStakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  DaoVotingNativeStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'daoVotingNativeStakedExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new DaoVotingNativeStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['dao']>
  }
>({
  key: 'daoVotingNativeStakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/dao',
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
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['getConfig']>
  }
>({
  key: 'daoVotingNativeStakedGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/config',
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
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['claims']>
  }
>({
  key: 'daoVotingNativeStakedClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const claims = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/claims',
          args: params[0],
        })
      )
      // Null when indexer fails. Undefined if no claims.
      if (claims !== null) {
        return { claims: claims || [] }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['listStakers']>
  }
>({
  key: 'daoVotingNativeStakedListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const stakers = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/listStakers',
          args: params[0],
        })
      )
      if (stakers) {
        return { stakers }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const votingPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/votingPower',
          args: {
            address: params[0].address,
          },
          blockHeight: params[0].height,
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
    params: Parameters<DaoVotingNativeStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingNativeStakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const totalPower = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingNativeStaked/totalPower',
          blockHeight: params[0].height,
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
export const infoSelector = selectorFamily<
  InfoResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingNativeStakedQueryClient['info']>
  }
>({
  key: 'daoVotingNativeStakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'info',
        })
      )
      if (info) {
        return { info }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
