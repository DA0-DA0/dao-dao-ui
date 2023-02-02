import JSON5 from 'json5'
import { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'

import { NFT_STORAGE_API_KEY } from '../constants'
import { parseFormWithImage } from '../server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse form fields and image.
    const {
      fields: { name, description = '', extra: _extra },
      imageData,
      mimetype,
    } = await parseFormWithImage(req)

    // Make sure name is not empty.
    if (!name?.trim()) {
      return res.status(400).json({ error: 'Name cannot be empty.' })
    }

    // Parse additional metadata if present.
    let extra: Record<string, any> = {}
    if (_extra) {
      try {
        extra = JSON5.parse(_extra)
      } catch (err) {
        return res.status(400).json({ error: 'Invalid extra metadata.' })
      }
    }

    // Upload to IPFS via NFT.Storage's API: https://nft.storage/docs/. This
    // automatically uploads the image and creates/uploads a metadata.json file
    // conforming to the ERC-1155 NFT standard.
    const client = new NFTStorage({
      token: NFT_STORAGE_API_KEY,
    })
    const metadata = await client.store({
      ...extra,

      // Ensure name, description, and image are set by their fields.
      name,
      // In case description is empty, use extra.description if present.
      description: description || extra.description || '',
      image: new Blob([imageData], { type: mimetype }),
    })

    return res.status(200).json({
      metadataUrl: metadata.url,
      imageUrl: metadata.embed().image.toString(),
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
