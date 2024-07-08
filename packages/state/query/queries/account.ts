import { toHex } from '@cosmjs/encoding'
import { QueryClient, queryOptions, skipToken } from '@tanstack/react-query'

import {
  Account,
  AccountType,
  CryptographicMultisigAccount,
  Cw3MultisigAccount,
  MultisigAccount,
  PolytoneProxies,
} from '@dao-dao/types'
import { ListItemsResponse } from '@dao-dao/types/contracts/DaoDaoCore'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { BaseAccount } from '@dao-dao/types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { LegacyAminoPubKey } from '@dao-dao/types/protobuf/codegen/cosmos/crypto/multisig/keys'
import { PubKey as Secp256k1PubKey } from '@dao-dao/types/protobuf/codegen/cosmos/crypto/secp256k1/keys'
import {
  ContractName,
  ICA_CHAINS_TX_PREFIX,
  cosmosProtoRpcClientRouter,
  getChainForChainId,
  getConfiguredChainConfig,
  getIbcTransferInfoBetweenChains,
  ibcProtoRpcClientRouter,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { contractQueries } from './contract'
import { cw3FlexMultisigQueries } from './contracts'
import { daoDaoCoreQueries } from './contracts/DaoDaoCore'
import { polytoneQueries } from './polytone'

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
  const chainConfig = getConfiguredChainConfig(chainId)
  if (chainConfig && chainConfig.name === address) {
    address = await queryClient.fetchQuery(
      chainQueries.moduleAddress({
        chainId,
        name: chainConfig.name,
      })
    )
  }

  const [isDao, isPolytoneProxy] = await Promise.all([
    queryClient.fetchQuery(
      contractQueries.isDao(queryClient, { chainId, address })
    ),
    queryClient.fetchQuery(
      contractQueries.isPolytoneProxy(queryClient, { chainId, address })
    ),
  ])

  const mainAccount: Account = {
    chainId,
    address,
    type: isPolytoneProxy ? AccountType.Polytone : AccountType.Native,
  }

  const [polytoneProxies, registeredIcas] = await Promise.all([
    mainAccount.type !== AccountType.Polytone
      ? queryClient.fetchQuery(
          polytoneQueries.proxies(queryClient, { chainId, address })
        )
      : ({} as PolytoneProxies),
    // If this is a DAO, get its registered ICAs (which is a chain the DAO has
    // indicated it has an ICA on by storing an item in its KV).
    isDao
      ? queryClient.fetchQuery(
          daoDaoCoreQueries.listAllItems(queryClient, {
            chainId,
            contractAddress: address,
            args: {
              prefix: ICA_CHAINS_TX_PREFIX,
            },
          })
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

  // If main account is native, load ICA accounts.
  const icaChains =
    mainAccount.type === AccountType.Native
      ? [
          ...(registeredIcas || []).map(([key]) => key),
          ...(includeIcaChains || []),
        ]
      : []

  const icas = await Promise.allSettled(
    icaChains.map((destChainId) =>
      queryClient.fetchQuery(
        accountQueries.remoteIcaAddress({
          srcChainId: mainAccount.chainId,
          address: mainAccount.address,
          destChainId,
        })
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

  return allAccounts
}

/**
 * Fetch ICA address on host (`destChainId`) controlled by `address` on
 * controller (`srcChainId`).
 */
export const fetchRemoteIcaAddress = async ({
  srcChainId,
  address,
  destChainId,
}: {
  srcChainId: string
  address: string
  destChainId: string
}): Promise<string | null> => {
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
      err instanceof Error &&
      err.message.includes('failed to retrieve account address') &&
      err.message.includes('key not found')
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
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)
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

  const addresses = await Promise.all(
    publicKeys.map((key) =>
      secp256k1PublicKeyToBech32Address(
        toHex(Secp256k1PubKey.decode(key.value).key),
        bech32Prefix
      )
    )
  )

  return {
    type: AccountType.CryptographicMultisig,
    chainId,
    address,
    config: {
      members: addresses.map((address) => ({
        address,
        weight: 1,
      })),
      threshold: {
        absolute_count: {
          threshold: BigInt(threshold).toString(),
        },
      },
      totalWeight: addresses.length,
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
    contractQueries.isContract(queryClient, {
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
        queryClient,
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
      accountQueries.cw3Multisig(queryClient, {
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

export const accountQueries = {
  /**
   * Fetch the list of accounts associated with the specified address.
   */
  list: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchAccountList>[1]
  ) =>
    queryOptions({
      queryKey: ['account', 'list', options],
      queryFn: () => fetchAccountList(queryClient, options),
    }),
  /**
   * Fetch ICA address on host (`destChainId`) controlled by `address` on
   * controller (`srcChainId`).
   */
  remoteIcaAddress: (options: Parameters<typeof fetchRemoteIcaAddress>[0]) =>
    queryOptions({
      queryKey: ['account', 'remoteIcaAddress', options],
      queryFn: () => fetchRemoteIcaAddress(options),
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
  cw3Multisig: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchCw3MultisigAccount>[1]
  ) =>
    queryOptions({
      queryKey: ['account', 'cw3Multisig', options],
      queryFn: () => fetchCw3MultisigAccount(queryClient, options),
    }),
  /**
   * Fetch the details of any type of multisig.
   */
  multisig: (
    queryClient: QueryClient,
    options?: Parameters<typeof fetchMultisigAccount>[1]
  ) =>
    queryOptions({
      queryKey: ['account', 'multisig', options],
      queryFn: options
        ? () => fetchMultisigAccount(queryClient, options)
        : skipToken,
    }),
}
