import { selectorFamily } from 'recoil'

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

// Use allTokensForOwnerSelector as it implements pagination for chain queries.
export const _tokensSelector = selectorFamily<
  TokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['tokens']>
  }
>({
  key: 'commonNft_Tokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].owner))
      return await client.tokens(...params)
    },
})
export const _allTokensSelector = selectorFamily<
  AllTokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['allTokens']>
  }
>({
  key: 'commonNft_AllTokens',
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

const ALL_TOKENS_FOR_OWNER_LIMIT = 30
export const allTokensForOwnerSelector = selectorFamily<
  TokensResponse['tokens'],
  QueryClientParams & {
    owner: string
  }
>({
  key: 'commonNftAllTokensForOwner',
  get:
    ({ owner, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshWalletBalancesIdAtom(owner))

      // Don't use the indexer for this since various NFT contracts have
      // different methods of storing NFT info, and the indexer does not know
      // about every different way.

      const tokens: TokensResponse['tokens'] = []
      while (true) {
        const response = await get(
          _tokensSelector({
            ...queryClientParams,
            params: [
              {
                owner,
                startAfter: tokens[tokens.length - 1],
                limit: ALL_TOKENS_FOR_OWNER_LIMIT,
              },
            ],
          })
        )?.tokens

        if (!response?.length) {
          break
        }

        tokens.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ALL_TOKENS_FOR_OWNER_LIMIT) {
          break
        }
      }

      return tokens
    },
})

const ALL_TOKENS_LIMIT = 30
export const allTokensSelector = selectorFamily<
  AllTokensResponse['tokens'],
  QueryClientParams
>({
  key: 'commonNftAllTokens',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      const tokens: AllTokensResponse['tokens'] = []
      while (true) {
        const response = await get(
          _allTokensSelector({
            ...queryClientParams,
            params: [
              {
                startAfter: tokens[tokens.length - 1],
                limit: ALL_TOKENS_LIMIT,
              },
            ],
          })
        )?.tokens

        if (!response?.length) {
          break
        }

        tokens.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < ALL_TOKENS_LIMIT) {
          break
        }
      }

      return tokens
    },
})
