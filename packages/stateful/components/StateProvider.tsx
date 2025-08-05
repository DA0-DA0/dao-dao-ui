import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo } from 'react'
import { MutableSnapshot, RecoilRoot, useSetRecoilState } from 'recoil'

import { queryClientAtom } from '@dao-dao/state'
import {
  DependencyTrackedQueryClientContext,
  useDependencyTrackedQueryClient,
} from '@dao-dao/stateless'
import { DehydratedStateWithDependencies } from '@dao-dao/types'
import { makeDependencyTrackedQueryClient } from '@dao-dao/utils'

export type StateProviderProps = {
  /**
   * Children to render.
   */
  children: ReactNode
  /**
   * Optional dehyrated state from a react-query client instance on the server
   * to initialize data.
   */
  dehydratedState?: DehydratedStateWithDependencies
  /**
   * Optional RecoilRoot state initializer.
   */
  recoilStateInitializer?: (mutableSnapshot: MutableSnapshot) => void
}

/**
 * A provider that wraps an app with the state providers, like React Query and
 * Recoil.
 */
export const StateProvider = ({
  children,
  dehydratedState,
  recoilStateInitializer,
}: StateProviderProps) => {
  const client = useMemo(
    () => makeDependencyTrackedQueryClient(dehydratedState),
    [dehydratedState]
  )

  return (
    <DependencyTrackedQueryClientContext.Provider value={client}>
      <QueryClientProvider client={client.queryClient}>
        <RecoilRoot
          initializeState={(snapshot) => {
            // Give query client to Recoil so selectors can access queries.
            snapshot.set(queryClientAtom, client)

            // Call the recoil root state initializer if provided.
            recoilStateInitializer?.(snapshot)
          }}
        >
          <InnerStateProvider>{children}</InnerStateProvider>
        </RecoilRoot>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </DependencyTrackedQueryClientContext.Provider>
  )
}

const InnerStateProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useDependencyTrackedQueryClient()
  const setQueryClient = useSetRecoilState(queryClientAtom)
  // Update Recoil atom when the query client changes.
  useEffect(() => {
    setQueryClient(queryClient)
  }, [queryClient, setQueryClient])

  return <>{children} </>
}
