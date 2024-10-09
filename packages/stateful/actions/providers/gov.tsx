import { useQueryClient } from '@tanstack/react-query'

import { accountQueries, chainQueries } from '@dao-dao/state'
import { ErrorPage, PageLoader, useChain } from '@dao-dao/stateless'
import {
  ActionContextType,
  ChainId,
  GovActionsProviderProps,
} from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../hooks'
import { BaseActionsProvider } from './base'

export const GovActionsProvider = ({
  loader,
  children,
}: GovActionsProviderProps) => {
  const { chainId } = useChain()
  const queryClient = useQueryClient()
  const govParams = useQueryLoadingDataWithError(
    chainQueries.govParams(queryClient, {
      chainId,
    })
  )
  const moduleAddress = useQueryLoadingDataWithError(
    chainQueries.moduleAddress({
      chainId,
      name: 'gov',
    })
  )
  const accounts = useQueryLoadingDataWithError(
    moduleAddress.loading || moduleAddress.errored
      ? undefined
      : accountQueries.list(queryClient, {
          chainId,
          address: moduleAddress.data,
          // Make sure to load ICAs for Neutron so Valence accounts load.
          includeIcaChains: [ChainId.NeutronMainnet],
        })
  )

  return govParams.loading ||
    moduleAddress.loading ||
    (accounts.loading && !moduleAddress.errored) ? (
    <>{loader || <PageLoader />}</>
  ) : govParams.errored ? (
    <ErrorPage error={govParams.error} />
  ) : moduleAddress.errored ? (
    <ErrorPage error={moduleAddress.error} />
  ) : accounts.errored ? (
    <ErrorPage error={accounts.error} />
  ) : (
    <BaseActionsProvider
      actionContext={{
        type: ActionContextType.Gov,
        params: govParams.data,
        // Type-check. Will never be loading here.
        accounts: accounts.loading ? [] : accounts.data,
      }}
      address={moduleAddress.data}
    >
      {children}
    </BaseActionsProvider>
  )
}
