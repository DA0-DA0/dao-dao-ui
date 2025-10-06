import { toHex } from '@cosmjs/encoding'
import { QueryClient, queryOptions } from '@tanstack/react-query'

import {
  Account,
  AccountType,
  ChainId,
  CryptographicMultisigAccount,
  Cw1WhitelistAccount,
  Cw3MultisigAccount,
  GenericToken,
  MultisigAccount,
  PolytoneProxies,
  TokenType,
  ValenceAccount,
} from '@dao-dao/types'
import { ListItemsResponse } from '@dao-dao/types/contracts/DaoDaoCore'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { BaseAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { LegacyAminoPubKey } from '@dao-dao/types/protobuf/codegen/cosmos/crypto/multisig/keys'
import { PubKey as Secp256k1PubKey } from '@dao-dao/types/protobuf/codegen/cosmos/crypto/secp256k1/keys'
import {
  ContractName,
  ICA_CHAINS_TX_PREFIX,
  PerformanceContext,
  cosmosProtoRpcClientRouter,
  getChainForChainId,
  getIbcTransferInfoBetweenChains,
  getSupportedChainConfig,
  ibcProtoRpcClientRouter,
  isConfiguredChainName,
  isErrorWithSubstring,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { contractQueries } from './contract'
import {
  cw1WhitelistExtraQueries,
  cw3FlexMultisigQueries,
  valenceAccountQueries,
  valenceRebalancerQueries,
} from './contracts'
import { daoDaoCoreQueries } from './contracts/DaoDaoCore'
import { indexerQueries } from './indexer'
import { polytoneQueries } from './polytone'
import { tokenQueries } from './token'

/**
 * Fetch the list of accounts associated with the specified address, with
 * support for:
 * - detecting if the address is a polytone proxy
 * - automatically loading a DAO's registered ICAs
 */
export const fetchAccountList = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    includeIcaChains,
  }: {
    chainId: string
    address: string
    /**
     * Optionally check for ICAs on these chain IDs.
     */
    includeIcaChains?: string[]
  }
): Promise<Account[]> => {
  const p = new PerformanceContext(`account_list_${chainId}_${address}`)

  if (isConfiguredChainName(chainId, address)) {
    address = await queryClient.fetchQuery(
      chainQueries.moduleAddress({
        chainId,
        name: address,
      })
    )
  }

  const isDao = await queryClient.fetchQuery(
    contractQueries.isDao({
      chainId,
      address,
    })
  )

  // isDao will cache the contract info, so these two will be immediate.
  const [isPolytoneProxy, isValenceAccount] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.isPolytoneProxy({ chainId, address })
    ),
    queryClient.fetchQuery(
      contractQueries.isValenceAccount({ chainId, address })
    ),
  ])

  const mainAccount: Account = isValenceAccount
    ? // If this is a valence account, get its config.
      await queryClient.fetchQuery(
        accountQueries.valence({
          chainId,
          address,
        })
      )
    : {
        chainId,
        address,
        type: isPolytoneProxy ? AccountType.Polytone : AccountType.Base,
      }

  const [polytoneProxies, registeredIcas] = await Promise.all([
    mainAccount.type !== AccountType.Polytone
      ? p.time(
          'polytone_proxies',
          queryClient.fetchQuery(polytoneQueries.proxies({ chainId, address }))
        )
      : ({} as PolytoneProxies),
    // If this is a DAO, get its registered ICAs (which is a chain the DAO has
    // indicated it has an ICA on by storing an item in its KV).
    isDao
      ? p.time(
          'registered_icas',
          queryClient.fetchQuery(
            daoDaoCoreQueries.listAllItems({
              chainId,
              contractAddress: address,
              args: {
                prefix: ICA_CHAINS_TX_PREFIX,
              },
            })
          )
        )
      : ([] as ListItemsResponse),
  ])

  const allAccounts: Account[] = [
    // Main account.
    mainAccount,
    // Polytone.
    ...Object.entries(polytoneProxies || {}).map(
      ([chainId, address]): Account => ({
        chainId,
        address,
        type: AccountType.Polytone,
      })
    ),
  ]

  // If main account is base, load ICA accounts.
  const icaChains =
    mainAccount.type === AccountType.Base
      ? [
          ...(registeredIcas || []).map(([key]) => key),
          ...(includeIcaChains || []),
        ]
      : []

  const icas = await p.time(
    'remote_ica_addresses',
    Promise.allSettled(
      icaChains.map((destChainId) =>
        p.time(
          `remote_ica_address_${destChainId}`,
          queryClient.fetchQuery(
            accountQueries.remoteIcaAddress({
              srcChainId: mainAccount.chainId,
              address: mainAccount.address,
              destChainId,
            })
          )
        )
      )
    )
  )

  // Add ICA accounts.
  icas.forEach((addressLoadable, index) => {
    if (addressLoadable.status === 'fulfilled' && addressLoadable.value) {
      allAccounts.push({
        type: AccountType.Ica,
        chainId: icaChains[index],
        address: addressLoadable.value,
      })
    }
  })

  // Get valence accounts controlled by all non-valence Neutron accounts.
  const valenceAccounts = (
    await p.time(
      'valence_accounts',
      Promise.allSettled(
        allAccounts
          .filter(
            ({ type, chainId }) =>
              chainId === ChainId.NeutronMainnet && type !== AccountType.Valence
          )
          .map(({ chainId, address }) =>
            p.time(
              `valence_account_${address}`,
              queryClient.fetchQuery(
                accountQueries.valenceAccounts({
                  address,
                  chainId,
                })
              )
            )
          )
      )
    )
  ).flatMap((p) => (p.status === 'fulfilled' ? p.value : []))

  // Add valence accounts.
  allAccounts.push(...valenceAccounts)

  p.log()

  return allAccounts
}

/**
 * Fetch ICA address on host (`destChainId`) controlled by `address` on
 * controller (`srcChainId`).
 */
export const fetchRemoteIcaAddress = async (
  queryClient: QueryClient,
  {
    srcChainId,
    address,
    destChainId,
  }: {
    srcChainId: string
    address: string
    destChainId: string
  }
): Promise<string | null> => {
  // Attempt to load from Snapper.
  try {
    const cached = await queryClient.fetchQuery(
      indexerQueries.snapper({
        query: 'ica-remote-address',
        parameters: {
          srcChainId,
          address,
          destChainId,
        },
      })
    )

    if (cached) {
      return cached
    }
  } catch (err) {
    console.error('Failed to load ICA address from Snapper:', err)
    // If Snapper fails, continue to attempt to load from IBC.
  }

  const {
    sourceChain: { connection_id },
  } = getIbcTransferInfoBetweenChains(srcChainId, destChainId)
  const ibcClient = await ibcProtoRpcClientRouter.connect(srcChainId)

  try {
    const account =
      await ibcClient.applications.interchain_accounts.controller.v1.interchainAccount(
        {
          owner: address,
          connectionId: connection_id,
        }
      )

    return account.address
  } catch (err) {
    // On lookup failure, return undefined.
    if (
      isErrorWithSubstring(err, [
        'failed to retrieve account address',
        'key not found',
      ])
    ) {
      return null
    }

    // Rethrow all other errors.
    throw err
  }
}

/**
 * Fetch the details of a cryptographic multisig account.
 */
export const fetchCryptographicMultisigAccount = async ({
  chainId,
  address,
}: {
  chainId: string
  address: string
}): Promise<CryptographicMultisigAccount> => {
  const { bech32Prefix } = getChainForChainId(chainId)
  const client = await cosmosProtoRpcClientRouter.connect(chainId)

  const { account } = await client.auth.v1beta1.account({
    address,
  })

  if (
    !account ||
    account.$typeUrl !== BaseAccount.typeUrl ||
    account.pubKey?.typeUrl !== LegacyAminoPubKey.typeUrl
  ) {
    throw new Error('Not a multisig address.')
  }

  const { publicKeys, threshold } = LegacyAminoPubKey.decode(
    account.pubKey.value
  )

  if (publicKeys.some(({ typeUrl }) => typeUrl !== Secp256k1PubKey.typeUrl)) {
    throw new Error('Unsupported multisig.')
  }

  const members = await Promise.all(
    publicKeys.map(async (key) => {
      const hexPublicKey = toHex(Secp256k1PubKey.decode(key.value).key)
      return {
        // Safe to use since we validated the public key curve above.
        address: await secp256k1PublicKeyToBech32Address(
          hexPublicKey,
          bech32Prefix
        ),
        hexPublicKey,
      }
    })
  )

  return {
    type: AccountType.CryptographicMultisig,
    chainId,
    address,
    config: {
      members: members.map(({ address, hexPublicKey }) => ({
        address,
        hexPublicKey,
        weight: 1,
      })),
      threshold: {
        absolute_count: {
          threshold: BigInt(threshold).toString(),
        },
      },
      totalWeight: members.length,
    },
  }
}

/**
 * Fetch the details of a cw3-fixed or cw3-flex multisig account.
 */
export const fetchCw3MultisigAccount = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<Cw3MultisigAccount> => {
  const isCw3Multisig = await queryClient.fetchQuery(
    contractQueries.isContract({
      chainId,
      address,
      nameOrNames: [
        ContractName.Cw3FixedMultisig,
        ContractName.Cw3FlexMultisig,
      ],
    })
  )

  if (!isCw3Multisig) {
    throw new Error('Not a multisig address.')
  }

  const [_threshold, { voters }] = await Promise.all([
    queryClient.fetchQuery(
      cw3FlexMultisigQueries.threshold({
        chainId,
        contractAddress: address,
      })
    ),
    queryClient.fetchQuery(
      cw3FlexMultisigQueries.listAllVoters({
        chainId,
        contractAddress: address,
      })
    ),
  ])

  const threshold: Threshold | undefined =
    'absolute_count' in _threshold
      ? {
          absolute_count: {
            threshold: BigInt(_threshold.absolute_count.weight).toString(),
          },
        }
      : 'absolute_percentage' in _threshold
        ? {
            absolute_percentage: {
              percentage: {
                percent: _threshold.absolute_percentage.percentage,
              },
            },
          }
        : 'threshold_quorum' in _threshold
          ? {
              threshold_quorum: {
                quorum: {
                  percent: _threshold.threshold_quorum.quorum,
                },
                threshold: {
                  percent: _threshold.threshold_quorum.threshold,
                },
              },
            }
          : undefined

  if (!threshold) {
    throw new Error('Unsupported cw3 multisig.')
  }

  return {
    type: AccountType.Cw3Multisig,
    chainId,
    address,
    config: {
      members: voters.map(({ addr, weight }) => ({
        address: addr,
        weight,
      })),
      threshold,
      totalWeight: voters.reduce((acc, { weight }) => acc + weight, 0),
    },
  }
}

/**
 * Fetch the details of any multisig account.
 */
export const fetchMultisigAccount = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<MultisigAccount> => {
  const [cryptographicMultisig, cw3Multisig] = await Promise.allSettled([
    queryClient.fetchQuery(
      accountQueries.cryptographicMultisig({
        chainId,
        address,
      })
    ),
    queryClient.fetchQuery(
      accountQueries.cw3Multisig({
        chainId,
        address,
      })
    ),
  ])

  if (cryptographicMultisig.status === 'fulfilled') {
    return cryptographicMultisig.value
  } else if (cw3Multisig.status === 'fulfilled') {
    return cw3Multisig.value
  } else {
    throw new Error('Not a multisig address.')
  }
}

/**
 * Fetch a Valence account.
 */
export const fetchValenceAccount = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<ValenceAccount> => {
  const rebalancerAddress =
    getSupportedChainConfig(chainId)?.valence?.rebalancer

  const [admin, rebalancerConfig] = await Promise.all([
    queryClient
      .fetchQuery(
        valenceAccountQueries.getAdmin({
          chainId,
          contractAddress: address,
        })
      )
      // backwards compatibility for old test valence accounts that didn't let
      // you query the admin
      .catch(() => ''),
    rebalancerAddress
      ? queryClient
          .fetchQuery(
            valenceRebalancerQueries.getConfig({
              chainId,
              contractAddress: rebalancerAddress,
              args: {
                addr: address,
              },
            })
          )
          // This will error when no rebalancer is configured.
          .catch(() => null)
      : null,
  ])

  const uniqueDenoms = rebalancerConfig?.targets.map(({ denom }) => denom) || []
  // Map token denom to token.
  const tokenMap = (
    await Promise.all(
      uniqueDenoms.map((denom) =>
        queryClient.fetchQuery(
          tokenQueries.info({
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        )
      )
    )
  ).reduce(
    (acc, token) => ({
      ...acc,
      [token.denomOrAddress]: token,
    }),
    {} as Record<string, GenericToken>
  )

  const account: ValenceAccount = {
    type: AccountType.Valence,
    chainId,
    address,
    config: {
      admin,
      rebalancer: rebalancerConfig && {
        config: rebalancerConfig,
        targets: rebalancerConfig.targets.map((target) => ({
          token: tokenMap[target.denom],
          // TODO(rebalancer): Get targets over time.
          targets: [
            {
              timestamp: 0,
              ...target,
            },
          ],
        })),
      },
    },
  }

  return account
}

/**
 * Fetch the Valence accounts owned by a given address.
 */
export const fetchValenceAccounts = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<ValenceAccount[]> => {
  const addresses = await queryClient.fetchQuery(
    indexerQueries.queryAccount({
      chainId,
      address,
      formula: 'valence/accounts',
      ttl: 300,
    })
  )
  if (!addresses || !Array.isArray(addresses)) {
    return []
  }

  return Promise.all(
    addresses.map((address) =>
      queryClient.fetchQuery(
        accountQueries.valence({
          chainId,
          address,
        })
      )
    )
  )
}

/**
 * Fetch a cw1-whitelist account.
 */
export const fetchCw1WhitelistAccount = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<Cw1WhitelistAccount> => {
  const admins = await queryClient.fetchQuery(
    cw1WhitelistExtraQueries.adminsIfCw1Whitelist({
      chainId,
      address,
    })
  )

  if (!admins) {
    throw new Error('Not a cw1-whitelist address.')
  }

  return {
    type: AccountType.Cw1Whitelist,
    chainId,
    address,
    config: {
      admins,
    },
  }
}

export const accountQueries = {
  /**
   * Fetch the list of accounts associated with the specified address.
   */
  list: (options: Parameters<typeof fetchAccountList>[1]) =>
    queryOptions({
      queryKey: ['account', 'list', options],
      queryFn: (ctx) => fetchAccountList(ctx.client, options),
    }),
  /**
   * Fetch ICA address on host (`destChainId`) controlled by `address` on
   * controller (`srcChainId`).
   */
  remoteIcaAddress: (options: Parameters<typeof fetchRemoteIcaAddress>[1]) =>
    queryOptions({
      queryKey: ['account', 'remoteIcaAddress', options],
      queryFn: (ctx) => fetchRemoteIcaAddress(ctx.client, options),
    }),
  /**
   * Fetch the details of a cryptographic multisig account.
   */
  cryptographicMultisig: (
    options: Parameters<typeof fetchCryptographicMultisigAccount>[0]
  ) =>
    queryOptions({
      queryKey: ['account', 'cryptographicMultisig', options],
      queryFn: () => fetchCryptographicMultisigAccount(options),
    }),
  /**
   * Fetch the details of a cw3-fixed or cw3-flex multisig account.
   */
  cw3Multisig: (options: Parameters<typeof fetchCw3MultisigAccount>[1]) =>
    queryOptions({
      queryKey: ['account', 'cw3Multisig', options],
      queryFn: (ctx) => fetchCw3MultisigAccount(ctx.client, options),
    }),
  /**
   * Fetch the details of any type of multisig.
   */
  multisig: (options: Parameters<typeof fetchMultisigAccount>[1]) =>
    queryOptions({
      queryKey: ['account', 'multisig', options],
      queryFn: (ctx) => fetchMultisigAccount(ctx.client, options),
    }),
  /**
   * Fetch a Valence account.
   */
  valence: (options: Parameters<typeof fetchValenceAccount>[1]) =>
    queryOptions({
      queryKey: ['account', 'valence', options],
      queryFn: (ctx) => fetchValenceAccount(ctx.client, options),
    }),
  /**
   * Fetch the Valence accounts owned by a given address.
   */
  valenceAccounts: (options: Parameters<typeof fetchValenceAccounts>[1]) =>
    queryOptions({
      queryKey: ['account', 'valenceAccounts', options],
      queryFn: (ctx) => fetchValenceAccounts(ctx.client, options),
    }),
  /**
   * Fetch a cw1-whitelist account.
   */
  cw1Whitelist: (options: Parameters<typeof fetchCw1WhitelistAccount>[1]) =>
    queryOptions({
      queryKey: ['account', 'cw1Whitelist', options],
      queryFn: (ctx) => fetchCw1WhitelistAccount(ctx.client, options),
    }),
}
