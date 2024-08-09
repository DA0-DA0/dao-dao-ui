import { useQueryClient } from '@tanstack/react-query'
import { ReactNode, useEffect, useMemo, useState } from 'react'

import {
  ChainProvider,
  DaoContext,
  ErrorPage,
  IDaoContext,
  Loader,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { DaoProvidersProps } from '@dao-dao/types'

import { DaoActionsProvider } from '../../actions'
import { ChainXGovDao, SecretCwDao, getDao } from '../../clients/dao'
import { useWallet } from '../../hooks'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'

type InitializedDaoProvidersProps = {
  context: IDaoContext
  children: ReactNode
}

export const DaoProviders = ({
  chainId,
  coreAddress,
  children,
  loaderFallback,
  LoaderFallback = Loader,
}: DaoProvidersProps) => {
  const queryClient = useQueryClient()

  const context = useMemo<IDaoContext>(
    () => ({
      dao: getDao({
        queryClient,
        chainId,
        coreAddress,
      }),
    }),
    [chainId, coreAddress, queryClient]
  )

  // Register wallet offline signer if Secret DAO so it can request permits.
  const { isWalletConnected, signAmino } = useWallet()
  // Stabilize reference so callback doesn't change. This only needs to update
  // on wallet connection state change anyway.
  const signAminoRef = useUpdatingRef(signAmino)

  useEffect(() => {
    if (context.dao instanceof SecretCwDao && isWalletConnected) {
      context.dao.registerSignAmino(signAminoRef.current)
    }
  }, [context, isWalletConnected, signAminoRef])

  // Start loading only if client not initialized. If the data is already
  // cached, the DAO instance may be initialized on creation.
  const forceLoading = !context.dao.initialized || !coreAddress
  const [loading, setLoading] = useState(forceLoading)
  const [error, setError] = useState<Error>()

  // Initialize client if not already initialized.
  useEffect(() => {
    if (!context.dao.initialized && coreAddress) {
      setLoading(true)
      context.dao
        .init()
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
  }, [context, coreAddress])

  return loading || forceLoading ? (
    loaderFallback ? (
      <>{loaderFallback}</>
    ) : (
      <LoaderFallback />
    )
  ) : error ? (
    <ErrorPage error={error} />
  ) : (
    <InitializedDaoProviders context={context}>
      {children}
    </InitializedDaoProviders>
  )
}

const InitializedDaoProviders = ({
  context,
  children,
}: InitializedDaoProvidersProps) => (
  // Add a unique key here to tell React to re-render everything when the
  // `coreAddress` is changed, since for some insane reason, Next.js does not
  // reset state when navigating between dynamic rotues. Even though the `info`
  // value passed below changes, somehow no re-render occurs... unless the `key`
  // prop is unique. See the issue below for more people compaining about this
  // to no avail. https://github.com/vercel/next.js/issues/9992
  <ChainProvider chainId={context.dao.chainId}>
    <DaoContext.Provider key={context.dao.coreAddress} value={context}>
      {
        // Don't wrap chain governance in voting module or DAO actions provider.
        context.dao instanceof ChainXGovDao ? (
          children
        ) : (
          <VotingModuleAdapterProvider>
            <DaoActionsProvider>{children}</DaoActionsProvider>
          </VotingModuleAdapterProvider>
        )
      }
    </DaoContext.Provider>
  </ChainProvider>
)
