import { createHash } from 'crypto'

import {
  BaseAccount,
  ModuleAccount,
} from '../../types/protobuf/codegen/cosmos/auth/v1beta1/auth'
import { QueryModuleAccountByNameResponse } from '../../types/protobuf/codegen/cosmos/auth/v1beta1/query'
import { QueryCommunityPoolResponse } from '../../types/protobuf/codegen/cosmos/distribution/v1beta1/query'
import { QueryParamsResponse } from '../../types/protobuf/codegen/cosmos/staking/v1beta1/query'

export type PriceScenario = 'fresh' | 'stale' | 'outage'
export const fixtureIbcDenom =
  'ibc/' +
  createHash('sha256')
    .update('transfer/channel-141/uosmo')
    .digest('hex')
    .toUpperCase()
const chainId = 'cosmoshub-4'
const account = 'cosmos1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqnrql8a'
const assets = [
  {
    denom: 'uatom',
    origin_denom: 'uatom',
    origin_chain_id: chainId,
    symbol: 'ATOM',
  },
  {
    denom: fixtureIbcDenom,
    origin_denom: 'uosmo',
    origin_chain_id: 'osmosis-1',
    symbol: 'OSMO',
  },
  {
    denom: 'usmoke',
    origin_denom: 'usmoke',
    origin_chain_id: chainId,
    symbol: 'UNPRICED',
  },
].map((asset) => ({ ...asset, chain_id: chainId, is_cw20: false, decimals: 6 }))

/** Fixed read-only governance-pool inputs. No wallet, signing, write RPC or
 * application implementation is replaced. Unknown RPC paths are not fabricated.
 */
export const pricingFixtureResponse = (
  url: URL,
  body: any,
  scenario: PriceScenario,
  now = Date.now()
): { status: number; body: unknown } | undefined => {
  if (
    url.hostname === 'api.skip.build' &&
    url.pathname === '/v2/fungible/assets' &&
    url.searchParams.get('chain_ids') === chainId
  ) {
    return {
      status: 200,
      body: { chain_to_assets_map: { [chainId]: { assets } } },
    }
  }
  if (
    url.hostname === 'api.exchange.coinbase.com' &&
    /^\/products\/(ATOM|OSMO)-USD\/ticker$/.test(url.pathname)
  ) {
    if (scenario === 'outage')
      return { status: 400, body: { message: 'Fixture outage' } }
    return {
      status: 200,
      body: {
        price: url.pathname.includes('ATOM') ? '2' : '0.25',
        time: new Date(
          now - (scenario === 'stale' ? 360_000 : 0)
        ).toISOString(),
      },
    }
  }
  // OSMO has a second reviewed provider: stale/outage must not accidentally
  // recover via a live endpoint and make the scenario non-deterministic.
  if (
    url.hostname === 'api.kraken.com' &&
    url.pathname === '/0/public/Trades'
  ) {
    const pair = url.searchParams.get('pair') || ''
    return scenario === 'outage'
      ? { status: 400, body: {} }
      : {
          status: 200,
          body: {
            error: [],
            result: {
              [pair]: [['0.25', '1', (now - 360_000) / 1000]],
              last: '0',
            },
          },
        }
  }
  if (body?.method !== 'abci_query') return
  const path = body.params?.path?.replace(/^"|"$/g, '')
  let data: Uint8Array | undefined
  if (path === '/cosmos.distribution.v1beta1.Query/CommunityPool') {
    data = QueryCommunityPoolResponse.encode({
      pool: assets.map(({ denom }, i) => ({
        denom,
        amount: String((i + 1) * 1_000_000),
      })),
    }).finish()
  } else if (path === '/cosmos.auth.v1beta1.Query/ModuleAccountByName') {
    const moduleAccount = ModuleAccount.fromPartial({
      name: 'gov',
      baseAccount: BaseAccount.fromPartial({ address: account }),
    })
    data = QueryModuleAccountByNameResponse.encode({
      account: {
        ...moduleAccount,
        typeUrl: ModuleAccount.typeUrl,
        value: ModuleAccount.encode(moduleAccount).finish(),
      },
    }).finish()
  } else if (path === '/cosmos.staking.v1beta1.Query/Params') {
    data = QueryParamsResponse.encode({
      params: {
        unbondingTime: { seconds: 604800n, nanos: 0 },
        maxValidators: 100,
        maxEntries: 7,
        historicalEntries: 0,
        bondDenom: 'uatom',
        minCommissionRate: '0',
      },
    }).finish()
  } else if (
    [
      '/cosmos.staking.v1beta1.Query/DelegatorDelegations',
      '/cosmos.staking.v1beta1.Query/DelegatorUnbondingDelegations',
      '/cosmos.distribution.v1beta1.Query/DelegationTotalRewards',
    ].includes(path)
  )
    data = new Uint8Array()
  if (!data) return
  return {
    status: 200,
    body: {
      jsonrpc: '2.0',
      id: body.id,
      result: {
        response: {
          code: 0,
          log: '',
          info: '',
          index: '0',
          key: '',
          value: Buffer.from(data).toString('base64'),
          height: '123',
          codespace: '',
        },
      },
    },
  }
}
