import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'

import { entityQueries } from '@dao-dao/state/query'
import { useChain } from '@dao-dao/stateless'

export type UseEntityNameMapOptions = {
  chainId?: string
  addresses: string[]
}

export type UseEntityNameMapReturn = {
  map: Record<string, string | null | undefined>
  loading: boolean
  errored: boolean
  error?: unknown
}

/**
 * A hook that loads a map of entity addresses to names.
 *
 * The map reference remains stable.
 */
export const useEntityNameMap = ({
  chainId,
  addresses,
}: UseEntityNameMapOptions): UseEntityNameMapReturn => {
  const currentChainId = useChain().chainId

  const nameQueries = useQueries({
    queries: addresses.map((address) =>
      entityQueries.info({
        chainId: chainId ?? currentChainId,
        address,
      })
    ),
  })

  const [map] = useState<Record<string, string | null | undefined>>({})
  for (const query of nameQueries) {
    if (query.isSuccess && query.data) {
      map[query.data.address] = query.data.name
    }
  }

  return {
    map,
    loading: nameQueries.some((query) => query.isLoading),
    errored: nameQueries.some((query) => query.isError),
    error: nameQueries.find((query) => query.error)?.error,
  }
}
