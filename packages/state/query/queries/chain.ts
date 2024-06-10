import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ModuleAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { Metadata } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/bank'
import {
  cosmWasmClientRouter,
  cosmosProtoRpcClientRouter,
  isValidBech32Address,
} from '@dao-dao/utils'

/**
 * Fetch the module address associated with the specified name.
 */
const fetchChainModuleAddress = async ({
  chainId,
  name,
}: {
  chainId: string
  name: string
}): Promise<string> => {
  const client = await cosmosProtoRpcClientRouter.connect(chainId)

  let account: ModuleAccount | undefined
  try {
    const response = await client.auth.v1beta1.moduleAccountByName({
      name,
    })
    account = response?.account
  } catch (err) {
    // Some chains don't support getting a module account by name directly, so
    // fallback to getting all module accounts.
    if (err instanceof Error && err.message.includes('unknown query path')) {
      const { accounts } = await client.auth.v1beta1.moduleAccounts({})
      account = accounts.find(
        (acc) =>
          'name' in acc && (acc as unknown as ModuleAccount).name === name
      ) as unknown as ModuleAccount | undefined
    } else {
      // Rethrow other errors.
      throw err
    }
  }

  if (!account) {
    throw new Error(`Failed to find ${name} module address.`)
  }

  return 'baseAccount' in account ? account.baseAccount?.address ?? '' : ''
}

/**
 * Fetch the module name associated with the specified address. Returns null if
 * not a module account.
 */
const fetchChainModuleName = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<string | null> => {
  const client = await cosmosProtoRpcClientRouter.connect(chainId)

  try {
    const { account } = await client.auth.v1beta1.account({
      address,
    })

    if (!account) {
      return null
    }

    // If not decoded automatically...
    if (account.typeUrl === ModuleAccount.typeUrl) {
      return ModuleAccount.decode(account.value).name

      // If decoded automatically...
    } else if (account.$typeUrl === ModuleAccount.typeUrl) {
      return (account as unknown as ModuleAccount).name
    }
  } catch (err) {
    // If no account found, return null.
    if (
      err instanceof Error &&
      err.message.includes('not found: key not found')
    ) {
      return null
    }

    // Rethrow other errors.
    throw err
  }

  return null
}

/**
 * Check whether or not the address is a chain module, optionally with a
 * specific name.
 */
export const isAddressModule = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    moduleName,
  }: {
    chainId: string
    address: string
    /**
     * If defined, check that the module address matches the specified name.
     */
    moduleName?: string
  }
): Promise<boolean> => {
  if (!isValidBech32Address(address)) {
    return false
  }

  try {
    const name = await queryClient.fetchQuery(
      chainQueries.moduleName({
        chainId,
        address,
      })
    )

    // Null if not a module.
    if (!name) {
      return false
    }

    // If name to check provided, check it. Otherwise, return true.
    return !moduleName || name === moduleName
  } catch (err) {
    // If invalid address, return false. Should never happen because of the
    // check at the beginning, but just in case.
    if (
      err instanceof Error &&
      err.message.includes('decoding bech32 failed')
    ) {
      return false
    }

    // Rethrow other errors.
    throw err
  }
}

/**
 * Fetch the timestamp for a given block height.
 */
export const fetchBlockTimestamp = async ({
  chainId,
  height,
}: {
  chainId: string
  height: number
}): Promise<number> => {
  const client = await cosmWasmClientRouter.connect(chainId)
  return new Date((await client.getBlock(height)).header.time).getTime()
}

/**
 * Fetch the on-chain metadata for a denom if it exists. Returns null if denom
 * not found. This likely exists for token factory denoms.
 */
export const fetchDenomMetadata = async ({
  chainId,
  denom,
}: {
  chainId: string
  denom: string
}): Promise<{
  metadata: Metadata
  preferredSymbol: string
  preferredDecimals: number
} | null> => {
  const client = await cosmosProtoRpcClientRouter.connect(chainId)
  try {
    const { metadata } = await client.bank.v1beta1.denomMetadata({ denom })

    if (metadata) {
      const { base, denomUnits, symbol, display } = metadata

      // If display is equal to the base, use the symbol denom unit if
      // available. This fixes the case where display was not updated even
      // though a nonzero exponent was created.
      const searchDenom = display === base ? symbol : display

      const displayDenom =
        denomUnits.find(({ denom }) => denom === searchDenom) ??
        denomUnits.find(({ denom }) => denom === display) ??
        denomUnits.find(({ exponent }) => exponent > 0) ??
        denomUnits[0]

      return {
        metadata,
        // If factory denom, extract symbol at the end.
        preferredSymbol:
          (displayDenom
            ? displayDenom.denom.startsWith('factory/')
              ? displayDenom.denom.split('/').pop()!
              : displayDenom.denom
            : metadata.symbol) || denom,
        preferredDecimals: displayDenom?.exponent ?? 0,
      }
    }
  } catch (err) {
    // If denom not found, return null.
    if (err instanceof Error && err.message.includes('key not found')) {
      return null
    }

    // Rethrow other errors.
    throw err
  }

  return null
}

export const chainQueries = {
  /**
   * Fetch the module address associated with the specified name.
   */
  moduleAddress: (options: Parameters<typeof fetchChainModuleAddress>[0]) =>
    queryOptions({
      queryKey: ['chain', 'moduleAddress', options],
      queryFn: () => fetchChainModuleAddress(options),
    }),
  /**
   * Fetch the module name associated with the specified address. Returns null
   * if not a module account.
   */
  moduleName: (options: Parameters<typeof fetchChainModuleName>[0]) =>
    queryOptions({
      queryKey: ['chain', 'moduleName', options],
      queryFn: () => fetchChainModuleName(options),
    }),
  /**
   * Check whether or not the address is a chain module, optionally with a
   * specific name.
   */
  isAddressModule: (
    queryClient: QueryClient,
    options: Parameters<typeof isAddressModule>[1]
  ) =>
    queryOptions({
      queryKey: ['chain', 'isAddressModule', options],
      queryFn: () => isAddressModule(queryClient, options),
    }),
  /**
   * Fetch the timestamp for a given block height.
   */
  blockTimestamp: (options: Parameters<typeof fetchBlockTimestamp>[0]) =>
    queryOptions({
      queryKey: ['chain', 'blockTimestamp', options],
      queryFn: () => fetchBlockTimestamp(options),
    }),
  /**
   * Fetch the on-chain metadata for a denom if it exists.
   */
  denomMetadata: (options: Parameters<typeof fetchDenomMetadata>[0]) =>
    queryOptions({
      queryKey: ['chain', 'denomMetadata', options],
      queryFn: () => fetchDenomMetadata(options),
    }),
}
