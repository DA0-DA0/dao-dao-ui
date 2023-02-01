import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'

import { NFT_STORAGE_API_KEY } from '../constants'
import { parseFormWithImage } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse image from form.
    const { imageData, mimetype } = await parseFormWithImage(req)

    // Upload to IPFS via NFT.Storage's API: https://nft.storage/docs/.
    const client = new NFTStorage({
      token: NFT_STORAGE_API_KEY,
    })
    const cid = await client.storeBlob(
      new Blob([imageData], { type: mimetype ?? undefined })
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

// Disable default body parser since Formidable parses for us.
export const config = {
  api: {
    bodyParser: false,
  },
}
