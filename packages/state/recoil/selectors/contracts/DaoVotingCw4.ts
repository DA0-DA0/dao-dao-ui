import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw4'

import { DaoVotingCw4QueryClient } from '../../../contracts/DaoVotingCw4'
import { cosmWasmClientForChainSelector } from '../chain'
import { contractInfoSelector } from '../contract'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  DaoVotingCw4QueryClient,
  QueryClientParams
>({
  key: 'daoVotingCw4QueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingCw4QueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const groupContractSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoVotingCw4QueryClient['groupContract']>
  }
>({
  key: 'daoVotingCw4GroupContract',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const groupContract = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw4/groupContract',
        })
      )
      if (groupContract) {
        return groupContract
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.groupContract(...params)
    },
})
export const daoSelector = selectorFamily<
  string,
  QueryClientParams & {
    params: Parameters<DaoVotingCw4QueryClient['dao']>
  }
>({
  key: 'daoVotingCw4Dao',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const dao = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw4/dao',
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
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw4QueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingCw4VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const votingPowerAtHeight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw4/votingPowerAtHeight',
          args: {
            address: params[0].address,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
        })
      )
      if (votingPowerAtHeight) {
        return votingPowerAtHeight
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.votingPowerAtHeight(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw4QueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingCw4TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const totalPowerAtHeight = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'daoVotingCw4/totalPowerAtHeight',
          block: params[0].height ? { height: params[0].height } : undefined,
        })
      )
      if (totalPowerAtHeight) {
        return totalPowerAtHeight
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalPowerAtHeight(...params)
    },
})
export const infoSelector = contractInfoSelector
