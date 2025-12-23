import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'

import { entityQueries } from '@dao-dao/state/query'
import { useChain } from '@dao-dao/stateless'
import { Entity } from '@dao-dao/types'

export type UseEntityMapOptions = {
  chainId?: string
  addresses: string[]
}

export type UseEntityMapReturn = {
  map: Record<string, Entity | undefined>
  loading: boolean
  errored: boolean
  error?: unknown
}

/**
 * A hook that loads a map of entity addresses to info.
 *
 * The map reference remains stable.
 */
export const useEntityMap = ({
  chainId,
  addresses,
}: UseEntityMapOptions): UseEntityMapReturn => {
  const currentChainId = useChain().chainId

  const queries = useQueries({
    queries: addresses.map((address) =>
      entityQueries.info({
        chainId: chainId ?? currentChainId,
        address,
      })
    ),
  })

  const [map] = useState<Record<string, Entity | undefined>>({})
  for (const query of queries) {
    if (query.isSuccess && query.data) {
      map[query.data.address] = query.data
    }
  }

  return {
    map,
    loading: queries.some((query) => query.isLoading),
    errored: queries.some((query) => query.isError),
    error: queries.find((query) => query.error)?.error,
  }
}
