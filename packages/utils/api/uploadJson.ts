import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'

import { NFT_STORAGE_API_KEY } from '../constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (typeof req.body !== 'object' || req.body === null) {
      return res.status(400).json({
        error: 'Invalid request body.',
      })
    }

    // Upload to IPFS via NFT.Storage's API: https://nft.storage/docs/.
    const client = new NFTStorage({
      token: NFT_STORAGE_API_KEY,
    })
    const cid = await client.storeBlob(
      new Blob([JSON.stringify(req.body, null, 2)], {
        type: 'application/json',
      })
    )

    return res.status(200).json({
      cid,
    })
  } catch (err) {
    return res
      .status(400)
      .json({ error: err instanceof Error ? err.message : err })
  }
}
