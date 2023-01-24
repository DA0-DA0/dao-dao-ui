import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
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

import {
  Cw721BaseClient,
  Cw721BaseQueryClient,
} from '../../../contracts/Cw721Base'
import {
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  Cw721BaseQueryClient,
  QueryClientParams
>({
  key: 'cw721BaseQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw721BaseQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  Cw721BaseClient | undefined,
  ExecuteClientParams
>({
  key: 'cw721BaseExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new Cw721BaseClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const ownerOfSelector = selectorFamily<
  OwnerOfResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['ownerOf']>
  }
>({
  key: 'cw721BaseOwnerOf',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const ownerOf = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/ownerOf',
          args: params[0],
        })
      )
      if (ownerOf) {
        return ownerOf
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseApproval',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
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
  key: 'cw721BaseApprovals',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const approvals = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/approvals',
          args: params[0],
        })
      )
      if (approvals) {
        return { approvals }
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseAllOperators',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const operators = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/allOperators',
          args: params[0],
        })
      )
      if (operators) {
        return { operators }
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseNumTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const count = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/numTokens',
        })
      )
      if (count) {
        return { count }
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseContractInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const contractInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/contractInfo',
        })
      )
      if (contractInfo) {
        return contractInfo
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const nftInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/nftInfo',
          args: params[0],
        })
      )
      if (nftInfo) {
        return nftInfo
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseAllNftInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const allNftInfo = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/allNftInfo',
          args: params[0],
        })
      )
      if (allNftInfo) {
        return allNftInfo
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.allNftInfo(...params)
    },
})

// Use allTokensForOwnerSelector as it uses the indexer and implements
// pagination for chain queries.
export const _tokensSelector = selectorFamily<
  TokensResponse,
  QueryClientParams & {
    params: Parameters<Cw721BaseQueryClient['tokens']>
  }
>({
  key: 'cw721Base_Tokens',
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
  key: 'cw721Base_AllTokens',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const tokens = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/allTokens',
          args: params[0],
        })
      )
      if (tokens) {
        return { tokens }
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseMinter',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const minter = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/tokens',
        })
      )
      if (minter) {
        return { minter }
      }

      // If indexer query fails, fallback to contract query.
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
  key: 'cw721BaseAllTokensForOwner',
  get:
    ({ owner, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(owner))

      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'cw721/tokens',
          args: {
            owner,
          },
          id,
        })
      )
      if (list) {
        return list
      }

      // If indexer query fails, fallback to contract query.

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
  key: 'cw721BaseAllTokens',
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
