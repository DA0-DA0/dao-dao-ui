import { searchDaosSelector } from '@dao-dao/state/recoil/selectors/indexer'
import { useCachedLoadable } from '@dao-dao/stateless'

export interface UseSearchDaosOptions {
  query: string
  limit?: number
  exclude?: string[]
}

export const useSearchDaos = (options: UseSearchDaosOptions) =>
  useCachedLoadable(options.query ? searchDaosSelector(options) : undefined)
