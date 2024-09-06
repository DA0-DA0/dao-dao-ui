import { useQueryClient } from '@tanstack/react-query'

import { accountQueries } from '@dao-dao/state/query'
import { ErrorPage, Loader } from '@dao-dao/stateless'
import { ActionContextType, WalletActionsProviderProps } from '@dao-dao/types'

import {
  useProfile,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../hooks'
import { BaseActionsProvider } from './base'

export const WalletActionsProvider = ({
  address: overrideAddress,
  children,
}: WalletActionsProviderProps) => {
  const { address: connectedAddress, chain } = useWallet()

  const address =
    overrideAddress === undefined ? connectedAddress : overrideAddress

  const { profile } = useProfile({ address })

  const queryClient = useQueryClient()
  const accounts = useQueryLoadingDataWithError(
    address
      ? accountQueries.list(queryClient, {
          chainId: chain.chain_id,
          address,
        })
      : undefined
  )

  return address === undefined || profile.loading || accounts.loading ? (
    <Loader />
  ) : accounts.errored ? (
    <ErrorPage error={accounts.error} />
  ) : (
    <BaseActionsProvider
      actionContext={{
        type: ActionContextType.Wallet,
        profile: profile.data,
        accounts: accounts.data,
      }}
      address={address}
    >
      {children}
    </BaseActionsProvider>
  )
}