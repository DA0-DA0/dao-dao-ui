import { selectorFamily } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  GenericToken,
  SkipAsset,
  SkipAssetRecommendation,
  SkipChain,
  SkipMultiChainMsg,
  SkipRoute,
  TokenType,
} from '@dao-dao/types'
import { SKIP_API_BASE } from '@dao-dao/utils'

import { fetchPublicJson } from '../../query/providers/http'
import { selectSkipRecommendation } from '../../query/providers/skip'
import { skipQueries } from '../../query/queries/skip'
import { queryClientAtom } from '../atoms'

export const skipChainSelector = selectorFamily<SkipChain | undefined, string>({
  key: 'skipChain',
  get:
    (chainId) =>
    ({ get }) =>
      get(queryClientAtom)
        .fetchQuery(skipQueries.chainRaw({ chainId }))
        .then((chain) => chain ?? undefined),
})

/**
 * Get the info for an asset on a specific chain.
 */
export const skipAssetSelector = selectorFamily<
  SkipAsset | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'skipAsset',
  get:
    ({ chainId, type, denomOrAddress }) =>
    ({ get }) =>
      get(queryClientAtom)
        .fetchQuery(skipQueries.asset({ chainId, type, denomOrAddress }))
        .catch(() => undefined),
})

export const skipRecommendedAssetsSelector = selectorFamily<
  SkipAssetRecommendation[],
  {
    fromChainId: string
    denom: string
    toChainId: string
  }
>({
  key: 'skipRecommendedAssets',
  get:
    ({ fromChainId, denom, toChainId }) =>
    ({ get }) =>
      get(queryClientAtom).fetchQuery(
        skipQueries.recommendations({ fromChainId, denom, toChainId })
      ),
})

export const skipRecommendedAssetSelector = selectorFamily<
  SkipAssetRecommendation | undefined,
  {
    fromChainId: string
    denom: string
    toChainId: string
  }
>({
  key: 'skipRecommendedAsset',
  get:
    ({ fromChainId, denom, toChainId }) =>
    ({ get }) => {
      const recommendations = get(
        skipRecommendedAssetsSelector({
          fromChainId,
          denom,
          toChainId,
        })
      )

      const recommendation = selectSkipRecommendation(recommendations)

      return recommendation
    },
})

// Given a source and destination chain ID, retrieve the single message that can
// be executed to move funds between the two chains using the chain addresses as
// the source or intermediate addresses.
export const skipRouteSelector = selectorFamily<
  SkipRoute,
  {
    fromChainId: string
    toChainId: string
    sourceDenom: string
    // micro-denom value
    amountIn: number | string
  }
>({
  key: 'skipRoute',
  get:
    ({ fromChainId, toChainId, sourceDenom, amountIn }) =>
    async ({ get }) => {
      const asset = get(
        skipRecommendedAssetSelector({
          fromChainId,
          denom: sourceDenom,
          toChainId,
        })
      )?.asset

      if (!asset) {
        throw new Error('No recommended asset found.')
      }

      const route:
        | SkipRoute
        | {
            code: number
            message: string
          } = await fetchPublicJson<
        SkipRoute | { code: number; message: string }
      >('skip', SKIP_API_BASE + '/v2/fungible/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_asset_chain_id: fromChainId,
          source_asset_denom: sourceDenom,
          dest_asset_chain_id: toChainId,
          dest_asset_denom: asset.denom,
          amount_in: HugeDecimal.from(amountIn).toString(),
        }),
      })

      if (!route || typeof route !== 'object')
        throw new Error('Malformed Skip route')
      if ('code' in route && 'message' in route) {
        throw new Error(`Skip API error: ${route.message}`)
      }

      if (
        route.does_swap !== false ||
        !Array.isArray(route.chain_ids) ||
        !route.chain_ids.length ||
        !Number.isInteger(route.txs_required)
      ) {
        throw new Error('Route requires a swap.')
      }

      return route
    },
})

// Given a source and destination chain ID, retrieve the single message that can
// be executed to move funds between the two chains using the chain addresses as
// the source or intermediate addresses.
export const skipRouteMessageSelector = selectorFamily<
  SkipMultiChainMsg,
  {
    // Map chain ID to address on that chain that can serve as the source or
    // intermediate address for transfers.
    chainAddresses: Record<string, string | undefined>
    fromChainId: string
    toChainId: string
    sourceDenom: string
    toAddress: string
    // micro-denom value
    amountIn: number | string
  }
>({
  key: 'skipRouteMessage',
  get:
    ({
      chainAddresses,
      fromChainId,
      toChainId,
      sourceDenom,
      toAddress,
      amountIn,
    }) =>
    async ({ get }) => {
      const route = get(
        skipRouteSelector({
          fromChainId,
          toChainId,
          sourceDenom,
          amountIn,
        })
      )

      if (route.txs_required !== 1)
        throw new Error('Route requires multiple transactions.')
      const addressList = [
        ...route.chain_ids
          .slice(0, -1)
          .map((chainId) => chainAddresses[chainId]),
        toAddress,
      ]
      if (!addressList.every(Boolean)) {
        throw new Error(
          `Missing accounts for chain(s): ${addressList
            .flatMap((address, index) =>
              address ? [] : route.chain_ids[index]
            )
            .join(', ')}.`
        )
      }

      const {
        msgs,
      }: {
        msgs: {
          multi_chain_msg: SkipMultiChainMsg
        }[]
      } = await fetchPublicJson<{
        msgs: { multi_chain_msg: SkipMultiChainMsg }[]
      }>('skip', SKIP_API_BASE + '/v2/fungible/msgs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_asset_chain_id: route.source_asset_chain_id,
          source_asset_denom: route.source_asset_denom,
          dest_asset_chain_id: route.dest_asset_chain_id,
          dest_asset_denom: route.dest_asset_denom,
          amount_in: route.amount_in,
          amount_out: route.amount_out,
          operations: route.operations,
          estimated_amount_out: route.estimated_amount_out,

          addressList: addressList as string[],
          slippage_tolerance_percent: '0',
        }),
      })

      if (!Array.isArray(msgs) || msgs.length !== 1) {
        throw new Error('Route requires multiple messages.')
      }

      const msg = msgs[0]
      if (
        !msg?.multi_chain_msg ||
        ![
          '/ibc.applications.transfer.v1.MsgTransfer',
          '/neutron.transfer.MsgTransfer',
        ].includes(msg.multi_chain_msg.msg_type_url) ||
        typeof msg.multi_chain_msg.msg !== 'string'
      ) {
        throw new Error('Route requires invalid message type.')
      }

      return msg.multi_chain_msg
    },
})

/**
 * Get the recommended asset for a token on a given chain.
 */
export const skipRecommendedAssetForGenericTokenSelector = selectorFamily<
  SkipAsset | undefined,
  Pick<GenericToken, 'type' | 'denomOrAddress'> & {
    sourceChainId: string
    targetChainId: string
  }
>({
  key: 'chainSymbolForToken',
  get:
    ({ type, denomOrAddress, sourceChainId, targetChainId }) =>
    ({ get }) =>
      get(
        skipRecommendedAssetSelector({
          fromChainId: sourceChainId,
          denom: (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress,
          toChainId: targetChainId,
        })
      )?.asset,
})
