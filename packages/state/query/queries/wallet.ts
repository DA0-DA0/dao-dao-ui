import { QueryClient, queryOptions } from '@tanstack/react-query'
import uniq from 'lodash.uniq'

import {
  GenericTokenBalance,
  LazyDaoCardProps,
  MemberOfDao,
  TokenType,
} from '@dao-dao/types'
import {
  CommonError,
  DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES,
  INACTIVE_DAO_NAMES,
  contractNameMatches,
  getFallbackImage,
  isErrorWithSubstring,
  parseContractVersion,
} from '@dao-dao/utils'

import { contractQueries } from './contract'
import { daoDaoCoreQueries, daoVotingTokenStakedQueries } from './contracts'
import { indexerQueries } from './indexer'
import { tokenQueries } from './token'

/**
 * Fetch the DAOs that an address is a member of.
 */
export const fetchWalletMemberOfDaos = async (
  queryClient: QueryClient,
  { chainId, address }: { chainId: string; address: string }
): Promise<MemberOfDao[]> => {
  const daos = await queryClient
    .fetchQuery(
      indexerQueries.queryAccount<MemberOfDao[]>({
        chainId,
        address,
        formula: 'daos/memberOf',
        noFallback: true,
      })
    )
    .then((daos) => daos || [])
    .catch((err) =>
      isErrorWithSubstring(err, CommonError.NoIndexerForChain)
        ? []
        : Promise.reject(err)
    )

  // Cache other queries.
  daos.forEach(({ dao, info, config, votingModule, votingModuleInfo }) => {
    queryClient.setQueryData(
      contractQueries.info({
        chainId,
        address: dao,
      }).queryKey,
      { info }
    )
    queryClient.setQueryData(
      daoDaoCoreQueries.config({
        chainId,
        contractAddress: dao,
      }).queryKey,
      config
    )
    queryClient.setQueryData(
      daoDaoCoreQueries.votingModule({
        chainId,
        contractAddress: dao,
      }).queryKey,
      votingModule
    )
    queryClient.setQueryData(
      contractQueries.info({
        chainId,
        address: votingModule,
      }).queryKey,
      { info: votingModuleInfo }
    )
  })

  return daos
}

/**
 * Fetch lazy card info for DAOs this wallet is a member of.
 */
export const fetchLazyWalletDaos = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<LazyDaoCardProps[]> => {
  const daos = await queryClient.fetchQuery(
    walletQueries.memberOfDaos({ chainId, address })
  )

  const lazyDaoCards = daos.map(
    ({ dao, info, config, proposalCount }): LazyDaoCardProps => ({
      info: {
        chainId,
        coreAddress: dao,
        coreVersion: parseContractVersion(info.version),
        name: config.name,
        description: config.description,
        imageUrl: config.image_url || getFallbackImage(dao),
      },
      isInactive:
        INACTIVE_DAO_NAMES.includes(config.name) || proposalCount === 0,
    })
  )

  return lazyDaoCards
}

/**
 * Fetch the denoms of tokens used in staking DAOs that an address is a member
 * of.
 */
export const fetchWalletTokenDaoStakedDenoms = async (
  queryClient: QueryClient,
  { chainId, address }: { chainId: string; address: string }
): Promise<string[]> => {
  const daos = (
    await queryClient.fetchQuery(
      walletQueries.memberOfDaos({ chainId, address })
    )
  ).filter(({ votingModuleInfo }) =>
    contractNameMatches(
      votingModuleInfo.contract,
      DAO_VOTING_TOKEN_STAKED_CONTRACT_NAMES
    )
  )

  if (daos.length === 0) {
    return []
  }

  // Get a list of denoms from the voting modules.
  const denoms = await Promise.all(
    daos.map(({ votingModule }) =>
      queryClient.fetchQuery(
        daoVotingTokenStakedQueries.denom({
          contractAddress: votingModule,
          chainId,
        })
      )
    )
  )

  // Return the unique denoms.
  return uniq(denoms.map(({ denom }) => denom))
}

/**
 * Fetch the CW20 balances for a wallet.
 */
export const fetchWalletCw20Balances = async (
  queryClient: QueryClient,
  { chainId, address }: { chainId: string; address: string }
): Promise<GenericTokenBalance[]> => {
  const cw20Contracts: {
    contractAddress: string
    balance: string
  }[] =
    (await queryClient.fetchQuery(
      indexerQueries.queryAccount({
        chainId,
        address,
        formula: 'tokens/list',
        noFallback: true,
      })
    )) ?? []

  const tokens = await Promise.all(
    cw20Contracts.map(
      async ({ contractAddress, balance }): Promise<GenericTokenBalance> => ({
        token: await queryClient.fetchQuery(
          tokenQueries.info({
            chainId,
            type: TokenType.Cw20,
            denomOrAddress: contractAddress,
          })
        ),
        balance,
      })
    )
  )

  return tokens
}

export const walletQueries = {
  /**
   * Fetch the DAOs that an address is a member of.
   */
  memberOfDaos: (options: Parameters<typeof fetchWalletMemberOfDaos>[1]) =>
    queryOptions({
      queryKey: ['wallet', 'memberOfDaos', options],
      queryFn: (ctx) => fetchWalletMemberOfDaos(ctx.client, options),
    }),
  /**
   * Fetch lazy card info for DAOs this wallet is a member of.
   */
  lazyWalletDaos: (options: Parameters<typeof fetchLazyWalletDaos>[1]) =>
    queryOptions({
      queryKey: ['wallet', 'lazyWalletDaos', options],
      queryFn: (ctx) => fetchLazyWalletDaos(ctx.client, options),
    }),
  /**
   * Fetch the denoms of tokens used in staking DAOs that an address is a member
   * of.
   */
  tokenDaoStakedDenoms: (
    options: Parameters<typeof fetchWalletTokenDaoStakedDenoms>[1]
  ) =>
    queryOptions({
      queryKey: ['wallet', 'tokenDaoStakedDenoms', options],
      queryFn: (ctx) => fetchWalletTokenDaoStakedDenoms(ctx.client, options),
    }),
  /**
   * Fetch the CW20 balances for a wallet.
   */
  cw20Balances: (options: Parameters<typeof fetchWalletCw20Balances>[1]) =>
    queryOptions({
      queryKey: ['wallet', 'cw20Balances', options],
      queryFn: (ctx) => fetchWalletCw20Balances(ctx.client, options),
    }),
}
