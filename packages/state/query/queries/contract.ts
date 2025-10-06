import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import { BlockHeader } from '@cosmjs/stargate'
import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  ContractSummary,
  InfoResponse,
  SupportedChainIndexerMode,
} from '@dao-dao/types'
import {
  ArrayOfVestingContract,
  VestingContract,
} from '@dao-dao/types/contracts/CwPayrollFactory'
import { CodeInfoResponse } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/query'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import {
  ContractName,
  DAO_CORE_CONTRACT_NAMES,
  cosmWasmClientRouter,
  cosmwasmProtoRpcClientRouter,
  getChainForChainId,
  getCosmWasmClientForChainId,
  isErrorWithSubstring,
  isInvalidContractError,
  isSecretNetwork,
  isValidBech32Address,
  objectMatchesStructure,
  parseContractVersion,
  secretCosmWasmClientRouter,
} from '@dao-dao/utils'

import { cwVestingQueries } from './contracts'
import { indexerQueries } from './indexer'

/**
 * Fetch contract info stored in state, which contains its name and version.
 */
export const fetchContractInfo = async (
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
        indexerQueries.queryContract({
          chainId,
          contractAddress: address,
          formula: 'info',
          ttl: 60,
          allowedModes: [
            SupportedChainIndexerMode.Tx,
            SupportedChainIndexerMode.All,
          ],
        })
      ),
    }
  } catch (error) {
    // Rethrow contract not found errors.
    if (isErrorWithSubstring(error, 'contract not found')) {
      throw error
    }

    console.error(error)
  }

  // If indexer fails, fallback to querying chain.
  const client = await getCosmWasmClientForChainId(chainId)

  if (isSecretNetwork(chainId)) {
    // Secret Network does not allow accessing raw state directly, so this will
    // only work if the contract has an `info` query, which all our DAO
    // contracts do, but not all contracts do.
    const info = await client.queryContractSmart(address, {
      info: {},
    })

    // Verify it looks like a valid info response.
    if (
      objectMatchesStructure(info, {
        info: {
          contract: {},
          version: {},
        },
      })
    ) {
      return info
    }
  } else {
    const { data: contractInfo } = await client[
      'forceGetQueryClient'
    ]().wasm.queryContractRaw(address, toUtf8('contract_info'))
    if (contractInfo) {
      const info: InfoResponse = {
        info: JSON.parse(fromUtf8(contractInfo)),
      }
      return info
    }
  }

  throw new Error('Failed to query contract info for contract: ' + address)
}

/**
 * Fetch contract summary.
 */
export const fetchContractSummary = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<ContractSummary> => {
  const [{ info }, contract] = await Promise.all([
    queryClient
      .fetchQuery(
        contractQueries.info({
          chainId,
          address,
        })
      )
      .catch(() => ({ info: undefined })),
    cosmWasmClientRouter
      .connect(chainId)
      .then((client) => client.getContract(address)),
  ])

  return {
    chainId,
    address,
    creator: contract.creator,
    admin: contract.admin,
    label: contract.label,
    codeId: contract.codeId,
    ...(info && { info }),
  }
}

/**
 * Fetch available queries.
 */
export const fetchAvailableQueries = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<string[]> => {
  const client = await cosmWasmClientRouter.connect(chainId)
  try {
    // Query msg that doesn't exist, error contains list of available queries.
    await client.queryContractSmart(address, '')
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`
    const search = 'unknown variant ``, expected one of '
    const start = message.indexOf(search)
    if (start !== -1) {
      return (
        message
          .slice(start + search.length)
          .match(/`([^`]+)`/g)
          ?.map((q) => q.replace(/`/g, '')) ?? []
      )
    }
  }

  throw new Error('Failed to query available queries for contract: ' + address)
}

/**
 * Fetch a smart query from a contract.
 */
export const fetchSmartQuery = async ({
  chainId,
  address,
  query,
}: {
  chainId: string
  address: string
  query: any
}): Promise<any> => {
  const client = await getCosmWasmClientForChainId(chainId)
  return client.queryContractSmart(address, query)
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
    !isValidBech32Address(address, getChainForChainId(chainId).bech32Prefix)
  ) {
    return false
  }

  try {
    const {
      info: { contract },
    } = await queryClient.fetchQuery(
      contractQueries.info({
        chainId,
        address,
      })
    )

    return Array.isArray(nameOrNames)
      ? nameOrNames.some((name) => contract.includes(name))
      : contract.includes(nameOrNames)
  } catch (err) {
    if (
      isInvalidContractError(err) ||
      // Injective errors with "invalid wire type" for some reason during
      // queryContractRaw.
      isErrorWithSubstring(err, 'invalid wire type') ||
      // On Secret Network, just return false, since there are weird failures
      // for failed contract queries.
      isSecretNetwork(chainId)
    ) {
      return false
    }

    // Rethrow other errors because it should not have failed.
    throw err
  }
}

/**
 * Fetch contract instantiation event.
 */
export const fetchContractInstantiationEvent = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<{
  height: number
  hash: string
  code: number
  /**
   * Null if the block fails to load.
   */
  blockHeader: BlockHeader | null
}> => {
  const client = await getCosmWasmClientForChainId(chainId)
  const events = await client.searchTx([
    { key: 'instantiate._contract_address', value: address },
  ])

  if (events.length === 0) {
    throw new Error(
      'Failed to find instantiation event for contract: ' + address
    )
  }

  const event = events[0]
  const blockHeader = await client
    .getBlock(event.height)
    .then((block) => block.header)
    .catch(() => null)

  return {
    height: event.height,
    hash: event.hash,
    code: event.code,
    blockHeader,
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
        indexerQueries.queryContract({
          chainId,
          contractAddress: address,
          formula: 'instantiatedAt',
          // This never changes, and the fallback is unreliable, so attempt to
          // query even if the indexer is behind.
          noFallback: true,
          allowedModes: [
            SupportedChainIndexerMode.Tx,
            SupportedChainIndexerMode.All,
          ],
        })
      )
    ).getTime()
  } catch {}

  // If indexer fails, fallback to querying chain.
  const { blockHeader } = await queryClient.fetchQuery(
    contractQueries.instantiationEvent({
      chainId,
      address,
    })
  )

  if (!blockHeader) {
    throw new Error('Failed to load block for contract instantiation.')
  }

  return new Date(blockHeader.time).getTime()
}

/**
 * Fetch contract code info.
 */
export const fetchContractCodeInfo = async ({
  chainId,
  codeId,
}: {
  chainId: string
  codeId: number
}): Promise<CodeInfoResponse> => {
  if (isSecretNetwork(chainId)) {
    const client = await secretCosmWasmClientRouter.connect(chainId)
    const code = await client.getCodeDetails(codeId)
    return {
      codeId: BigInt(code.id),
      creator: code.creator,
      dataHash: toUtf8(code.checksum),
      // Secret Network is permissionless.
      instantiatePermission: {
        permission: AccessType.Everybody,
        addresses: [],
      },
    }
  }

  // CosmWasmClient.getContract is not compatible with Terra Classic for some
  // reason, so use protobuf query directly.
  const client = await cosmwasmProtoRpcClientRouter.connect(chainId)
  const codeInfo = (
    await client.wasm.v1.code({
      codeId: BigInt(codeId),
    })
  )?.codeInfo

  if (!codeInfo) {
    throw new Error('Code info not found for code ID: ' + codeId)
  }

  return codeInfo
}

/**
 * Fetch the wasm contract-level admin for a contract.
 */
export const fetchContractAdmin = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<string | null> => {
  if (isSecretNetwork(chainId)) {
    const client = await secretCosmWasmClientRouter.connect(chainId)
    return (await client.getContract(address))?.admin ?? null
  }

  const client = await cosmwasmProtoRpcClientRouter.connect(chainId)
  return (
    (
      await client.wasm.v1.contractInfo({
        address,
      })
    )?.contractInfo?.admin ?? null
  )
}

/**
 * Get code hash for a Secret Network contract.
 */
export const fetchSecretContractCodeHash = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<string> => {
  const client = await secretCosmWasmClientRouter.connect(chainId)
  return client.queryCodeHashForContractAddress(address)
}

/**
 * Generate the expected instantiate2 address.
 */
export const generateInstantiate2Address = async (
  queryClient: QueryClient,
  {
    chainId,
    creator,
    codeId,
    salt,
  }: {
    chainId: string
    creator: string
    codeId: number
    salt: string
  }
): Promise<string> => {
  if (isSecretNetwork(chainId)) {
    throw new Error('Secret Network does not support instantiate2.')
  }

  const { dataHash } = await queryClient.fetchQuery(
    contractQueries.codeInfo({
      chainId,
      codeId,
    })
  )

  return instantiate2Address(
    dataHash,
    creator,
    toUtf8(salt),
    getChainForChainId(chainId).bech32Prefix
  )
}

/**
 * List all vesting contracts owned by a given account.
 */
export const listVestingContractsOwnedByAccount = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<{
  chainId: string
  contracts: ArrayOfVestingContract
}> => {
  const vestingContracts = await queryClient.fetchQuery(
    contractQueries.listContractsOwnedByAccount({
      chainId,
      address,
      key: 'cw-vesting',
    })
  )

  const contracts = await Promise.all(
    vestingContracts.map(
      async (contract): Promise<VestingContract> => ({
        contract,
        recipient: (
          await queryClient.fetchQuery(
            cwVestingQueries.info({
              chainId,
              contractAddress: contract,
            })
          )
        ).recipient,
        // Ignore.
        instantiator: '',
      })
    )
  )

  return {
    chainId,
    contracts,
  }
}

export const contractQueries = {
  /**
   * Fetch contract info stored in state, which contains its name and version.
   */
  info: (options: Parameters<typeof fetchContractInfo>[1]) =>
    queryOptions({
      queryKey: ['contract', 'info', options],
      queryFn: (ctx) => fetchContractInfo(ctx.client, options),
    }),
  /**
   * Fetch contract version.
   */
  version: (options: Parameters<typeof fetchContractInfo>[1]) =>
    queryOptions({
      queryKey: ['contract', 'version', options],
      queryFn: (ctx) =>
        fetchContractInfo(ctx.client, options).then(({ info: { version } }) =>
          parseContractVersion(version)
        ),
    }),
  /**
   * Fetch contract summary.
   */
  summary: (options: Parameters<typeof fetchContractSummary>[1]) =>
    queryOptions({
      queryKey: ['contract', 'summary', options],
      queryFn: (ctx) => fetchContractSummary(ctx.client, options),
    }),
  /**
   * Fetch available queries.
   */
  availableQueries: (options: Parameters<typeof fetchAvailableQueries>[0]) =>
    queryOptions({
      queryKey: ['contract', 'availableQueries', options],
      queryFn: () => fetchAvailableQueries(options),
    }),
  /**
   * Fetch a smart query from a contract.
   */
  querySmart: (options: Parameters<typeof fetchSmartQuery>[0]) =>
    queryOptions({
      queryKey: ['contract', 'smartQuery', options],
      queryFn: () => fetchSmartQuery(options),
    }),
  /**
   * Check if a contract is a specific contract by name.
   */
  isContract: (options: Parameters<typeof fetchIsContract>[1]) =>
    queryOptions({
      queryKey: ['contract', 'isContract', options],
      queryFn: (ctx) => fetchIsContract(ctx.client, options),
    }),
  /**
   * Check if a contract is a DAO.
   */
  isDao: (
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract({
      ...options,
      nameOrNames: DAO_CORE_CONTRACT_NAMES,
    }),
  /**
   * Check if a contract is a Polytone proxy.
   */
  isPolytoneProxy: (
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract({
      ...options,
      nameOrNames: ContractName.PolytoneProxy,
    }),
  /**
   * Check if a contract is a Valence account.
   */
  isValenceAccount: (
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract({
      ...options,
      nameOrNames: ContractName.ValenceAccount,
    }),
  /**
   * Check if a contract is a cw1-whitelist.
   */
  isCw1Whitelist: (
    options: Omit<Parameters<typeof fetchIsContract>[1], 'nameOrNames'>
  ) =>
    contractQueries.isContract({
      ...options,
      nameOrNames: ContractName.Cw1Whitelist,
    }),
  /**
   * Fetch contract instantiation event.
   */
  instantiationEvent: (
    options: Parameters<typeof fetchContractInstantiationEvent>[0]
  ) =>
    queryOptions({
      queryKey: ['contract', 'instantiationEvent', options],
      queryFn: () => fetchContractInstantiationEvent(options),
    }),
  /**
   * Fetch contract instantiation time.
   */
  instantiationTime: (
    options: Parameters<typeof fetchContractInstantiationTime>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'instantiationTime', options],
      queryFn: (ctx) => fetchContractInstantiationTime(ctx.client, options),
    }),
  /**
   * Fetch contract code info.
   */
  codeInfo: (options: Parameters<typeof fetchContractCodeInfo>[0]) =>
    queryOptions({
      queryKey: ['contract', 'codeInfo', options],
      queryFn: () => fetchContractCodeInfo(options),
    }),
  /*
   * Fetch the wasm contract-level admin for a contract.
   */
  admin: (options: Parameters<typeof fetchContractAdmin>[0]) =>
    queryOptions({
      queryKey: ['contract', 'admin', options],
      queryFn: () => fetchContractAdmin(options),
    }),
  /**
   * Fetch the code hash for a Secret Network contract.
   */
  secretCodeHash: (
    options: Parameters<typeof fetchSecretContractCodeHash>[0]
  ) =>
    queryOptions({
      queryKey: ['contract', 'secretCodeHash', options],
      queryFn: () => fetchSecretContractCodeHash(options),
    }),
  /**
   * Generate the expected instantiate2 address.
   */
  instantiate2Address: (
    options: Parameters<typeof generateInstantiate2Address>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'instantiate2Address', options],
      queryFn: (ctx) => generateInstantiate2Address(ctx.client, options),
    }),
  /**
   * List all contracts owned by a given account.
   */
  listContractsOwnedByAccount: ({
    chainId,
    address,
    key,
  }: {
    chainId: string
    address: string
    /**
     * Optionally filter by an indexer code ID key.
     */
    key?: string
  }) =>
    indexerQueries.queryAccount<string[]>({
      chainId,
      address,
      formula: 'contract/ownedBy',
      args: {
        key,
      },
      noFallback: true,
    }),
  /**
   * List all vesting contracts owned by a given account.
   */
  listVestingContractsOwnedByAccount: (
    options: Parameters<typeof listVestingContractsOwnedByAccount>[1]
  ) =>
    queryOptions({
      queryKey: ['contract', 'listVestingContractsOwnedByAccount', options],
      queryFn: (ctx) => listVestingContractsOwnedByAccount(ctx.client, options),
    }),
}
