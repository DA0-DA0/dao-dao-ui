import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ContractVersionInfo, LazyDaoCardProps } from '@dao-dao/types'
import { Config as DaoDaoCoreConfig } from '@dao-dao/types/contracts/DaoDaoCore'
import {
  INACTIVE_DAO_NAMES,
  getFallbackImage,
  parseContractVersion,
} from '@dao-dao/utils'

import { indexerQueries } from './indexer'

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
  const daos: {
    dao: string
    info: ContractVersionInfo
    config: DaoDaoCoreConfig
    proposalCount: number
  }[] = await queryClient.fetchQuery(
    indexerQueries.queryAccount({
      chainId,
      address,
      formula: 'daos/memberOf',
      noFallback: true,
    })
  )
  if (!daos || !Array.isArray(daos)) {
    return []
  }

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

export const walletQueries = {
  /**
   * Fetch lazy card info for DAOs this wallet is a member of.
   */
  lazyWalletDaos: (options: Parameters<typeof fetchLazyWalletDaos>[1]) =>
    queryOptions({
      queryKey: ['wallet', 'lazyWalletDaos', options],
      queryFn: (ctx) => fetchLazyWalletDaos(ctx.client, options),
    }),
}
