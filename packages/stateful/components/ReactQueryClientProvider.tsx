import {
  DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

import { makeReactQueryClient } from '@dao-dao/state'

export type ReactQueryClientProviderProps = {
  /**
   * Children to render.
   */
  children: ReactNode
  /**
   * Optional dehyrated state from a react-query client instance on the server
   * to initialize data.
   */
  dehyratedState?: DehydratedState
}

/**
 * A provider that wraps an app with a React Query client.
 */
export const ReactQueryClientProvider = ({
  children,
  dehyratedState,
}: ReactQueryClientProviderProps) => {
  const [client] = useState(() => makeReactQueryClient())

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehyratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
