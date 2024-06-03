import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import { QueryClient, queryOptions } from '@tanstack/react-query'

import { InfoResponse } from '@dao-dao/types'
import {
  ContractName,
  DAO_CORE_CONTRACT_NAMES,
  INVALID_CONTRACT_ERROR_SUBSTRINGS,
  cosmWasmClientRouter,
  getChainForChainId,
  isValidBech32Address,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { indexerQueries } from './indexer'

// TODO(rq): export this and replace the other util with it
/**
 * Fetch contract info stored in state, which contains its name and version.
 */
const fetchContractInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<InfoResponse> => {
  try {
    return {
      info: await queryClient.fetchQuery(
        indexerQueries.queryContract(queryClient, {
          chainId,
          contractAddress: address,
          formula: 'info',
        })
      ),
    }
  } catch (error) {
    // Rethrow contract not found errors.
    if (
      error instanceof Error &&
      error.message.includes('contract not found')
    ) {
      throw error
    }

    console.error(error)
  }

  // If indexer fails, fallback to querying chain.
  const client = await cosmWasmClientRouter.connect(chainId)
  const { data: contractInfo } = await client[
    'forceGetQueryClient'
  ]().wasm.queryContractRaw(address, toUtf8('contract_info'))
  if (contractInfo) {
    const info: InfoResponse = {
      info: JSON.parse(fromUtf8(contractInfo)),
    }
    return info
  }

  throw new Error('Failed to query contract info for contract: ' + address)
}

/**
 * Check if a contract is a specific contract by name.
 */
export const fetchIsContract = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    nameOrNames,
  }: {
    chainId: string
    address: string
    nameOrNames: string | string[]
  }
): Promise<boolean> => {
  if (
    !isValidBech32Address(address, getChainForChainId(chainId).bech32_prefix)
  ) {
    return false
  }

  try {
    const {
      info: { contract },
    } = await queryClient.fetchQuery(
      contractQueries.info(queryClient, {
        chainId,
        address,
      })
    )

    return Array.isArray(nameOrNames)
      ? nameOrNames.some((name) => contract.includes(name))
      : contract.includes(nameOrNames)
  } catch (err) {
    if (
      err instanceof Error &&
      INVALID_CONTRACT_ERROR_SUBSTRINGS.some((substring) =>
        (err as Error).message.includes(substring)
      )
    ) {
      return false
    }

    // Rethrow other errors because it should not have failed.
    throw err
  }
}

/**
 * Fetch contract instantiation time.
 */
export const fetchContractInstantiationTime = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<number> => {
  try {
    return new Date(
      await queryClient.fetchQuery(
        indexerQueries.queryContract(queryClient, {
          chainId,
          contractAddress: address,
          formula: 'instantiatedAt',
          // This never changes, and the fallback is unreliable, so attempt to
          // query even if the indexer is behind.
          noFallback: true,
        })
      )
    ).getTime()
  } catch (error) {
    console.error(error)
  }

  // If indexer fails, fallback to querying chain.
  const client = await cosmWasmClientRouter.connect(chainId)
  const events = await client.searchTx([
    { key: 'instantiate._contract_address', value: address },
  ])

  if (events.length === 0) {
    throw new Error(
      'Failed to find instantiation time due to no instantiation events for contract: ' +
        address
    )
  }

  return await queryClient.fetchQuery(
    chainQueries.blockTimestamp({
      chainId,
      height: events[0].height,
    })
  )
}

export const contractQueries = {
  /**
   * Fetch contract info stored in state, which contains its name and version.
   */
  info: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchContractInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'info', options],
      queryFn: () => fetchContractInfo(queryClient, options),
    }),
  /**
   * Check if a contract is a specific contract by name.
   */
  isContract: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchIsContract>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'isContract', options],
      queryFn: () => fetchIsContract(queryClient, options),
    }),
  /**
   * Check if a contract is a DAO.
   */
  isDao: (
    queryClient: QueryClient,
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract(queryClient, {
      ...options,
      nameOrNames: DAO_CORE_CONTRACT_NAMES,
    }),
  /**
   * Check if a contract is a Polytone proxy.
   */
  isPolytoneProxy: (
    queryClient: QueryClient,
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract(queryClient, {
      ...options,
      nameOrNames: ContractName.PolytoneProxy,
    }),
  /**
   * Fetch contract instantiation time.
   */
  instantiationTime: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchContractInstantiationTime>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'instantiationTime', options],
      queryFn: () => fetchContractInstantiationTime(queryClient, options),
    }),
}
