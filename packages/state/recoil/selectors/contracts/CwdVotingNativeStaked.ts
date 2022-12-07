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
} from '@dao-dao/types/contracts/CwdVotingNativeStaked'

import {
  CwdVotingNativeStakedClient,
  CwdVotingNativeStakedQueryClient,
} from '../../../contracts/CwdVotingNativeStaked'
import { signingCosmWasmClientAtom } from '../../atoms'
import { refreshWalletBalancesIdAtom } from '../../atoms/refresh'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  CwdVotingNativeStakedQueryClient,
  QueryClientParams
>({
  key: 'cwdVotingNativeStakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdVotingNativeStakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdVotingNativeStakedClient | undefined,
  ExecuteClientParams
>({
  key: 'cwdVotingNativeStakedExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwdVotingNativeStakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const daoSelector = selectorFamily<
  DaoResponse,
  QueryClientParams & {
    params: Parameters<CwdVotingNativeStakedQueryClient['dao']>
  }
>({
  key: 'cwdVotingNativeStakedDao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['getConfig']>
  }
>({
  key: 'cwdVotingNativeStakedGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const config = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['claims']>
  }
>({
  key: 'cwdVotingNativeStakedClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const claims = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['listStakers']>
  }
>({
  key: 'cwdVotingNativeStakedListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const stakers = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdVotingNativeStakedVotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      const votingPower = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdVotingNativeStakedTotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      const totalPower = get(
        queryIndexerSelector({
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
    params: Parameters<CwdVotingNativeStakedQueryClient['info']>
  }
>({
  key: 'cwdVotingNativeStakedInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const info = get(
        queryIndexerSelector({
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
