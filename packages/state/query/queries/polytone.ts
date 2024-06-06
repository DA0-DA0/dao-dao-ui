import { QueryClient, queryOptions } from '@tanstack/react-query'

import { PolytoneProxies } from '@dao-dao/types'
import {
  POLYTONE_CONFIG_PER_CHAIN,
  getSupportedChainConfig,
  polytoneNoteProxyMapToChainIdMap,
} from '@dao-dao/utils'

import { polytoneProxyQueries, polytoneVoiceQueries } from './contracts'
import { polytoneNoteQueries } from './contracts/PolytoneNote'
import { indexerQueries } from './indexer'

/**
 * Fetch polytone proxies for an account.
 */
export const fetchPolytoneProxies = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<PolytoneProxies> => {
  // Map from polytone note contract to remote proxy address.
  try {
    return polytoneNoteProxyMapToChainIdMap(
      chainId,
      await queryClient.fetchQuery(
        indexerQueries.queryWallet(queryClient, {
          chainId,
          walletAddress: address,
          formula: 'polytone/proxies',
        })
      )
    )
  } catch (error) {
    console.error(error)
  }

  // Fallback to contract query if indexer fails.

  // Get polytone notes on this chain.
  const polytoneConnections = Object.entries(
    getSupportedChainConfig(chainId)?.polytone || {}
  )

  // Fetch remote address for this address on all potential polytone
  // connections, filtering out the nonexistent ones, and turn back into map of
  // chain to proxy.
  const proxies: PolytoneProxies = Object.fromEntries(
    (
      await Promise.all(
        polytoneConnections.map(async ([proxyChainId, { note }]) => {
          const proxy = await queryClient.fetchQuery(
            polytoneNoteQueries.remoteAddress(queryClient, {
              chainId,
              contractAddress: note,
              args: {
                localAddress: address,
              },
            })
          )

          // Null respones get filtered out.
          return proxy ? ([proxyChainId, proxy] as const) : undefined
        })
      )
    ).filter(Boolean) as [string, string][]
  )

  return proxies
}

/**
 * Given a polytone proxy, fetch the source chain, remote address, and polytone
 * note.
 */
export const reverseLookupPolytoneProxy = async (
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
  remoteAddress: string
  note: string
}> => {
  const voice = await queryClient.fetchQuery(
    polytoneProxyQueries.instantiator(queryClient, {
      chainId,
      contractAddress: address,
    })
  )

  // Get sender info for this voice.
  const senderInfo = await queryClient.fetchQuery(
    polytoneVoiceQueries.senderInfoForProxy(queryClient, {
      chainId,
      contractAddress: voice,
      args: {
        proxy: address,
      },
    })
  )

  // Get source polytone connection where the note lives for this voice.
  const srcPolytoneInfo = POLYTONE_CONFIG_PER_CHAIN.find(([, config]) =>
    Object.entries(config).some(
      ([destChainId, connection]) =>
        destChainId === chainId &&
        connection.voice === voice &&
        connection.remoteConnection === senderInfo.connection_id
    )
  )
  if (!srcPolytoneInfo) {
    throw new Error('Could not find source polytone connection')
  }

  return {
    chainId: srcPolytoneInfo[0],
    remoteAddress: senderInfo.remote_sender,
    note: srcPolytoneInfo[1][chainId].note,
  }
}

export const polytoneQueries = {
  /**
   * Fetch polytone proxies for an account.
   */
  proxies: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchPolytoneProxies>[1]
  ) =>
    queryOptions({
      queryKey: ['polytone', 'proxies', options],
      queryFn: () => fetchPolytoneProxies(queryClient, options),
    }),
  /**
   * Given a polytone proxy, fetch the source chain, remote address, and
   * polytone note.
   */
  reverseLookupProxy: (
    queryClient: QueryClient,
    options: Parameters<typeof reverseLookupPolytoneProxy>[1]
  ) =>
    queryOptions({
      queryKey: ['polytone', 'reverseLookupProxy', options],
      queryFn: () => reverseLookupPolytoneProxy(queryClient, options),
    }),
}
