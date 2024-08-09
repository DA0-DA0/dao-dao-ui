import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ConfigResponse as OraichainCw20StakingProxySnapshotConfigResponse } from '@dao-dao/types/contracts/OraichainCw20StakingProxySnapshot'
import { ContractName, getCosmWasmClientForChainId } from '@dao-dao/utils'

import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'

/**
 * Get config for Oraichain's cw20-staking-proxy-snapshot contract.
 */
export const fetchOraichainProxySnapshotConfig = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<OraichainCw20StakingProxySnapshotConfigResponse> => {
  const isOraichainProxy = await queryClient.fetchQuery(
    cw20StakeExtraQueries.isOraichainProxySnapshotContract(queryClient, {
      chainId,
      address,
    })
  )
  if (!isOraichainProxy) {
    throw new Error(
      'Contract is not an Oraichain cw20-staking proxy-snapshot contract'
    )
  }

  const config = await queryClient.fetchQuery(
    indexerQueries.queryContract(queryClient, {
      chainId,
      contractAddress: address,
      formula: 'item',
      args: {
        key: 'config',
      },
    })
  )
  if (config) {
    return config
  }

  // If indexer fails, fallback to querying chain.
  return await (
    await getCosmWasmClientForChainId(chainId)
  ).queryContractSmart(address, {
    config: {},
  })
}

/**
 * Fetch cw20-stake top stakers.
 */
export const fetchCw20StakeTopStakers = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    limit,
  }: {
    chainId: string
    address: string
    limit?: number
  }
): Promise<
  {
    address: string
    balance: string
  }[]
> => {
  // If Oraichain proxy, get staking token and pass to indexer query.
  let oraichainStakingToken: string | undefined
  const isOraichainProxy = await queryClient.fetchQuery(
    cw20StakeExtraQueries.isOraichainProxySnapshotContract(queryClient, {
      chainId,
      address,
    })
  )
  if (isOraichainProxy) {
    oraichainStakingToken = (
      await queryClient.fetchQuery(
        cw20StakeExtraQueries.oraichainProxySnapshotConfig(queryClient, {
          chainId,
          address,
        })
      )
    ).asset_key
  }

  return (
    (await queryClient.fetchQuery(
      indexerQueries.queryContract(queryClient, {
        chainId,
        contractAddress: address,
        formula: 'cw20Stake/topStakers',
        args: {
          ...(limit && { args: { limit } }),
          oraichainStakingToken,
        },
        noFallback: true,
      })
    )) || []
  )
}

export const cw20StakeExtraQueries = {
  /**
   * The Oraichain cw20-staking-proxy-snapshot contract is used as the staking
   * contract for their custom staking solution. This selector returns whether
   * or not this is a cw20-staking-proxy-snapshot contract.
   */
  isOraichainProxySnapshotContract: (
    queryClient: QueryClient,
    options: {
      chainId: string
      address: string
    }
  ) =>
    contractQueries.isContract(queryClient, {
      ...options,
      nameOrNames: ContractName.OraichainCw20StakingProxySnapshot,
    }),
  /**
   * Get config for Oraichain's cw20-staking-proxy-snapshot contract.
   */
  oraichainProxySnapshotConfig: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchOraichainProxySnapshotConfig>[1]
  ) =>
    queryOptions({
      queryKey: ['cw20StakeExtra', 'oraichainProxySnapshotConfig', options],
      queryFn: () => fetchOraichainProxySnapshotConfig(queryClient, options),
    }),
  /**
   * Fetch cw20-stake top stakers.
   */
  topStakers: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchCw20StakeTopStakers>[1]
  ) =>
    queryOptions({
      queryKey: ['cw20StakeExtra', 'topStakers', options],
      queryFn: () => fetchCw20StakeTopStakers(queryClient, options),
    }),
}
