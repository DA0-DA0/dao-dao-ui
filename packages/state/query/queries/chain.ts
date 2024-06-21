import { Coin } from '@cosmjs/stargate'
import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import { ChainId } from '@dao-dao/types'
import { ModuleAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { DecCoin } from '@dao-dao/types/protobuf/codegen/cosmos/base/v1beta1/coin'
import {
  cosmWasmClientRouter,
  cosmosProtoRpcClientRouter,
  feemarketProtoRpcClientRouter,
  getNativeTokenForChainId,
  isValidBech32Address,
  osmosisProtoRpcClientRouter,
  stargateClientRouter,
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
 * Fetch the sum of native tokens staked across all validators.
 */
export const fetchNativeStakedBalance = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<Coin> => {
  // Neutron does not have staking.
  if (
    chainId === ChainId.NeutronMainnet ||
    chainId === ChainId.NeutronTestnet
  ) {
    return {
      amount: '0',
      denom: getNativeTokenForChainId(chainId).denomOrAddress,
    }
  }

  const client = await stargateClientRouter.connect(chainId)
  const balance = await client.getBalanceStaked(address)

  return (
    balance ?? {
      amount: '0',
      denom: getNativeTokenForChainId(chainId).denomOrAddress,
    }
  )
}

/**
 * Fetch the total native tokens staked across the whole chain.
 */
export const fetchTotalNativeStakedBalance = async ({
  chainId,
}: {
  chainId: string
}): Promise<string> => {
  // Neutron does not have staking.
  if (
    chainId === ChainId.NeutronMainnet ||
    chainId === ChainId.NeutronTestnet
  ) {
    return '0'
  }

  const client = await cosmosProtoRpcClientRouter.connect(chainId)
  const { pool } = await client.staking.v1beta1.pool()

  if (!pool) {
    throw new Error('No staking pool found')
  }

  return pool.bondedTokens
}

/**
 * Fetch the dynamic gas price for the native fee token.
 */
export const fetchDynamicGasPrice = async ({
  chainId,
}: {
  chainId: string
}): Promise<DecCoin> => {
  // Osmosis uses osmosis.txfees module.
  if (
    chainId === ChainId.OsmosisMainnet ||
    chainId === ChainId.OsmosisTestnet
  ) {
    const client = await osmosisProtoRpcClientRouter.connect(chainId)
    const { baseFee } = await client.txfees.v1beta1.getEipBaseFee()
    return {
      amount: baseFee,
      denom: getNativeTokenForChainId(chainId).denomOrAddress,
    }
  }

  // Neutron (and maybe others) uses Skip's feemarket module.
  const client = await feemarketProtoRpcClientRouter.connect(chainId)
  const { price } = await client.feemarket.v1.gasPrice({
    denom: getNativeTokenForChainId(chainId).denomOrAddress,
  })

  if (!price) {
    throw new Error('No dynamic gas price found')
  }

  return price
}

/**
 * Fetch the wasm contract-level admin for a contract.
 */
export const fetchWasmContractAdmin = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<string | null> => {
  const client = await cosmWasmClientRouter.connect(chainId)
  return (await client.getContract(address))?.admin ?? null
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
   * Fetch the sum of native tokens staked across all validators.
   */
  nativeStakedBalance: (
    options?: Parameters<typeof fetchNativeStakedBalance>[0]
  ) =>
    queryOptions({
      queryKey: ['chain', 'nativeStakedBalance', options],
      queryFn: options ? () => fetchNativeStakedBalance(options) : skipToken,
    }),
  /**
   * Fetch the total native tokens staked across the whole chain.
   */
  totalNativeStakedBalance: (
    options: Parameters<typeof fetchTotalNativeStakedBalance>[0]
  ) =>
    queryOptions({
      queryKey: ['chain', 'totalNativeStakedBalance', options],
      queryFn: () => fetchTotalNativeStakedBalance(options),
    }),
  /**
   * Fetch the dynamic gas price for the native fee token.
   */
  dynamicGasPrice: (options: Parameters<typeof fetchDynamicGasPrice>[0]) =>
    queryOptions({
      queryKey: ['chain', 'dynamicGasPrice', options],
      queryFn: () => fetchDynamicGasPrice(options),
    }),
  /**
   * Fetch the wasm contract-level admin for a contract.
   */
  wasmContractAdmin: (options: Parameters<typeof fetchWasmContractAdmin>[0]) =>
    queryOptions({
      queryKey: ['chain', 'wasmContractAdmin', options],
      queryFn: () => fetchWasmContractAdmin(options),
    }),
}
