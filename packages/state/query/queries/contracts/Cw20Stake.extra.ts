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
    cw20StakeExtraQueries.isOraichainProxySnapshotContract({
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
    indexerQueries.queryContract({
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

export const cw20StakeExtraQueries = {
  /**
   * The Oraichain cw20-staking-proxy-snapshot contract is used as the staking
   * contract for their custom staking solution. This selector returns whether
   * or not this is a cw20-staking-proxy-snapshot contract.
   */
  isOraichainProxySnapshotContract: (options: {
    chainId: string
    address: string
  }) =>
    contractQueries.isContract({
      ...options,
      nameOrNames: ContractName.OraichainCw20StakingProxySnapshot,
    }),
  /**
   * Get config for Oraichain's cw20-staking-proxy-snapshot contract.
   */
  oraichainProxySnapshotConfig: (
    options: Parameters<typeof fetchOraichainProxySnapshotConfig>[1]
  ) =>
    queryOptions({
      queryKey: ['cw20StakeExtra', 'oraichainProxySnapshotConfig', options],
      queryFn: (ctx) => fetchOraichainProxySnapshotConfig(ctx.client, options),
    }),
}
