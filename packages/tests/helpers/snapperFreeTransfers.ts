import { createHash } from 'crypto'

import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
} from '../../types/protobuf/codegen/cosmos/bank/v1beta1/query'

export type TransferScenario = 'automatic' | 'outage'
export const transferFixtureDao =
  'juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q'
export const transferFixtureRecipient =
  'osmo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqmcn030'
export const automaticFixtureMemo = 'read-only-automatic-fixture'
const destinationDenom =
  'ibc/' +
  createHash('sha256')
    .update('transfer/channel-42/ujuno')
    .digest('hex')
    .toUpperCase()

/** Substitute only public read/computation responses, never signing or writes. */
export const transferFixtureResponse = (
  url: URL,
  body: any,
  scenario: TransferScenario
): { status: number; body: unknown } | undefined => {
  if (url.hostname === 'api.skip.build') {
    if (
      url.pathname === '/v2/fungible/assets' &&
      url.searchParams.get('chain_ids') === 'juno-1'
    )
      return {
        status: 200,
        body: {
          chain_to_assets_map: {
            'juno-1': {
              assets: [
                {
                  chain_id: 'juno-1',
                  denom: 'ujuno',
                  origin_chain_id: 'juno-1',
                  origin_denom: 'ujuno',
                  symbol: 'JUNO',
                  decimals: 6,
                  is_cw20: false,
                },
              ],
            },
          },
        },
      }
    if (
      url.pathname === '/v2/fungible/recommend_assets' &&
      body?.requests?.[0]?.source_asset_chain_id === 'juno-1' &&
      body.requests[0].source_asset_denom === 'ujuno' &&
      body.requests[0].dest_chain_id === 'osmosis-1'
    )
      return {
        status: 200,
        body: {
          recommendation_entries: [
            {
              recommendations: [
                {
                  reason: 'DIRECT',
                  asset: { chain_id: 'osmosis-1', denom: destinationDenom },
                },
              ],
            },
          ],
        },
      }
    if (
      url.pathname === '/v2/fungible/route' &&
      body?.source_asset_chain_id === 'juno-1' &&
      body.source_asset_denom === 'ujuno' &&
      body.dest_asset_chain_id === 'osmosis-1'
    )
      return scenario === 'outage'
        ? { status: 400, body: { message: 'Fixture route unavailable' } }
        : {
            status: 200,
            body: {
              ...body,
              amount_out: body.amount_in,
              estimated_amount_out: body.amount_in,
              chain_ids: ['juno-1', 'osmosis-1'],
              does_swap: false,
              txs_required: 1,
              operations: [
                {
                  transfer: {
                    port: 'transfer',
                    channel: 'channel-0',
                    from_chain_id: 'juno-1',
                    to_chain_id: 'osmosis-1',
                  },
                },
              ],
            },
          }
    if (
      url.pathname === '/v2/fungible/msgs' &&
      scenario === 'automatic' &&
      body?.addressList?.[0] === transferFixtureDao &&
      body.addressList[1] === transferFixtureRecipient &&
      body.source_asset_denom === 'ujuno' &&
      body.source_asset_chain_id === 'juno-1' &&
      body.dest_asset_chain_id === 'osmosis-1'
    )
      return {
        status: 200,
        body: {
          msgs: [
            {
              multi_chain_msg: {
                chain_id: 'juno-1',
                path: ['juno-1', 'osmosis-1'],
                msg_type_url: '/ibc.applications.transfer.v1.MsgTransfer',
                msg: JSON.stringify({
                  source_port: 'transfer',
                  source_channel: 'channel-0',
                  sender: transferFixtureDao,
                  receiver: transferFixtureRecipient,
                  token: { denom: 'ujuno', amount: body.amount_in },
                  memo: automaticFixtureMemo,
                  timeout_timestamp: String(
                    BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000) * 1_000_000n
                  ),
                }),
              },
            },
          ],
        },
      }
    return
  }
  if (
    body?.method === 'abci_query' &&
    body.params?.path?.replace(/^"|"$/g, '') ===
      '/cosmos.bank.v1beta1.Query/AllBalances' &&
    typeof body.params.data === 'string'
  ) {
    const request = QueryAllBalancesRequest.decode(
      Buffer.from(body.params.data.replace(/^0x/, ''), 'hex')
    )
    if (request.address !== transferFixtureDao) return
    const value = QueryAllBalancesResponse.encode({
      balances: [{ denom: 'ujuno', amount: '5000000' }],
    }).finish()
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
            value: Buffer.from(value).toString('base64'),
            height: '1',
            codespace: '',
          },
        },
      },
    }
  }
}
