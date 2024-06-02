import { QueryClient, queryOptions } from '@tanstack/react-query'

import { Account, AccountType } from '@dao-dao/types'
import {
  ICA_CHAINS_TX_PREFIX,
  getConfiguredChainConfig,
  getIbcTransferInfoBetweenChains,
  ibcProtoRpcClientRouter,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { contractQueries } from './contract'
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

  // If this is a DAO, get its polytone proxies and registered ICAs (which is a
  // chain the DAO has indicated it has an ICA on by storing an item in its KV).
  const [polytoneProxies, registeredIcas] = isDao
    ? await Promise.all([
        queryClient.fetchQuery(
          polytoneQueries.proxies(queryClient, { chainId, address })
        ),
        queryClient.fetchQuery(
          daoDaoCoreQueries.listAllItems(queryClient, {
            chainId,
            contractAddress: address,
            args: {
              prefix: ICA_CHAINS_TX_PREFIX,
            },
          })
        ),
      ])
    : []

  const mainAccount: Account = {
    chainId,
    address,
    type: isPolytoneProxy ? AccountType.Polytone : AccountType.Native,
  }

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
}
