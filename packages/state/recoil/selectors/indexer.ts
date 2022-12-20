import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import {
  DaoSearchResult,
  QueryIndexerOptions,
  queryIndexer,
  searchDaos,
} from '../../indexer'
import { refreshOpenProposalsAtom } from '../atoms'

export const queryIndexerSelector = selectorFamily<
  any,
  {
    contractAddress: string
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryIndexer',
  get:
    ({ contractAddress, formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer(contractAddress, formulaName, options)
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const searchDaosSelector = selectorFamily<
  DaoSearchResult[],
  {
    query: string
    limit?: number
    exclude?: string[]
  }
>({
  key: 'searchDaos',
  get:
    ({ query, limit, exclude }) =>
    async () =>
      await searchDaos(query, limit, exclude),
})

export const openProposalsSelector = selectorFamily<
  {
    proposalModuleAddress: string
    proposals: { id: number }[]
  }[],
  WithChainId<{ coreAddress: string; address?: string }>
>({
  key: 'openProposals',
  get:
    ({ coreAddress, chainId, address }) =>
    ({ get }) => {
      const id = get(refreshOpenProposalsAtom)
      return get(
        queryIndexerSelector({
          contractAddress: coreAddress,
          formulaName: 'daoCore/openProposals',
          chainId,
          id,
          args: { address },
        })
      )
    },
})
