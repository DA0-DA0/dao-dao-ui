const assert = require('node:assert/strict')
const { test } = require('node:test')
const { isLegacyProvider, isBroadcast } = require('./denyLegacyProviders.cjs')

test('detects legacy hosts, not arbitrary URL substrings', () => {
  assert.equal(isLegacyProvider('https://snapper.indexer.zone/q/foo'), true)
  assert.equal(isLegacyProvider('https://api.coingecko.com/api/v3/coins'), true)
  assert.equal(isLegacyProvider('https://api.skip.build/v2/info/chains'), false)
  assert.equal(
    isLegacyProvider('https://example.com/?host=api.coingecko.com'),
    false
  )
})
test('blocks transaction broadcasts without blocking read-only POST queries', () => {
  assert.equal(
    isBroadcast('https://rpc.example.com/broadcast_tx_sync', {}),
    true
  )
  assert.equal(
    isBroadcast('https://rpc.example.com', {
      body: JSON.stringify({ method: 'broadcast_tx_commit' }),
    }),
    true
  )
  assert.equal(
    isBroadcast('https://rest.example.com/cosmos/tx/v1beta1/txs', {
      method: 'POST',
    }),
    true
  )
  assert.equal(
    isBroadcast('https://api.skip.build/v2/fungible/route', { method: 'POST' }),
    false
  )
})
