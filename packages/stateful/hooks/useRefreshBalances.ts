import { useRecoilCallback } from 'recoil'

import { chainQueries, tokenQueries } from '@dao-dao/state/query'
import { refreshWalletBalancesIdAtom } from '@dao-dao/state/recoil'
import { useDependencyTrackedQueryClient } from '@dao-dao/stateless'

/**
 * Refresh balances for a given address or all addresses.
 *
 * @param defaultAccount - Default account to refresh balances for. By default,
 * all accounts are refreshed if no account nor default is provided.
 * @returns Function to refresh balances.
 */
export const useRefreshBalances = (defaultAccount?: {
  chainId: string
  address: string
}) => {
  const queryClient = useDependencyTrackedQueryClient()

  const refreshBalances = useRecoilCallback(
    ({ set }) =>
      (
        /**
         * Account to refresh balances for. If not provided, all accounts will
         * be refreshed.
         */
        account:
          | {
              chainId: string
              address: string
            }
          | undefined = defaultAccount,
        /**
         * If true, all accounts will be refreshed, even if an account is
         * provided. Defaults to false.
         */
        all = false
      ) => {
        if (account) {
          set(refreshWalletBalancesIdAtom(account.address), (id) => id + 1)

          if (!all) {
            queryClient.invalidate(
              // Intentionally omit denom so this will match all denoms.
              chainQueries.balance({
                chainId: account.chainId,
                address: account.address,
              } as any)
            )
            queryClient.invalidate(
              chainQueries.nativeStakedBalance({
                chainId: account.chainId,
                address: account.address,
              })
            )
            queryClient.invalidate(
              tokenQueries.nativeBalances({
                chainId: account.chainId,
                address: account.address,
              })
            )
            queryClient.invalidate(
              chainQueries.nativeDelegationInfo({
                chainId: account.chainId,
                address: account.address,
              })
            )
          }
        }
        if (!account || all) {
          set(refreshWalletBalancesIdAtom(undefined), (id) => id + 1)
          set(refreshWalletBalancesIdAtom(''), (id) => id + 1)

          queryClient.invalidate(
            chainQueries
              .balance({
                chainId: '',
                address: '',
                denom: '',
              })
              // Remove last element of query key to invalidate all.
              .queryKey.slice(0, -1)
          )
          queryClient.invalidate(
            chainQueries
              .nativeStakedBalance({
                chainId: '',
                address: '',
              })
              // Remove last element of query key to invalidate all.
              .queryKey.slice(0, -1)
          )
          queryClient.invalidate(
            tokenQueries
              .nativeBalances({
                chainId: '',
                address: '',
              })
              // Remove last element of query key to invalidate all.
              .queryKey.slice(0, -1)
          )
          queryClient.invalidate(
            chainQueries
              .nativeDelegationInfo({
                chainId: '',
                address: '',
              })
              // Remove last element of query key to invalidate all.
              .queryKey.slice(0, -1)
          )
        }
      },
    [queryClient]
  )

  return refreshBalances
}
