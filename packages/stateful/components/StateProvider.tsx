import {
  DehydratedState,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import { makeReactQueryClient, queryClientAtom } from '@dao-dao/state'

export type StateProviderProps = {
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
 * A provider that wraps an app with the state providers, like React Query and
 * Recoil.
 */
export const StateProvider = ({
  children,
  dehyratedState,
}: StateProviderProps) => {
  const client = useMemo(
    () => makeReactQueryClient(dehyratedState),
    [dehyratedState]
  )

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot
        initializeState={
          // Give query client to Recoil so selectors can access queries.
          ({ set }) => set(queryClientAtom, client)
        }
      >
        <InnerStateProvider>{children}</InnerStateProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

const InnerStateProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()
  const setQueryClient = useSetRecoilState(queryClientAtom)
  // Update Recoil atom when the query client changes.
  useEffect(() => {
    setQueryClient(queryClient)
  }, [queryClient, setQueryClient])

  return <>{children} </>
}
