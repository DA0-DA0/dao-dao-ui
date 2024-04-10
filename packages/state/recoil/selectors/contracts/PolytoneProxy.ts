import { selectorFamily } from 'recoil'

import { Addr, WithChainId } from '@dao-dao/types'

import { PolytoneProxyQueryClient } from '../../../contracts/PolytoneProxy'
import { cosmWasmClientForChainSelector } from '../chain'
import { queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

export const queryClient = selectorFamily<
  PolytoneProxyQueryClient,
  QueryClientParams
>({
  key: 'polytoneProxyQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new PolytoneProxyQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const instantiatorSelector = selectorFamily<
  Addr,
  QueryClientParams & {
    params: Parameters<PolytoneProxyQueryClient['instantiator']>
  }
>({
  key: 'polytoneProxyInstantiator',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const instantiator = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'polytone/proxy/instantiator',
        })
      )
      if (instantiator) {
        return instantiator
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.instantiator(...params)
    },
})

export const remoteControllerForPolytoneProxySelector = selectorFamily<
  string | undefined,
  { chainId: string; voice: string; proxy: string }
>({
  key: 'remoteControllerForPolytoneProxy',
  get:
    ({ chainId, voice, proxy }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          chainId,
          contractAddress: voice,
          formula: 'polytone/voice/remoteController',
          args: {
            address: proxy,
          },
          noFallback: true,
        })
      ),
})
