import { queryOptions } from '@tanstack/react-query'

import { ModuleAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import {
  cosmWasmClientRouter,
  cosmosProtoRpcClientRouter,
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
 * Check whether or not the address is a chain module, optionally with a
 * specific name.
 */
export const isAddressModule = async ({
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
}): Promise<boolean> => {
  const client = await cosmosProtoRpcClientRouter.connect(chainId)

  try {
    const { account } = await client.auth.v1beta1.account({
      address,
    })

    if (!account) {
      return false
    }

    if (account.typeUrl === ModuleAccount.typeUrl) {
      const moduleAccount = ModuleAccount.decode(account.value)
      return !moduleName || moduleAccount.name === moduleName

      // If already decoded automatically.
    } else if (account.$typeUrl === ModuleAccount.typeUrl) {
      return (
        !moduleName || (account as unknown as ModuleAccount).name === moduleName
      )
    }
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message.includes('not found: key not found') ||
        err.message.includes('decoding bech32 failed'))
    ) {
      return false
    }

    // Rethrow other errors.
    throw err
  }

  return false
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
   * Check whether or not the address is a chain module, optionally with a
   * specific name.
   */
  isAddressModule: (options: Parameters<typeof isAddressModule>[0]) =>
    queryOptions({
      queryKey: ['chain', 'isAddressModule', options],
      queryFn: () => isAddressModule(options),
    }),
  /**
   * Fetch the timestamp for a given block height.
   */
  blockTimestamp: (options: Parameters<typeof fetchBlockTimestamp>[0]) =>
    queryOptions({
      queryKey: ['chain', 'blockTimestamp', options],
      queryFn: () => fetchBlockTimestamp(options),
    }),
}
