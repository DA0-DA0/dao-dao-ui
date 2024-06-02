import { DaoSource } from '@dao-dao/types'

import { indexerQueries } from './indexer'

export const daoQueries = {
  /**
   * Fetch featured DAOs.
   */
  listFeatured: () =>
    indexerQueries.snapper<DaoSource[]>({
      query: 'daodao-featured-daos',
    }),
}
