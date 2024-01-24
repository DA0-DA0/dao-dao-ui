import { RecoilValueReadOnly, selectorFamily } from 'recoil'

import { ChainId, WithChainId } from '@dao-dao/types'
import {
  AllNftInfoResponse,
  AllOperatorsResponse,
  AllTokensResponse,
  ApprovalResponse,
  ApprovalsResponse,
  ContractInfoResponse,
  MinterResponse,
  NftInfoResponse,
  NumTokensResponse,
  OwnerOfResponse,
  TokensResponse,
} from '@dao-dao/types/contracts/Cw721Base'

import { Sg721BaseQueryClient } from '../../../contracts'
import { Cw721BaseQueryClient } from '../../../contracts/Cw721Base'
import {
  stargazeCollectionTokensForOwnerQuery,
  stargazeCollectionTokensQuery,
  stargazeIndexerClient,
} from '../../../graphql'
import { refreshWalletBalancesIdAtom } from '../../atoms'
import { queryClient as commonNftQueryClient } from './Cw721Base'
import { queryClient as sg721BaseQueryClient } from './Sg721Base'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  Cw721BaseQueryClient | Sg721BaseQueryClient,
  QueryClientParams
>({
  key: 'commonNftQueryClient',
  get:
    (params) =>
    ({ get }) =>
      params.chainId === ChainId.StargazeMainnet ||
      params.chainId === ChainId.StargazeTestnet
        ? get(sg721BaseQueryClient(params))
        : get(commonNftQueryClient(params)),
  dangerouslyAllowMutability: true,
})

export const ownerOfSelector = selectorFamily<
  OwnerOfResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['ownerOf']>
  }
>({
  key: 'commonNftOwnerOf',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.ownerOf(...params)
    },
})
export const approvalSelector = selectorFamily<
  ApprovalResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['approval']>
  }
>({
  key: 'commonNftApproval',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.approval(...params)
    },
})
export const approvalsSelector = selectorFamily<
  ApprovalsResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['approvals']>
  }
>({
  key: 'commonNftApprovals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.approvals(...params)
    },
})
export const allOperatorsSelector = selectorFamily<
  AllOperatorsResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allOperators']>
  }
>({
  key: 'commonNftAllOperators',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.allOperators(...params)
    },
})
export const numTokensSelector = selectorFamily<
  NumTokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['numTokens']>
  }
>({
  key: 'commonNftNumTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.numTokens(...params)
    },
})
export const contractInfoSelector = selectorFamily<
  ContractInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['contractInfo']>
  }
>({
  key: 'commonNftContractInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.contractInfo(...params)
    },
})
export const nftInfoSelector = selectorFamily<
  NftInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['nftInfo']>
  }
>({
  key: 'commonNftNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.nftInfo(...params)
    },
})
export const allNftInfoSelector = selectorFamily<
  AllNftInfoResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allNftInfo']>
  }
>({
  key: 'commonNftAllNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.allNftInfo(...params)
    },
})

export const tokensSelector = selectorFamily<
  TokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['tokens']>
  }
>({
  key: 'commonNftTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].owner))
      return await client.tokens(...params)
    },
})
export const allTokensSelector = selectorFamily<
  AllTokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allTokens']>
  }
>({
  key: 'commonNftAllTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.allTokens(...params)
    },
})
export const minterSelector = selectorFamily<
  MinterResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['minter']>
  }
>({
  key: 'commonNftMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.
      const client = get(queryClient(queryClientParams))
      return await client.minter(...params)
    },
})

export const paginatedStargazeAllTokensSelector = selectorFamily<
  AllTokensResponse['tokens'],
  QueryClientParams & { limit: number; offset: number }
>({
  key: 'commonNftPaginatedStargazeAllTokens',
  get:
    ({ chainId, contractAddress, limit, offset }) =>
    async () => {
      if (
        chainId !== ChainId.StargazeMainnet &&
        chainId !== ChainId.StargazeTestnet
      ) {
        throw new Error('Expected Stargaze mainnet chain')
      }

      const { error, data } = await stargazeIndexerClient.query({
        query: stargazeCollectionTokensQuery,
        variables: {
          collectionAddr: contractAddress,
          limit,
          offset,
        },
      })

      if (error) {
        throw error
      }

      if (!data.tokens?.pageInfo) {
        throw new Error('Unexpected response from Stargaze indexer')
      }

      return data.tokens.tokens.map(({ tokenId }) => tokenId)
    },
})

export const paginatedAllTokensSelector: (
  param: QueryClientParams & { page: number; pageSize: number }
) => RecoilValueReadOnly<AllTokensResponse['tokens']> = selectorFamily({
  key: 'commonNftPaginatedAllTokens',
  get:
    ({ chainId, contractAddress, page, pageSize }) =>
    async ({ get }) => {
      // Use Stargaze indexer if collection is on Stargaze.
      if (
        chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet
      ) {
        return get(
          paginatedStargazeAllTokensSelector({
            chainId,
            contractAddress,
            limit: pageSize,
            offset: (page - 1) * pageSize,
          })
        )
      } else {
        let startAfter: string | undefined
        // Get last page so we can retrieve the last token ID from it.
        if (page > 1) {
          const lastPage = get(
            paginatedAllTokensSelector({
              chainId,
              contractAddress,
              page: page - 1,
              pageSize,
            })
          )
          if (lastPage.length > 0) {
            startAfter = lastPage[lastPage.length - 1]
          }
        }

        const tokens = get(
          allTokensSelector({
            chainId,
            contractAddress,
            params: [
              {
                startAfter,
                limit: pageSize,
              },
            ],
          })
        )?.tokens

        if (!tokens?.length) {
          return []
        }

        return tokens
      }
    },
})

const ALL_TOKENS_LIMIT = 30
const ALL_TOKENS_STARGAZE_INDEXER_LIMIT = 100
export const unpaginatedAllTokensSelector = selectorFamily<
  AllTokensResponse['tokens'],
  QueryClientParams
>({
  key: 'commonNftUnpaginatedAllTokens',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const allTokens: AllTokensResponse['tokens'] = []

      // Use Stargaze indexer if collection is on Stargaze.
      if (
        queryClientParams.chainId === ChainId.StargazeMainnet ||
        queryClientParams.chainId === ChainId.StargazeTestnet
      ) {
        while (true) {
          const { error, data } = await stargazeIndexerClient.query({
            query: stargazeCollectionTokensQuery,
            variables: {
              collectionAddr: queryClientParams.contractAddress,
              limit: ALL_TOKENS_STARGAZE_INDEXER_LIMIT,
              offset: allTokens.length,
            },
          })

          if (error) {
            throw error
          }

          if (!data.tokens?.pageInfo) {
            break
          }

          allTokens.push(...data.tokens.tokens.map(({ tokenId }) => tokenId))

          if (allTokens.length === data.tokens.pageInfo.total) {
            break
          }
        }
      } else {
        while (true) {
          const tokens = await get(
            allTokensSelector({
              ...queryClientParams,
              params: [
                {
                  startAfter: allTokens[allTokens.length - 1],
                  limit: ALL_TOKENS_LIMIT,
                },
              ],
            })
          )?.tokens

          if (!tokens?.length) {
            break
          }

          allTokens.push(...tokens)

          // If we have less than the limit of items, we've exhausted them.
          if (tokens.length < ALL_TOKENS_LIMIT) {
            break
          }
        }
      }

      return allTokens
    },
})

export const unpaginatedAllTokensForOwnerSelector = selectorFamily<
  TokensResponse['tokens'],
  QueryClientParams & {
    owner: string
  }
>({
  key: 'commonNftUnpaginatedAllTokensForOwner',
  get:
    ({ owner, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(owner))

      const allTokens: TokensResponse['tokens'] = []

      // Use Stargaze indexer if collection is on Stargaze.
      if (
        queryClientParams.chainId === ChainId.StargazeMainnet ||
        queryClientParams.chainId === ChainId.StargazeTestnet
      ) {
        while (true) {
          const { error, data } = await stargazeIndexerClient.query({
            query: stargazeCollectionTokensForOwnerQuery,
            variables: {
              collectionAddr: queryClientParams.contractAddress,
              ownerAddrOrName: owner,
              limit: ALL_TOKENS_STARGAZE_INDEXER_LIMIT,
              offset: allTokens.length,
            },
            // Don't cache since this recoil selector handles caching. If this
            // selector is re-evaluated, it should be re-fetched since an NFT
            // may have changed ownership.
            fetchPolicy: 'no-cache',
          })

          if (error) {
            throw error
          }

          if (!data.tokens?.pageInfo) {
            break
          }

          allTokens.push(...data.tokens.tokens.map(({ tokenId }) => tokenId))

          if (allTokens.length === data.tokens.pageInfo.total) {
            break
          }
        }
      } else {
        // Don't use the DAO DAO indexer for this since various NFT contracts
        // have different methods of storing NFT info, and the indexer does not
        // know about every different way.

        while (true) {
          const tokens = await get(
            tokensSelector({
              ...queryClientParams,
              params: [
                {
                  owner,
                  startAfter: allTokens[allTokens.length - 1],
                  limit: ALL_TOKENS_LIMIT,
                },
              ],
            })
          )?.tokens

          if (!tokens?.length) {
            break
          }

          allTokens.push(...tokens)

          // If we have less than the limit of items, we've exhausted them.
          if (tokens.length < ALL_TOKENS_LIMIT) {
            break
          }
        }
      }

      return allTokens
    },
})
