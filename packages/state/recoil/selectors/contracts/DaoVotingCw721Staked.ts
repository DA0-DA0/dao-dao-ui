import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ArrayOfString,
  Config,
  NftClaimsResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw721Staked'

import {
  DaoVotingCw721StakedClient,
  DaoVotingCw721StakedQueryClient,
} from '../../../contracts/DaoVotingCw721Staked'
import {
  refreshClaimsIdAtom,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  DaoVotingCw721StakedQueryClient,
  QueryClientParams
>({
  key: 'daoVotingCw721StakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new DaoVotingCw721StakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  DaoVotingCw721StakedClient | undefined,
  ExecuteClientParams
>({
  key: 'cw721StakeExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new DaoVotingCw721StakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<DaoVotingCw721StakedQueryClient['config']>
  }
>({
  key: 'daoVotingCw721Config',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.config(...params)
    },
})
export const nftClaimsSelector = selectorFamily<
  NftClaimsResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw721StakedQueryClient['nftClaims']>
  }
>({
  key: 'daoVotingCw721StakedNftClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshClaimsIdAtom(params[0].address))
      return await client.nftClaims(...params)
    },
})
export const stakedNftsSelector = selectorFamily<
  ArrayOfString,
  QueryClientParams & {
    params: Parameters<DaoVotingCw721StakedQueryClient['stakedNfts']>
  }
>({
  key: 'daoVotingCw721StakedStakedNfts',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].address))
      return await client.stakedNfts(...params)
    },
})
export const totalPowerAtHeightSelector = selectorFamily<
  TotalPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw721StakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'daoVotingCw721TotalPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(undefined))
      get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))
      return await client.totalPowerAtHeight(...params)
    },
})
export const votingPowerAtHeightSelector = selectorFamily<
  VotingPowerAtHeightResponse,
  QueryClientParams & {
    params: Parameters<DaoVotingCw721StakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'daoVotingCw721VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].address))
      return await client.votingPowerAtHeight(...params)
    },
})

// Retrieve the staker for a given NFT from the indexer.
export const stakerForNftSelector = selectorFamily<
  string | undefined,
  WithChainId<{
    contractAddress: string
    tokenId: string
  }>
>({
  key: 'stakerForNft',
  get:
    ({ contractAddress, tokenId, chainId }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          chainId,
          contractAddress,
          formulaName: 'daoVotingCw721Staked/staker',
          args: {
            tokenId,
          },
        })
      ),
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      count: number
      votingPowerPercent: number
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'daoVotingCw721StakedTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formulaName: 'daoVotingCw721Staked/topStakers',
          args: {
            limit,
          },
        })
      ) ?? undefined,
})
