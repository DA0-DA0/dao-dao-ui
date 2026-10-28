const { appendFileSync } = require('node:fs')

const isLegacyProvider = (input) => {
  try {
    const { hostname } = new URL(
      typeof input === 'string' || input instanceof URL ? input : input.url
    )
    return (
      hostname === 'snapper.indexer.zone' ||
      hostname === 'coingecko.com' ||
      hostname.endsWith('.coingecko.com')
    )
  } catch {
    return false
  }
}
const isBroadcast = (input, init = {}) => {
  const url = String(
    typeof input === 'string' || input instanceof URL ? input : input.url
  )
  return (
    /broadcast_tx|BroadcastTx/.test(url) ||
    (/\/cosmos\/tx\/v1beta1\/txs(?:\?|$)/.test(url) &&
      init.method === 'POST') ||
    (typeof init.body === 'string' &&
      /"method"\s*:\s*"broadcast_tx/.test(init.body))
  )
}

// Load via NODE_OPTIONS for build/SSR smoke only. Never used by application code.
const original = globalThis.fetch
if (original)
  globalThis.fetch = async (input, init) => {
    if (isLegacyProvider(input)) {
      const url = new URL(
        typeof input === 'string' || input instanceof URL ? input : input.url
      )
      const message = 'FORBIDDEN_PROVIDER ' + url.origin + url.pathname + '\n'
      if (process.env.LEGACY_PROVIDER_LOG)
        appendFileSync(process.env.LEGACY_PROVIDER_LOG, message)
      throw new Error(message.trim())
    }
    if (isBroadcast(input, init))
      throw new Error('Transaction broadcast disabled during read-only smoke')
    return original(input, init)
  }
module.exports = { isLegacyProvider, isBroadcast }
