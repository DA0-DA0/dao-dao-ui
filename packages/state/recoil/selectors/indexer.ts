import { atom, selector, selectorFamily } from 'recoil'

import { Expiration, WithChainId } from '@dao-dao/types'
import { DumpStateResponse } from '@dao-dao/types/contracts/DaoCore.v2'

import {
  DaoSearchResult,
  QueryIndexerOptions,
  queryIndexer,
  searchDaos,
} from '../../indexer'
import {
  refreshOpenProposalsAtom,
  refreshWalletProposalStatsAtom,
  walletAddressAtom,
} from '../atoms'

export const queryContractIndexerSelector = selectorFamily<
  any,
  {
    contractAddress: string
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryContractIndexer',
  get:
    ({ contractAddress, formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer(
          'contract',
          contractAddress,
          formulaName,
          options
        )
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const queryWalletIndexerSelector = selectorFamily<
  any,
  {
    walletAddress: string
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryWalletIndexer',
  get:
    ({ walletAddress, formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer('wallet', walletAddress, formulaName, options)
      } catch (err) {
        // If the indexer fails, return null.
        console.error(err)
        return null
      }
    },
})

export const queryGenericIndexerSelector = selectorFamily<
  any,
  {
    formulaName: string
    // Refresh by changing this value.
    id?: number
  } & QueryIndexerOptions
>({
  key: 'queryGenericIndexer',
  get:
    ({ formulaName, ...options }) =>
    async () => {
      try {
        return await queryIndexer('generic', '_', formulaName, options)
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
    proposals: {
      id: number
      proposal: { expiration: Expiration }
      voted?: boolean
    }[]
  }[],
  WithChainId<{ coreAddress: string; address?: string }>
>({
  key: 'openProposals',
  get:
    ({ coreAddress, chainId, address }) =>
    ({ get }) => {
      const id = get(refreshOpenProposalsAtom)
      const openProposals = get(
        queryContractIndexerSelector({
          contractAddress: coreAddress,
          formulaName: 'daoCore/openProposals',
          chainId,
          id,
          args: { address },
        })
      )
      return openProposals ?? []
    },
})

export const walletProposalStatsSelector = selectorFamily<
  | {
      created: number
      votesCast: number
    }
  | undefined,
  WithChainId<{ address: string }>
>({
  key: 'walletProposalStats',
  get:
    ({ address, chainId }) =>
    ({ get }) => {
      const id = get(refreshWalletProposalStatsAtom)
      const stats = get(
        queryWalletIndexerSelector({
          walletAddress: address,
          formulaName: 'proposals/stats',
          chainId,
          id,
        })
      )
      return stats ?? undefined
    },
})

export const featuredDaoDumpStatesAtom = atom<
  (DumpStateResponse & { coreAddress: string })[] | null
>({
  key: 'featuredDaoDumpStates',
  default: null,
})

export const walletMemberOfDaosSelector = selector<string[]>({
  key: 'walletMemberOfDaos',
  get: ({ get }) => {
    const walletAddress = get(walletAddressAtom)
    if (!walletAddress) {
      return []
    }

    const walletMemberOfDaos: string[] = get(
      queryWalletIndexerSelector({
        walletAddress,
        formulaName: 'daos/memberOf',
      })
    )

    return walletMemberOfDaos && Array.isArray(walletMemberOfDaos)
      ? walletMemberOfDaos
      : []
  },
})
