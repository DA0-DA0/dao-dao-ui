import { useQueryClient } from '@tanstack/react-query'
import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react'

import {
  ChainProvider,
  DaoContext,
  ErrorPage,
  IDaoContext,
  Loader,
} from '@dao-dao/stateless'
import { LoaderProps } from '@dao-dao/types'

import { DaoActionsProvider } from '../../actions'
import { ChainXGovDao, getDao } from '../../clients/dao'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'

export type DaoProvidersProps = {
  chainId: string
  /**
   * Passing an empty string will start in a loading state.
   */
  coreAddress: string
  children: ReactNode
  /**
   * Optionally override the loader with a rendered React node. Takes precedence
   * over `LoaderFallback`.
   */
  loaderFallback?: ReactNode
  /**
   * Optionally override the Loader class to be rendered with no props.
   */
  LoaderFallback?: ComponentType<LoaderProps>
}

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

  // Start loading only if client not initialized. If the data is already
  // cached, the DAO instance may be initialized on creation.
  const [loading, setLoading] = useState(
    !context.dao.initialized || !coreAddress
  )
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

  return loading ? (
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
}: InitializedDaoProvidersProps) => {
  // Don't wrap chain governance in voting module or DAO actions provider.
  const inner =
    context instanceof ChainXGovDao ? (
      children
    ) : (
      <VotingModuleAdapterProvider
        contractName={context.dao.info.votingModuleContractName}
        options={{
          chainId: context.dao.chainId,
          votingModuleAddress: context.dao.info.votingModuleAddress,
          coreAddress: context.dao.coreAddress,
        }}
      >
        <DaoActionsProvider>{children}</DaoActionsProvider>
      </VotingModuleAdapterProvider>
    )

  return (
    // Add a unique key here to tell React to re-render everything when the
    // `coreAddress` is changed, since for some insane reason, Next.js does not
    // reset state when navigating between dynamic rotues. Even though the
    // `info` value passed below changes, somehow no re-render occurs... unless
    // the `key` prop is unique. See the issue below for more people compaining
    // about this to no avail. https://github.com/vercel/next.js/issues/9992
    <ChainProvider chainId={context.dao.chainId}>
      <DaoContext.Provider key={context.dao.coreAddress} value={context}>
        {inner}
      </DaoContext.Provider>
    </ChainProvider>
  )
}
