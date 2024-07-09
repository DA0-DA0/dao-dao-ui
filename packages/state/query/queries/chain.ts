import { fromBase64 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/stargate'
import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import {
  ChainId,
  GovProposalVersion,
  GovProposalWithDecodedContent,
  ProposalV1,
  ProposalV1Beta1,
} from '@dao-dao/types'
import { ModuleAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { Metadata } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/bank'
import { DecCoin } from '@dao-dao/types/protobuf/codegen/cosmos/base/v1beta1/coin'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import {
  cosmosProtoRpcClientRouter,
  cosmosSdkVersionIs46OrHigher,
  cosmosSdkVersionIs47OrHigher,
  cosmwasmProtoRpcClientRouter,
  decodeGovProposal,
  feemarketProtoRpcClientRouter,
  getAllRpcResponse,
  getCosmWasmClientForChainId,
  getNativeTokenForChainId,
  isValidBech32Address,
  osmosisProtoRpcClientRouter,
  stargateClientRouter,
} from '@dao-dao/utils'

import {
  SearchGovProposalsOptions,
  searchGovProposals,
} from '../../indexer/search'

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
  const client = await getCosmWasmClientForChainId(chainId)
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
  // CosmWasmClient.getContract is not compatible with Terra Classic for some
  // reason, so use protobuf query directly.
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

/**
 * Fetch the cosmos-sdk version of a chain.
 */
export const fetchChainCosmosSdkVersion = async ({
  chainId,
}: {
  chainId: string
}): Promise<string> => {
  const protoClient = await cosmosProtoRpcClientRouter.connect(chainId)

  const { applicationVersion } =
    await protoClient.base.tendermint.v1beta1.getNodeInfo()

  // Remove `v` prefix.
  return applicationVersion?.cosmosSdkVersion.slice(1) || '0.0.0'
}

/**
 * Fetch whether or not a chain supports the v1 gov module.
 */
export const fetchChainSupportsV1GovModule = async (
  queryClient: QueryClient,
  {
    chainId,
    require47 = false,
  }: {
    chainId: string
    /**
     * Whether or not v0.47 or higher is required. V1 gov is supported by
     * v0.46+, but some other things, like unified gov params, are supported
     * only on v0.47+.
     *
     * Defaults to false.
     */
    require47?: boolean
  }
): Promise<boolean> => {
  const cosmosSdkVersion = await queryClient.fetchQuery(
    chainQueries.cosmosSdkVersion({ chainId })
  )

  const checker = require47
    ? cosmosSdkVersionIs47OrHigher
    : cosmosSdkVersionIs46OrHigher
  if (!checker(cosmosSdkVersion)) {
    return false
  }

  const client = await cosmosProtoRpcClientRouter.connect(chainId)

  // Double-check by testing a v1 gov route.
  try {
    await client.gov.v1.params({
      paramsType: 'voting',
    })
    return true
  } catch {
    return false
  }
}

/**
 * Search chain governance proposals and decode their content.
 */
export const searchAndDecodeGovProposals = async (
  queryClient: QueryClient,
  options: SearchGovProposalsOptions
): Promise<{
  proposals: GovProposalWithDecodedContent[]
  total: number
}> => {
  const [supportsV1Gov, { results, total }] = await Promise.all([
    queryClient.fetchQuery(
      chainQueries.supportsV1GovModule(queryClient, {
        chainId: options.chainId,
      })
    ),
    queryClient.fetchQuery(chainQueries.searchGovProposals(options)),
  ])

  const proposals = (
    await Promise.allSettled(
      results.map(async ({ value: { id, data } }) =>
        decodeGovProposal(
          options.chainId,
          supportsV1Gov
            ? {
                version: GovProposalVersion.V1,
                id: BigInt(id),
                proposal: ProposalV1.decode(fromBase64(data)),
              }
            : {
                version: GovProposalVersion.V1_BETA_1,
                id: BigInt(id),
                proposal: ProposalV1Beta1.decode(
                  fromBase64(data),
                  undefined,
                  true
                ),
              }
        )
      )
    )
  ).flatMap((p) => (p.status === 'fulfilled' ? p.value : []))

  return {
    proposals,
    total,
  }
}

/**
 * Fetch the governance proposals for a chain, defaulting to those that are
 * currently open for voting.
 */
export const fetchGovProposals = async (
  queryClient: QueryClient,
  {
    chainId,
    status,
    offset,
    limit,
  }: {
    chainId: string
    status?: ProposalStatus
    offset?: number
    limit?: number
  }
): Promise<{
  proposals: GovProposalWithDecodedContent[]
  total: number
}> => {
  const indexerProposals = await queryClient
    .fetchQuery(
      chainQueries.searchAndDecodeGovProposals(queryClient, {
        chainId,
        status,
        offset,
        limit,
      })
    )
    .catch(() => undefined)

  if (indexerProposals?.proposals.length) {
    return indexerProposals
  }

  // Fallback to querying chain if indexer failed.
  const [client, supportsV1Gov] = await Promise.all([
    cosmosProtoRpcClientRouter.connect(chainId),
    queryClient.fetchQuery(
      chainQueries.supportsV1GovModule(queryClient, {
        chainId,
      })
    ),
  ])

  let v1Proposals: ProposalV1[] | undefined
  let v1Beta1Proposals: ProposalV1Beta1[] | undefined
  let total = 0

  if (supportsV1Gov) {
    try {
      if (limit === undefined && offset === undefined) {
        v1Proposals =
          (await getAllRpcResponse(
            client.gov.v1.proposals,
            {
              proposalStatus:
                status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
              voter: '',
              depositor: '',
              pagination: undefined,
            },
            'proposals',
            true
          )) || []
        total = v1Proposals.length
      } else {
        const response = await client.gov.v1.proposals({
          proposalStatus: status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
          voter: '',
          depositor: '',
          pagination: {
            key: new Uint8Array(),
            offset: BigInt(offset || 0),
            limit: BigInt(limit || 0),
            countTotal: true,
            reverse: true,
          },
        })
        v1Proposals = response.proposals
        total = Number(response.pagination?.total || 0)
      }
    } catch (err) {
      // Fallback to v1beta1 query if v1 not supported.
      if (
        !(err instanceof Error) ||
        !err.message.includes('unknown query path')
      ) {
        // Rethrow other errors.
        throw err
      }
    }
  }

  if (!v1Proposals) {
    if (limit === undefined && offset === undefined) {
      v1Beta1Proposals =
        (await getAllRpcResponse(
          client.gov.v1beta1.proposals,
          {
            proposalStatus:
              status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
            voter: '',
            depositor: '',
            pagination: undefined,
          },
          'proposals',
          true,
          true
        )) || []
      total = v1Beta1Proposals.length
    } else {
      const response = await client.gov.v1beta1.proposals(
        {
          proposalStatus: status || ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
          voter: '',
          depositor: '',
          pagination: {
            key: new Uint8Array(),
            offset: BigInt(offset || 0),
            limit: BigInt(limit || 0),
            countTotal: true,
            reverse: true,
          },
        },
        true
      )
      v1Beta1Proposals = response.proposals
      total = Number(response.pagination?.total || 0)
    }
  }

  const proposals = await Promise.all([
    ...(v1Beta1Proposals || []).map((proposal) =>
      decodeGovProposal(chainId, {
        version: GovProposalVersion.V1_BETA_1,
        id: proposal.proposalId,
        proposal,
      })
    ),
    ...(v1Proposals || []).map((proposal) =>
      decodeGovProposal(chainId, {
        version: GovProposalVersion.V1,
        id: proposal.id,
        proposal,
      })
    ),
  ])

  return {
    proposals,
    total,
  }
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
  /**
   * Fetch the on-chain metadata for a denom if it exists.
   */
  denomMetadata: (options: Parameters<typeof fetchDenomMetadata>[0]) =>
    queryOptions({
      queryKey: ['chain', 'denomMetadata', options],
      queryFn: () => fetchDenomMetadata(options),
    }),
  /**
   * Fetch the cosmos-sdk version of a chain.
   */
  cosmosSdkVersion: (
    options: Parameters<typeof fetchChainCosmosSdkVersion>[0]
  ) =>
    queryOptions({
      queryKey: ['chain', 'cosmosSdkVersion', options],
      queryFn: () => fetchChainCosmosSdkVersion(options),
    }),
  /**
   * Fetch whether or not a chain supports the v1 gov module.
   */
  supportsV1GovModule: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchChainSupportsV1GovModule>[1]
  ) =>
    queryOptions({
      queryKey: ['chain', 'supportsV1GovModule', options],
      queryFn: () => fetchChainSupportsV1GovModule(queryClient, options),
    }),
  /**
   * Search chain governance proposals.
   */
  searchGovProposals: (options: SearchGovProposalsOptions) =>
    queryOptions({
      queryKey: ['chain', 'searchGovProposals', options],
      queryFn: () => searchGovProposals(options),
    }),
  /**
   * Search chain governance proposals and decode their content.
   */
  searchAndDecodeGovProposals: (
    queryClient: QueryClient,
    options: Parameters<typeof searchAndDecodeGovProposals>[1]
  ) =>
    queryOptions({
      queryKey: ['chain', 'searchAndDecodeGovProposals', options],
      queryFn: () => searchAndDecodeGovProposals(queryClient, options),
    }),
  /**
   * Fetch the governance proposals for a chain, defaulting to those that are
   * currently open for voting.
   */
  govProposals: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchGovProposals>[1]
  ) =>
    queryOptions({
      queryKey: ['chain', 'govProposals', options],
      queryFn: () => fetchGovProposals(queryClient, options),
    }),
}
