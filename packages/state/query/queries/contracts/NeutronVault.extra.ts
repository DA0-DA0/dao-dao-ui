import { QueryClient, queryOptions } from '@tanstack/react-query'

import { GenericToken, TokenType } from '@dao-dao/types'

import { tokenQueries } from '../token'
import { neutronVaultQueries } from './NeutronVault'

/**
 * Fetch whether or not this is a virtual vault.
 */
export const fetchNeutronVaultIsVirtual = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<boolean> => {
  try {
    await queryClient.fetchQuery(
      neutronVaultQueries.listBonders({
        chainId,
        contractAddress: address,
        args: {
          limit: 1,
        },
      })
    )
  } catch (err) {
    // Virtual vaults don't allow bonding.
    return (
      err instanceof Error &&
      err.message.includes('Bonding is not available for this contract')
    )
  }

  return false
}

/**
 * Determine if this vault is real or virtual, and retrieve the bond token if
 * it's real.
 */
export const fetchNeutronVaultInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<
  // Real vaults have bond tokens.
  | {
      real: true
      bondToken: GenericToken
    }
  // Virtual vaults do not have bond tokens.
  | {
      real: false
    }
> => {
  const isVirtual = await queryClient.fetchQuery(
    neutronVaultExtraQueries.isVirtual(queryClient, {
      chainId,
      address,
    })
  )
  if (isVirtual) {
    return {
      real: false,
    }
  }

  const config = await queryClient.fetchQuery(
    neutronVaultQueries.config({
      chainId,
      contractAddress: address,
    })
  )

  if (!('denom' in config)) {
    throw new Error('No denom for real vault')
  }

  const bondToken = await queryClient.fetchQuery(
    tokenQueries.info(queryClient, {
      type: TokenType.Native,
      chainId,
      denomOrAddress: config.denom,
    })
  )

  return {
    real: true,
    bondToken,
  }
}

export const neutronVaultExtraQueries = {
  /**
   * Check whether or not this is a virtual vault.
   */
  isVirtual: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchNeutronVaultIsVirtual>[1]
  ) =>
    queryOptions({
      queryKey: ['neutronVaultExtra', 'isVirtual', options],
      queryFn: () => fetchNeutronVaultIsVirtual(queryClient, options),
    }),
  /**
   * Determine if this vault is real or virtual, and retrieve the bond token if
   * it's real.
   */
  info: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchNeutronVaultInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['neutronVaultExtra', 'info', options],
      queryFn: () => fetchNeutronVaultInfo(queryClient, options),
    }),
}
