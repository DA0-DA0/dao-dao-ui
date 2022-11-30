import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  ArrayOfString,
  Config,
  NftClaimsResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/CwdVotingCw721Staked'

import {
  CwdVotingCw721StakedClient,
  CwdVotingCw721StakedQueryClient,
} from '../../../contracts/CwdVotingCw721Staked'
import {
  refreshClaimsIdAtom,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<
  CwdVotingCw721StakedQueryClient,
  QueryClientParams
>({
  key: 'cwdVotingCw721StakedQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwdVotingCw721StakedQueryClient(client, contractAddress)
    },
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwdVotingCw721StakedClient | undefined,
  ExecuteClientParams
>({
  key: 'cw721StakeExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new CwdVotingCw721StakedClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const configSelector = selectorFamily<
  Config,
  QueryClientParams & {
    params: Parameters<CwdVotingCw721StakedQueryClient['config']>
  }
>({
  key: 'cwdVotingCw721Config',
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
    params: Parameters<CwdVotingCw721StakedQueryClient['nftClaims']>
  }
>({
  key: 'cwdVotingCw721StakedNftClaims',
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
    params: Parameters<CwdVotingCw721StakedQueryClient['stakedNfts']>
  }
>({
  key: 'cwdVotingCw721StakedStakedNfts',
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
    params: Parameters<CwdVotingCw721StakedQueryClient['totalPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw721TotalPowerAtHeight',
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
    params: Parameters<CwdVotingCw721StakedQueryClient['votingPowerAtHeight']>
  }
>({
  key: 'cwdVotingCw721VotingPowerAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      get(refreshWalletBalancesIdAtom(params[0].address))
      return await client.votingPowerAtHeight(...params)
    },
})
