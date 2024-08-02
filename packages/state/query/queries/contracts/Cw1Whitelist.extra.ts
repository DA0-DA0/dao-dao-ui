import { QueryClient, queryOptions } from '@tanstack/react-query'

import { contractQueries } from '../contract'
import { cw1WhitelistQueries } from './Cw1Whitelist'

/**
 * If this is a cw1-whitelist, fetch the admins. Otherwise, return null.
 */
export const fetchAdminsIfCw1Whitelist = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string[] | null> => {
  const isCw1Whitelist = await queryClient.fetchQuery(
    contractQueries.isCw1Whitelist(queryClient, {
      chainId,
      address,
    })
  )
  if (!isCw1Whitelist) {
    return null
  }

  return (
    await queryClient.fetchQuery(
      cw1WhitelistQueries.adminList(queryClient, {
        chainId,
        contractAddress: address,
      })
    )
  ).admins
}

export const cw1WhitelistExtraQueries = {
  /**
   * If this is a cw1-whitelist, return the admins. Otherwise, return null.
   */
  adminsIfCw1Whitelist: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchAdminsIfCw1Whitelist>[1]
  ) =>
    queryOptions({
      queryKey: ['cw1WhitelistExtra', 'adminsIfCw1Whitelist', options],
      queryFn: () => fetchAdminsIfCw1Whitelist(queryClient, options),
    }),
}
