import { QueryClient } from '@tanstack/react-query'

export const makeReactQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Global default to 60 seconds.
        staleTime: 60 * 1000,
      },
    },
  })
