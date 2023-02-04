import { NextApiRequest, NextApiResponse } from 'next'
import queryString from 'query-string'

import { INDEXER_API_KEY } from '../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!INDEXER_API_KEY) {
    return res.status(500).end()
  }

  const { chainId, type, address, formula, args, block } = req.body
  if (
    typeof chainId !== 'string' ||
    typeof type !== 'string' ||
    typeof address !== 'string' ||
    typeof formula !== 'string'
  ) {
    return res.status(400).end()
  }

  const indexerApiBase = CHAIN_INDEXER_MAP[chainId]
  if (!indexerApiBase) {
    throw new Error(`No indexer configured for chain ID ${chainId}.`)
  }

  const query = queryString.stringify({
    ...args,
    ...(block ? { block } : {}),
  })
  const endpoint = [
    indexerApiBase,
    INDEXER_API_KEY,
    type,
    address,
    formula + (query ? `?${query}` : ''),
  ].join('/')

  try {
    const response = await fetch(endpoint)
    return res.status(response.status).send(await response.text())
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}

const CHAIN_INDEXER_MAP: Record<string, string | undefined> = {
  'uni-6': 'https://indexer-testnet.daodao.zone',
  'juno-1': 'https://indexer-mainnet.daodao.zone',
}
