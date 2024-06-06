import { QueryClient, QueryKey, dehydrate } from '@tanstack/react-query'

export const makeReactQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Global default to 60 seconds.
        staleTime: 60 * 1000,
      },
    },
  })

/**
 * Dehydrate query client and remove undefined values so it can be serialized.
 */
export const dehydrateSerializable: typeof dehydrate = (...args) => {
  const dehydrated = dehydrate(...args)
  return {
    mutations: dehydrated.mutations,
    queries: dehydrated.queries.map(({ queryKey, ...query }) => ({
      ...query,
      queryKey: removeUndefinedFromQueryKey(queryKey) as QueryKey,
    })),
  }
}

const removeUndefinedFromQueryKey = (value: unknown): unknown =>
  typeof value === 'object' && value !== null
    ? Object.fromEntries(
        Object.entries(value).flatMap(([k, v]) =>
          v === undefined ? [] : [[k, removeUndefinedFromQueryKey(v)]]
        )
      )
    : Array.isArray(value)
    ? value.flatMap((v) =>
        v === undefined ? [] : [removeUndefinedFromQueryKey(v)]
      )
    : value
