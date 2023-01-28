// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'

import { parseFormWithImage } from '@dao-dao/stateful/server'
import { NFT_STORAGE_API_KEY } from '@dao-dao/utils'

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
